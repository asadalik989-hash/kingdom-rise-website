import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { COMPANY_PROFILE } from '../data/companyData';
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  TRANSITIONS,
  ImageReveal,
} from '../components/motion';
import { Button } from '../components/ui/Button';
import { TextInput, Textarea } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import {
  MapPin,
  Mail,
  Globe,
  Phone,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  Send,
  Building,
  Clock,
  Copy,
  Check,
  AlertCircle,
  FileCheck2,
  RefreshCw,
} from 'lucide-react';
import { EmailDeliveryStatus } from '../types/componentStates';

type ContactFormStatus =
  | 'INITIAL'
  | 'EDITING'
  | 'VALIDATION_ERROR'
  | 'SUBMITTING'
  | 'DATABASE_SUCCESS'
  | 'SUBMISSION_ERROR';

export const ContactPage: React.FC = () => {
  const { addMessage, openTenderModal } = useApp();
  const { showSuccess, showError } = useToast();

  const [status, setStatus] = useState<ContactFormStatus>('INITIAL');
  const [emailStatus, setEmailStatus] = useState<EmailDeliveryStatus>('QUEUED');
  const [referenceId, setReferenceId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'A valid corporate or personal email is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide an inquiry description of at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus('VALIDATION_ERROR');
      return;
    }

    setFieldErrors({});
    setStatus('SUBMITTING');

    try {
      // Direct database submission returning real firestore ID
      const docId = await addMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'N/A',
        subject: formData.subject.trim() || 'General Commercial Inquiry',
        message: formData.message.trim(),
      });

      const refCode = `KRC-MSG-${new Date().getFullYear()}-${docId ? docId.substring(0, 5).toUpperCase() : Math.floor(1000 + Math.random() * 9000)}`;
      setReferenceId(refCode);
      setStatus('DATABASE_SUCCESS');
      setEmailStatus('ACCEPTED_BY_PROVIDER');
      showSuccess('Inquiry Received', `Logged under Reference ID: ${refCode}`);
    } catch (err: any) {
      setStatus('SUBMISSION_ERROR');
      setServerError(err?.message || 'Database synchronization failed. Your form information has been preserved.');
      setEmailStatus('FAILED');
      showError('Submission Error', 'Failed to dispatch inquiry. Please retry.');
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
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setFieldErrors({});
    setServerError(null);
    setStatus('INITIAL');
    setEmailStatus('QUEUED');
    setReferenceId('');
  };

  return (
    <div className="bg-[#F4F7FA] text-[#333333] min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0052CC]/15 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00C7AE]">
                <span>Chapter 10 · Commercial Partnerships & Contact</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Contact Kingdom Rise Limited
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-slate-300 leading-relaxed">
                Connect with our corporate headquarters in Jeddah for official tenders, engineering procurement, joint ventures, and executive advisory.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info, Registrations & Banking */}
            <div className="lg:col-span-5">
              <StaggerContainer staggerDelay={0.1} className="space-y-6">
                {/* Office Details */}
                <StaggerItem>
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
                    <h3 className="text-lg font-bold text-[#333333] border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Building className="w-5 h-5 text-[#0052CC]" />
                      <span>Corporate Headquarters</span>
                    </h3>

                    <ImageReveal
                      src="/src/assets/images/corporate/kingdom-rise-corporate-headquarters.jpg"
                      alt="Kingdom Rise Limited Corporate Headquarters Jeddah"
                      badge="JEDDAH CORPORATE OFFICE"
                      className="rounded-xl border border-slate-200 shadow-sm"
                    />

                    <div className="space-y-4 text-xs">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-[#333333]">Head Office Address</strong>
                          <span className="text-[#666666]">Jeddah, Kingdom of Saudi Arabia</span>
                          <span className="block text-[#888888] mt-0.5">The Gateway to the Two Holy Mosques</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-[#333333]">Direct Telephone Line</strong>
                          <a href="tel:+966562997929" className="text-[#0052CC] hover:underline font-mono">
                            +966 56 299 7929
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-[#333333]">Official Correspondence Email</strong>
                          <span className="text-[#666666]">{COMPANY_PROFILE.email}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-[#333333]">Operating Hours</strong>
                          <span className="text-[#666666]">Sunday - Thursday: 8:00 AM - 5:00 PM</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => openTenderModal()}
                        leftIcon={<FileCheck2 className="w-4 h-4" />}
                      >
                        Open Tender & Prequalification Pack
                      </Button>
                    </div>
                  </div>
                </StaggerItem>

                {/* Legal & Banking Credentials */}
                <StaggerItem>
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4 text-xs">
                    <h4 className="font-bold text-[#333333] flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Landmark className="w-4 h-4 text-[#0052CC]" />
                      <span>Commercial Registrations & Banking</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div className="p-3 rounded-lg bg-[#F4F7FA]">
                        <span className="text-[#888888] block">Commercial Reg. (CR)</span>
                        <strong className="text-[#333333] font-mono">4030123456 (Jeddah)</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F4F7FA]">
                        <span className="text-[#888888] block">VAT Certificate</span>
                        <strong className="text-[#333333] font-mono">310000000000003</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F4F7FA]">
                        <span className="text-[#888888] block">Primary Bank</span>
                        <strong className="text-[#333333]">SNB (Saudi National Bank)</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F4F7FA]">
                        <span className="text-[#888888] block">Chamber Membership</span>
                        <strong className="text-[#333333] font-mono">142088 (Jeddah)</strong>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Right: Contact Inquiry Form with Complete State Machine */}
            <div className="lg:col-span-7">
              <Reveal delay={0.2}>
                <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm relative">
                  {/* State: DATABASE_SUCCESS Screen */}
                  {status === 'DATABASE_SUCCESS' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: TRANSITIONS.corporateEase }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>

                      <div className="space-y-2 max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-[#333333]">Inquiry Successfully Registered</h3>
                        <p className="text-xs text-[#666666] leading-relaxed">
                          Your message has been verified and persisted in our corporate database. Our Client Relations Directorate in Jeddah will review your inquiry and follow up at <strong>{formData.email}</strong>.
                        </p>
                      </div>

                      {/* Official Reference Card */}
                      <div className="p-4 rounded-xl bg-[#F4F7FA] border border-slate-200 max-w-sm mx-auto text-left space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                          Official Tracking Reference ID
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-base font-extrabold text-[#0052CC]">
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
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Email Confirmation Status:</span>
                          <span className="font-semibold text-emerald-600">
                            {emailStatus === 'ACCEPTED_BY_PROVIDER'
                              ? 'Accepted by Dispatch Provider'
                              : 'Processing Queue'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-center gap-3">
                        <Button variant="primary" onClick={handleReset}>
                          Submit Another Inquiry
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    /* States: INITIAL, EDITING, VALIDATION_ERROR, SUBMITTING, SUBMISSION_ERROR */
                    <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                      <div>
                        <h3 className="text-lg font-bold text-[#333333]">Send an Official Commercial Inquiry</h3>
                        <p className="text-xs text-[#888888] mt-0.5">
                          Direct message routed securely to our executive engineering administration.
                        </p>
                      </div>

                      {serverError && (
                        <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            <span>{serverError}</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-2 py-1 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-[11px] flex items-center gap-1 shrink-0"
                          >
                            <RefreshCw className="w-3 h-3" /> Retry
                          </button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput
                          label="Your Full Name"
                          required
                          placeholder="e.g. Eng. Fahad Al-Otaibi"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setStatus('EDITING');
                            if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: '' }));
                          }}
                          error={fieldErrors.name}
                        />

                        <TextInput
                          label="Corporate Email Address"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setStatus('EDITING');
                            if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: '' }));
                          }}
                          error={fieldErrors.email}
                        />

                        <TextInput
                          label="Phone Number"
                          type="tel"
                          placeholder="+966 5X XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            setStatus('EDITING');
                          }}
                        />

                        <TextInput
                          label="Subject / Department"
                          placeholder="e.g. Substation Prequalification"
                          value={formData.subject}
                          onChange={(e) => {
                            setFormData({ ...formData, subject: e.target.value });
                            setStatus('EDITING');
                          }}
                        />
                      </div>

                      <Textarea
                        label="Inquiry Narrative / Technical Scope"
                        required
                        rows={5}
                        placeholder="Please provide details regarding your required contracting scope, location, timeline, and company profile..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          setStatus('EDITING');
                          if (fieldErrors.message) setFieldErrors((p) => ({ ...p, message: '' }));
                        }}
                        error={fieldErrors.message}
                      />

                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          fullWidth
                          isLoading={status === 'SUBMITTING'}
                          loadingText="Transmitting Inquiry to Jeddah Head Office..."
                          rightIcon={<Send className="w-4 h-4" />}
                        >
                          Dispatch Inquiry to Head Office
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
