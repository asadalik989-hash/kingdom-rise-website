import React, { useRef, useState, useId } from 'react';
import {
  UploadCloud,
  File,
  FileText,
  FileArchive,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { FileUploadStatus } from '../../types/componentStates';

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  accept?: string;
  maxSizeBytes?: number; // e.g. 15 * 1024 * 1024 (15MB)
  onFileSelect?: (file: File) => void | Promise<void>;
  onFileRemove?: () => void | Promise<void>;
  initialFileName?: string;
  initialFileSize?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  helperText = 'Supported formats: PDF, DOCX, XLSX, DWG, ZIP, JPG, PNG (Max 15MB)',
  error: externalError,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.dwg,.zip,.jpg,.jpeg,.png',
  maxSizeBytes = 15 * 1024 * 1024,
  onFileSelect,
  onFileRemove,
  initialFileName,
  initialFileSize,
  required,
  disabled = false,
}) => {
  const [status, setStatus] = useState<FileUploadStatus>(
    initialFileName ? 'UPLOADED' : 'EMPTY'
  );
  const [file, setFile] = useState<{
    name: string;
    size: string;
    raw?: File;
  } | null>(
    initialFileName
      ? { name: initialFileName, size: initialFileSize || 'Verified File' }
      : null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();

  const activeError = externalError || internalError;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateAndProcessFile = async (selectedFile: File) => {
    setInternalError(null);
    setStatus('VALIDATING');

    // 1. File Size Validation
    if (selectedFile.size > maxSizeBytes) {
      const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
      setInternalError(`File exceeds maximum allowed size of ${maxMb}MB.`);
      setStatus('FAILED');
      return;
    }

    // 2. MIME/Extension Validation
    const ext = `.${selectedFile.name.split('.').pop()?.toLowerCase()}`;
    const allowed = accept
      .split(',')
      .map((a) => a.trim().toLowerCase());
    if (allowed.length > 0 && !allowed.includes(ext) && !allowed.includes('*')) {
      setInternalError(`File format ${ext} is not supported. Please upload a valid document.`);
      setStatus('FAILED');
      return;
    }

    // 3. File accepted, simulate uploading state or trigger callback
    setFile({
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
      raw: selectedFile,
    });
    setStatus('UPLOADING');
    setUploadProgress(15);

    try {
      // Simulate realistic upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 25;
        });
      }, 100);

      if (onFileSelect) {
        await onFileSelect(selectedFile);
      }

      clearInterval(interval);
      setUploadProgress(100);
      setStatus('UPLOADED');
    } catch (err: any) {
      setStatus('FAILED');
      setInternalError(err?.message || 'File upload failed. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && status !== 'UPLOADING') {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || status === 'UPLOADING') return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = async () => {
    if (status === 'REMOVING') return;
    setStatus('REMOVING');
    try {
      if (onFileRemove) {
        await onFileRemove();
      }
      setFile(null);
      setUploadProgress(0);
      setInternalError(null);
      if (inputRef.current) inputRef.current.value = '';
      setStatus('EMPTY');
    } catch (err: any) {
      setInternalError('Failed to remove file.');
      setStatus('UPLOADED');
    }
  };

  const handleRetry = () => {
    if (file?.raw) {
      validateAndProcessFile(file.raw);
    } else {
      inputRef.current?.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'zip' || ext === 'rar' || ext === '7z') {
      return <FileArchive className="w-6 h-6 text-amber-500" />;
    }
    if (ext === 'pdf') {
      return <FileText className="w-6 h-6 text-rose-500" />;
    }
    return <File className="w-6 h-6 text-[#0052CC]" />;
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={generatedId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-200 select-none"
        >
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={generatedId}
        type="file"
        accept={accept}
        disabled={disabled || status === 'UPLOADING' || status === 'REMOVING'}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* State: EMPTY or FAILED with no file */}
      {(status === 'EMPTY' || (status === 'FAILED' && !file)) && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
            ${
              isDragging
                ? 'border-[#0052CC] bg-[#0052CC]/5 scale-[0.99]'
                : activeError
                ? 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-[#0052CC] bg-white dark:bg-slate-900/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
          `}
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
            <UploadCloud className="w-6 h-6 text-[#0052CC]" />
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {helperText}
          </p>
        </div>
      )}

      {/* State: SELECTED, VALIDATING, UPLOADING, UPLOADED, FAILED (with file), REMOVING */}
      {file && (
        <div
          className={`
            border rounded-xl p-4 bg-white dark:bg-slate-900 transition-all duration-200 shadow-2xs
            ${
              status === 'FAILED'
                ? 'border-rose-300 dark:border-rose-800'
                : status === 'UPLOADED'
                ? 'border-emerald-300 dark:border-emerald-800'
                : 'border-slate-200 dark:border-slate-700'
            }
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0">{getFileIcon(file.name)}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{file.size}</span>
                  <span>•</span>
                  {status === 'VALIDATING' && (
                    <span className="text-amber-500 flex items-center gap-1 font-medium">
                      <Loader2 className="w-3 h-3 animate-spin" /> Validating format...
                    </span>
                  )}
                  {status === 'UPLOADING' && (
                    <span className="text-[#0052CC] flex items-center gap-1 font-medium">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading ({uploadProgress}%)
                    </span>
                  )}
                  {status === 'UPLOADED' && (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready & Attached
                    </span>
                  )}
                  {status === 'REMOVING' && (
                    <span className="text-rose-500 flex items-center gap-1 font-medium">
                      <Loader2 className="w-3 h-3 animate-spin" /> Removing...
                    </span>
                  )}
                  {status === 'FAILED' && (
                    <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> Upload failed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {status === 'FAILED' && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              )}

              {status !== 'UPLOADING' && status !== 'REMOVING' && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Upload progress bar */}
          {status === 'UPLOADING' && (
            <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#0052CC] h-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {activeError && (
        <p
          role="alert"
          className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-1 animate-in fade-in duration-150"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{activeError}</span>
        </p>
      )}
    </div>
  );
};
