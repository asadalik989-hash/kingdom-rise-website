import { useState, useCallback, useRef } from 'react';
import { FormStatus, EmailDeliveryStatus } from '../../types/componentStates';

export interface UseFormStateMachineOptions<TData, TResult> {
  initialValues: TData;
  validate?: (values: TData) => Record<string, string> | null;
  onSubmit: (values: TData) => Promise<TResult>;
  onSuccess?: (result: TResult) => void;
  onError?: (error: any) => void;
}

export function useFormStateMachine<TData extends Record<string, any>, TResult = any>({
  initialValues,
  validate,
  onSubmit,
  onSuccess,
  onError,
}: UseFormStateMachineOptions<TData, TResult>) {
  const [status, setStatus] = useState<FormStatus>('IDLE');
  const [values, setValues] = useState<TData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [result, setResult] = useState<TResult | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<EmailDeliveryStatus>('QUEUED');
  
  // Guard against duplicate concurrent submissions
  const isSubmittingRef = useRef(false);

  // Field change handler that preserves dirty state
  const setValue = useCallback(<K extends keyof TData>(field: K, value: TData[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setStatus((prev) => (prev === 'IDLE' || prev === 'ERROR' ? 'EDITING' : prev));
    setErrors((prev) => {
      if (prev[field as string]) {
        const next = { ...prev };
        delete next[field as string];
        return next;
      }
      return prev;
    });
  }, []);

  const setAllValues = useCallback((newValues: Partial<TData>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
    setStatus('EDITING');
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setGeneralError(null);
    setResult(null);
    setReferenceId(null);
    setStatus('IDLE');
    setEmailStatus('QUEUED');
    isSubmittingRef.current = false;
  }, [initialValues]);

  // Execute submission with state machine transitions
  const submit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Guard: already submitting
      if (isSubmittingRef.current || status === 'SUBMITTING' || status === 'VALIDATING') {
        return;
      }

      setGeneralError(null);
      setStatus('VALIDATING');

      // 1. Validation Step
      if (validate) {
        const validationErrors = validate(values);
        if (validationErrors && Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setStatus('ERROR');
          setGeneralError('Please resolve highlighted errors in the form.');
          return;
        }
      }

      // 2. Submitting Step
      isSubmittingRef.current = true;
      setStatus(status === 'ERROR' ? 'RETRYING' : 'SUBMITTING');

      try {
        const res = await onSubmit(values);
        setResult(res);

        // Extract reference ID if returned
        if (typeof res === 'string') {
          setReferenceId(res);
        } else if (res && typeof res === 'object') {
          const possibleId = (res as any).referenceId || (res as any).id || (res as any).referenceNumber;
          if (possibleId) setReferenceId(possibleId);
        }

        setStatus('SUCCESS');
        setEmailStatus('ACCEPTED_BY_PROVIDER');

        if (onSuccess) {
          onSuccess(res);
        }
      } catch (err: any) {
        setStatus('ERROR');
        const errMsg = err?.message || 'Submission failed. Please verify your details and retry.';
        setGeneralError(errMsg);
        setEmailStatus('FAILED');

        if (onError) {
          onError(err);
        }
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [values, validate, onSubmit, onSuccess, onError, status]
  );

  return {
    status,
    values,
    errors,
    generalError,
    result,
    referenceId,
    emailStatus,
    setValue,
    setAllValues,
    submit,
    resetForm,
    isLoading: status === 'SUBMITTING' || status === 'VALIDATING' || status === 'RETRYING',
    isSuccess: status === 'SUCCESS',
    isError: status === 'ERROR',
    isIdle: status === 'IDLE',
    isEditing: status === 'EDITING',
  };
}
