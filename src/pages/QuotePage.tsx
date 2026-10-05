import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Reveal,
  TRANSITIONS,
} from '../components/motion';
import { Button } from '../components/ui/Button';
import { TextInput, SelectInput, Textarea } from '../components/ui/Input';
import { FileUpload } from '../components/ui/FileUpload';
import { useToast } from '../components/ui/Toast';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Clock,
  Sparkles,
  Paperclip,
  Check,
  Copy,
  AlertCircle,
  Edit3,
  Send,
  RefreshCw,
} from 'lucide-react';
import { EmailDeliveryStatus } from '../types/componentStates';

export const QuotePage: React.FC = () => {
  const { addQuote, pageParams } = useApp();
  const { showSuccess, showError } = useToast();

  // Multi-step: 1: Contact, 2: Project, 3: Scope & Documents, 4: Review & Submit
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(pageParams.prefillProject || 'Civil Infrastructure & Foundations');
  const [projectLocation, setProjectLocation] = useState('Jeddah');
  const [estimatedBudget, setEstimatedBudget] = useState('SAR 5M - 15M');
  const [timeline, setTimeline] = useState('Within 3-6 Months');
  const [scopeDescription, setScopeDescription] = useState(
    pageParams.prefillProject ? `Inquiry regarding: ${pageParams.prefillProject}` : ''
  );
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<EmailDeliveryStatus>('QUEUED');
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const projectTypes = [
    'Civil Infrastructure & Foundations',
    'Earthworks & Heavy Excavation',
    '380kV / 132kV Power Transmission & Substations',
    'Electrical Installation & SCADA Automation',
    'Mechanical Piping, HVAC & Fire-Fighting',
    'Building Construction & Architectural Finishing',
    'Heavy Equipment & Machinery Fleet Lease',
    'Turnkey Multi-Disciplinary EPC Package',
  ];

  const saudiLocations = [
    'Jeddah',
    'Makkah Al-Mukarramah',
    'Madinah Al-Munawwarah',
    'Riyadh',
    'Yanbu Industrial City',
    'Rabigh',
    'Jubail Industrial City',
    'Dammam / Khobar',
    'Tabuk / Northern Borders',
    'Other Location in Saudi Arabia',
  ];

  const budgetRanges = [
    'Under SAR 1 Million',
    'SAR 1M - 5M',
    'SAR 5M - 15M',
    'SAR 15M - 50M',
    'Over SAR 50 Million',
    'To Be Determined / Open Tender',
  ];

  const timelineOptions = [
    'Immediate (Urgent Mobilization)',
    'Within 1-3 Months',
    'Within 3-6 Months',
    '6-12 Months',
    'Long-Term Strategic Development (12+ Months)',
  ];

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!fullName.trim()) errs.fullName = 'Full contact name is required.';
      if (!email.trim() || !email.includes('@')) errs.email = 'Valid business email is required.';
      if (!phone.trim()) errs.phone = 'Contact telephone is required.';
    } else if (step === 2) {
      if (!projectType) errs.projectType = 'Please select the engineering project discipline.';
      if (!projectLocation) errs.projectLocation = 'Please select project location.';
    } else if (step === 3) {
      if (!scopeDescription.trim() || scopeDescription.trim().length < 15) {
        errs.scopeDescription = 'Please provide an engineering scope summary (at least 15 characters).';
      }
    }

    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goToNextStep = () => {
    setServerError(null);
    if (!validateStep(currentStep)) return;
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const goToPrevStep = () => {
    setServerError(null);
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const jumpToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setServerError('Please review and complete all steps before final submission.');
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const docId = await addQuote({
        fullName: fullName.trim(),
        companyName: companyName.trim() || 'Private Developer / Consultant',
        email: email.trim(),
        phone: phone.trim() || 'N/A',
        projectType,
        projectLocation,
        estimatedBudget,
        timeline,
        scopeDescription: attachedFile
          ? `${scopeDescription} (Document Attached: ${attachedFile.name})`
          : scopeDescription,
      });

      const refCode = `KRC-QUO-${new Date().getFullYear()}-${docId ? docId.substring(0, 5).toUpperCase() : Math.floor(1000 + Math.random() * 9000)}`;
      setReferenceId(refCode);
      setSubmitted(true);
      setEmailStatus('ACCEPTED_BY_PROVIDER');
      showSuccess('Quote Request Received', `Official Reference ID: ${refCode}`);
    } catch (err: any) {
      setServerError(err?.message || 'Quote transmission encountered a database timeout. Your data has been preserved.');
      setEmailStatus('FAILED');
      showError('Submission Error', 'Failed to register quote request. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCurrentStep(1);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setScopeDescription('');
    setAttachedFile(null);
    setServerError(null);
    setStepErrors({});
    setReferenceId('');
  };

  const stepTitles = [
    { num: 1, title: 'Contact Information', desc: 'Authorized representative details' },
    { num: 2, title: 'Project Parameters', desc: 'Sector, location & budget' },
    { num: 3, title: 'Scope & Attachments', desc: 'Technical specifications' },
    { num: 4, title: 'Review & Submit', desc: 'Final audit & verification' },
  ];

  return (
    <div className="bg-[#F4F7FA] text-[#333333] min-h-screen">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>Tenders & Estimating Directorate</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Request an Engineering Quote & BOQ
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Provide preliminary engineering scopes, schedule milestones, and bill of quantities. Our estimation teams in Jeddah will evaluate your requirements according to Royal Commission and Saudi Vision 2030 standards.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* State: SUCCESS Screen with Verified Reference ID */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-[#333333]">
                  Quote Request Successfully Logged
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Your project dossier has been assigned to our Senior Estimating Engineer for <strong>{projectLocation}</strong>. A formal technical acknowledgement has been routed to <strong>{email}</strong>.
                </p>
              </div>

              {/* Verified Reference Code */}
              <div className="p-5 rounded-xl bg-[#F4F7FA] border border-slate-200 max-w-md mx-auto text-left space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                  Official Quote Request Reference ID
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-lg font-extrabold text-[#0052CC]">
                    {referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="px-2.5 py-1 text-xs rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Email Confirmation Status:</span>
                  <span className="font-semibold text-emerald-600">
                    {emailStatus === 'ACCEPTED_BY_PROVIDER'
                      ? 'Accepted by Dispatch Provider'
                      : 'Processing Queue'}
                  </span>
                </div>
              </div>

              {/* Summary Highlights */}
              <div className="max-w-md mx-auto p-4 rounded-xl border border-slate-100 bg-white grid grid-cols-2 gap-3 text-left text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Discipline</span>
                  <strong className="text-slate-800 truncate block">{projectType}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Location</span>
                  <strong className="text-slate-800">{projectLocation}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Estimated Range</span>
                  <strong className="text-slate-800">{estimatedBudget}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Target Timeline</span>
                  <strong className="text-slate-800">{timeline}</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Button variant="primary" onClick={handleReset}>
                  Submit Another Quote Request
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
              {/* Multi-Step Progress Indicator */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Step {currentStep} of 4: {stepTitles[currentStep - 1].title}</span>
                  <span className="font-mono text-[#0052CC] font-bold">
                    {Math.round((currentStep / 4) * 100)}% Complete
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#0052CC] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>

                {/* Stepper Dots */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-2">
                  {stepTitles.map((st) => {
                    const isCompleted = currentStep > st.num;
                    const isCurrent = currentStep === st.num;
                    return (
                      <div
                        key={st.num}
                        onClick={() => isCompleted && jumpToStep(st.num)}
                        className={`text-left p-1.5 sm:p-2 rounded-lg transition-all ${
                          isCompleted ? 'cursor-pointer hover:bg-slate-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-[#0052CC] text-white ring-2 ring-[#0052CC]/20'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isCompleted ? <Check className="w-3 h-3" /> : st.num}
                          </span>
                          <span
                            className={`text-[10px] sm:text-[11px] font-bold truncate ${
                              isCurrent ? 'text-[#0052CC]' : 'text-slate-600'
                            }`}
                          >
                            <span className="sm:hidden">{st.num}</span>
                            <span className="hidden sm:inline">{st.title}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Server / Step Error Banner */}
              {serverError && (
                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-2.5 py-1 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                </div>
              )}

              {/* Form Steps */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* STEP 1: Contact Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: direction * 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 25 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-xs"
                    >
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-base font-bold text-slate-900">
                          Step 1: Authorized Contact Information
                        </h3>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Who should receive the official engineering quote and tender correspondence?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput
                          label="Your Full Name"
                          required
                          placeholder="e.g. Eng. Tariq Al-Ghamdi"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (stepErrors.fullName) setStepErrors((p) => ({ ...p, fullName: '' }));
                          }}
                          error={stepErrors.fullName}
                        />

                        <TextInput
                          label="Company / Contracting Entity"
                          placeholder="e.g. Red Sea Real Estate Development"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          helperText="Leave blank if private developer or consultant"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput
                          label="Corporate Email Address"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (stepErrors.email) setStepErrors((p) => ({ ...p, email: '' }));
                          }}
                          error={stepErrors.email}
                        />

                        <TextInput
                          label="Direct Contact Number"
                          type="tel"
                          required
                          placeholder="+966 5X XXX XXXX"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (stepErrors.phone) setStepErrors((p) => ({ ...p, phone: '' }));
                          }}
                          error={stepErrors.phone}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Project Information */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: direction * 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 25 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-xs"
                    >
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-base font-bold text-slate-900">
                          Step 2: Project Classification & Parameters
                        </h3>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Specify the primary engineering package, site geography, and financial envelope.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectInput
                          label="Primary Engineering Discipline"
                          required
                          options={projectTypes}
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                        />

                        <SelectInput
                          label="Project Geography / Saudi Region"
                          required
                          options={saudiLocations}
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectInput
                          label="Estimated Budget Envelope (SAR)"
                          options={budgetRanges}
                          value={estimatedBudget}
                          onChange={(e) => setEstimatedBudget(e.target.value)}
                        />

                        <SelectInput
                          label="Target Mobilization Timeline"
                          options={timelineOptions}
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Documents and Attachments */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: direction * 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 25 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-xs"
                    >
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-base font-bold text-slate-900">
                          Step 3: Technical Scope & Document Attachments
                        </h3>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Describe the scope of work, deliverables, and attach BOQ or tender drawings.
                        </p>
                      </div>

                      <Textarea
                        label="Scope Summary & Technical Deliverables"
                        required
                        rows={4}
                        placeholder="Detail the scope of work: e.g. 50,000 m3 excavation, concrete raft foundations, 380kV cabling, or equipment fleet duration..."
                        value={scopeDescription}
                        onChange={(e) => {
                          setScopeDescription(e.target.value);
                          if (stepErrors.scopeDescription) {
                            setStepErrors((p) => ({ ...p, scopeDescription: '' }));
                          }
                        }}
                        error={stepErrors.scopeDescription}
                      />

                      <FileUpload
                        label="Attach BOQ, Tender Drawings, or Specifications (Optional)"
                        helperText="Supported formats: PDF, DWG, XLSX, DOCX, ZIP (Max 15MB)"
                        onFileSelect={(file) => {
                          setAttachedFile({
                            name: file.name,
                            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                          });
                        }}
                        onFileRemove={() => setAttachedFile(null)}
                      />
                    </motion.div>
                  )}

                  {/* STEP 4: Review & Submit */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: direction * 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 25 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5 text-xs"
                    >
                      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            Step 4: Final Review & Submission Audit
                          </h3>
                          <p className="text-slate-500 text-[11px] mt-0.5">
                            Verify your information before transmitting to our estimation committee in Jeddah.
                          </p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#00C7AE]/15 text-[#00C7AE] font-bold">
                          Ready for Dispatch
                        </span>
                      </div>

                      {/* Section 1 Audit */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-[#F4F7FA] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5 text-[#0052CC]" /> Contact Details
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(1)}
                            className="text-[#0052CC] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Name</span>
                            <strong>{fullName}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Company</span>
                            <strong>{companyName || 'N/A'}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Email</span>
                            <strong className="truncate block">{email}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Phone</span>
                            <strong>{phone}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 Audit */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-[#F4F7FA] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#0052CC]" /> Project Parameters
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(2)}
                            className="text-[#0052CC] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Discipline</span>
                            <strong className="truncate block">{projectType}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Location</span>
                            <strong>{projectLocation}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Budget Envelope</span>
                            <strong>{estimatedBudget}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Timeline</span>
                            <strong>{timeline}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Section 3 Audit */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-[#F4F7FA] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#0052CC]" /> Scope & Documents
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(3)}
                            className="text-[#0052CC] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {scopeDescription}
                        </p>
                        {attachedFile && (
                          <div className="text-[10px] text-emerald-600 flex items-center gap-1 pt-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Attachment: {attachedFile.name} ({attachedFile.size})</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={goToPrevStep}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Previous Step
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={goToNextStep}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Continue to Step {currentStep + 1}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                      loadingText="Transmitting to Estimating Committee..."
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Authorize & Dispatch Quote Request
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
