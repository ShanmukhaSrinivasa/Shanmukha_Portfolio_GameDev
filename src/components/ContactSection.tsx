import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { playPop, playSuccess, playClick, playError } from '@/hooks/useSoundEffects';
import SectionBlock from './SectionBlock';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playClick();

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      
      playSuccess();
      setForm({ name: '', email: '', message: '' });
      setShowSuccess(true); // Trigger custom modal instead of alert
    } catch (error) {
      playError();
      console.error("UPLINK_ERROR:", error);
      alert("CRITICAL_FAILURE: Packet loss detected in transmission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('shannugopa@gmail.com');
    playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionBlock id="contact" title="Get in Touch">
      <div className="grid md:grid-cols-2 gap-8 md:gap-20">
        
        {/* Left Column: Information Cards */}
        <div className="space-y-8 md:space-y-10">
          <p className="font-mono text-blue-100/60 leading-relaxed text-base uppercase tracking-wider">
            // Establish a secure connection. The channel is open for engine optimization and gameplay systems discussion.
          </p>

          <div className="space-y-6">
            <div className="group flex items-center gap-4 p-4 border-2 border-blue-500/20 bg-[#161e2d] hover:border-blue-500 transition-all duration-300">
              <div className="p-3 bg-blue-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500/50 mb-1 font-black">Primary Frequency</p>
                <p className="font-mono text-sm break-all text-white font-bold">shannugopa@gmail.com</p>
              </div>
              <button onClick={copyEmail} className="p-2 hover:bg-blue-500/10 border border-blue-500/20">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 border-2 border-blue-500/20 bg-[#161e2d] hover:border-blue-500 transition-all duration-300">
              <div className="p-3 bg-blue-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500/50 mb-1 font-black">Current Status</p>
                <p className="font-mono text-sm text-white font-bold underline decoration-green-500 decoration-2 underline-offset-4">AVAILABLE_FOR_PROJECTS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            required
            placeholder="IDENTIFIER (NAME)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#161e2d] border-2 border-blue-500/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 font-mono"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="RETURN_PATH (EMAIL)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#161e2d] border-2 border-blue-500/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 font-mono"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="TRANSMISSION_DATA"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-[#161e2d] border-2 border-blue-500/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 font-mono resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-mono uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <span className="font-black">{isSubmitting ? 'ESTABLISHING_LINK...' : 'INITIATE_TRANSFER'}</span>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-[#0f172a] border-4 border-blue-600 p-8 shadow-[20px_20px_0px_0px_rgba(30,58,138,0.3)]">
            {/* Corner Decor */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white -translate-x-2 -translate-y-2" />
            
            <div className="text-center space-y-6">
              <div className="inline-flex p-5 bg-blue-600/20 border-2 border-blue-500 rounded-full text-blue-400">
                <Check className="w-12 h-12" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase font-mono">
                  Signal_Confirmed
                </h3>
                <p className="text-blue-200/60 font-mono text-xs uppercase tracking-widest">
                  Packet ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-blue-500/20 text-left">
                <p className="text-sm font-mono text-blue-100/80 leading-relaxed">
                  <span className="text-blue-500 font-bold">NOTICE:</span> Transmission successful. Your data has been encrypted and routed to the primary terminal. Expect a response on the provided return path shortly.
                </p>
              </div>

              <button
                onClick={() => { setShowSuccess(false); playPop(); }}
                className="w-full py-4 bg-blue-600 text-white font-mono font-black uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
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