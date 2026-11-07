import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { playPop, playSuccess, playClick, playError } from '@/hooks/useSoundEffects';
import SectionBlock from './SectionBlock';
import TerminalWindow from './TerminalWindow';
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  InstagramIcon,
  Gamepad2,
  Send,
  Globe,
  Loader2,
  X
} from 'lucide-react';

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Modal state
  const [packetId, setPacketId] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSendError(null);
    playClick();

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS environment variables are not configured.');
      }
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      
      playSuccess();
      setForm({ name: '', email: '', message: '' });
      setPacketId(Math.random().toString(36).slice(2, 11).toUpperCase());
      setShowSuccess(true); // Trigger custom modal instead of alert
    } catch (error) {
      playError();
      console.error("UPLINK_ERROR:", error);
      setSendError('CRITICAL_FAILURE: Transmission failed. Please try again or email me directly at shannugopa@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText('shannugopa@gmail.com')
      .then(() => {
        playPop();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => playError());
  };

  return (
    <SectionBlock id="contact" eyebrow="06 — Contact" command="mail --compose" title="Get in touch" wide>
      <div className="grid md:grid-cols-2 gap-8 md:gap-20">
        
        {/* Left Column: Information Cards */}
        <div className="space-y-8 md:space-y-10">
          <p className="font-mono text-blue-100/60 leading-relaxed text-base uppercase tracking-wider">
            // Establish a secure connection. The channel is open for engine optimization and gameplay systems discussion.
          </p>

          <div className="space-y-6">
            <div className="group flex items-center gap-4 p-4 border border-line bg-surface hover:border-primary/60 transition-all duration-300">
              <div className="p-3 bg-blue-600 text-foreground">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500/50 mb-1 font-semibold">Primary Frequency</p>
                <p className="font-mono text-sm break-all text-foreground font-bold">shannugopa@gmail.com</p>
              </div>
              <button type="button" onClick={copyEmail} aria-label="Copy email address" className="p-2 hover:bg-blue-500/10 border border-line">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 border border-line bg-surface hover:border-primary/60 transition-all duration-300">
              <div className="p-3 bg-blue-600 text-foreground">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500/50 mb-1 font-semibold">Current Status</p>
                <p className="font-mono text-sm text-foreground font-bold underline decoration-green-500 decoration-2 underline-offset-4">AVAILABLE_FOR_PROJECTS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <TerminalWindow title="mail --to shanmukha" status="draft" bodyClassName="p-5 md:p-6">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            required
            placeholder="IDENTIFIER (NAME)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-surface border border-line px-4 py-4 text-foreground focus:outline-none focus:border-blue-500 font-mono"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="RETURN_PATH (EMAIL)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-surface border border-line px-4 py-4 text-foreground focus:outline-none focus:border-blue-500 font-mono"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="TRANSMISSION_DATA"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-surface border border-line px-4 py-4 text-foreground focus:outline-none focus:border-blue-500 font-mono resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-foreground font-mono uppercase tracking-[0.2em] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled: disabled: disabled:"
          >
            <span className="font-semibold">{isSubmitting ? 'ESTABLISHING_LINK...' : 'INITIATE_TRANSFER'}</span>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
          {sendError && (
            <p role="alert" className="font-mono text-xs text-red-400 border-2 border-red-500/40 bg-red-500/10 px-4 py-3">
              {sendError}
            </p>
          )}
        </form>
        </TerminalWindow>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-background border-4 border-blue-600 p-8">
            {/* Corner Decor */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white -translate-x-2 -translate-y-2" />
            
            <div className="text-center space-y-6">
              <div className="inline-flex p-5 bg-blue-600/20 border border-line rounded-full text-blue-400">
                <Check className="w-12 h-12" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground tracking-tighter uppercase font-mono">
                  Signal_Confirmed
                </h3>
                <p className="text-blue-200/60 font-mono text-xs uppercase tracking-widest">
                  Packet ID: {packetId}
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-line text-left">
                <p className="text-sm font-mono text-blue-100/80 leading-relaxed">
                  <span className="text-blue-500 font-bold">NOTICE:</span> Transmission successful. Your data has been encrypted and routed to the primary terminal. Expect a response on the provided return path shortly.
                </p>
              </div>

              <button
                onClick={() => { setShowSuccess(false); playPop(); }}
                className="w-full py-4 bg-blue-600 text-foreground font-mono font-semibold uppercase tracking-widest hover:bg-blue-500 transition-colors"
              >
                Close_Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionBlock>
  );
};

export default ContactSection;