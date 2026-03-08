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
  Loader2
} from 'lucide-react';

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  playClick();

  // SYSTEM DIAGNOSTICS: Double-check these in your EmailJS Dashboard
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Explicit Data Mapping
  const templateParams = {
    name: form.name,    // Matches {{name}} in your template
    email: form.email,  // Matches {{email}} in your template
    message: form.message // Matches {{message}} in your template
  };

  try {
    // Switching to .send() for better stability
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    playSuccess();
    setForm({ name: '', email: '', message: '' });
    alert("SIGNAL_CONFIRMED: Transmission successful. I'll get back to you soon!");
  } catch (error: any) {
    playError();
    console.error("UPLINK_ERROR:", error);
    
    // This will help us find the EXACT reason for the 400 error
    const errorMsg = error?.text || "Packet loss detected.";
    alert(`CRITICAL_FAILURE: ${errorMsg}`);
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
        
        {/* Left Column: System Status */}
        <div className="space-y-8 md:space-y-10">
          <p className="font-mono text-blue-100/60 leading-relaxed text-base uppercase tracking-wider">
            // Establish a secure connection. Whether you're looking to discuss engine optimization or specialized gameplay systems, the channel is open.
          </p>

          <div className="space-y-6">
            <div className="group flex items-center gap-4 p-4 border-2 border-blue-500/20 bg-[#161e2d] hover:border-blue-500 transition-all duration-300">
              <div className="p-3 bg-blue-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500/50 mb-1 font-black">
                  Primary Frequency
                </p>
                <p className="font-mono text-sm break-all text-white font-bold">
                  shannugopa@gmail.com
                </p>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 hover:bg-blue-500/10 rounded-none transition-colors relative border border-blue-500/20"
                title="Copy Email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-blue-400" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 border-2 border-blue-500/20 bg-[#161e2d] hover:border-blue-500 transition-all duration-300">
              <div className="p-3 bg-blue-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-500/50 mb-1 font-black">
                  Current Status
                </p>
                <p className="font-mono text-sm text-white font-bold underline decoration-green-500 decoration-2 underline-offset-4">
                  AVAILABLE_FOR_PROJECTS
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-500/30 mb-4 font-black">
              // CONNECT WITH ME
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Github, href: 'https://github.com/ShanmukhaSrinivasa' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/shanmukha-gopa-1599748a/' },
                { Icon: InstagramIcon, href: 'https://www.instagram.com/shk_shanmukha/' },
                { Icon: Gamepad2, href: 'https://shanmukha.itch.io/' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="p-3 border-2 border-blue-500/20 bg-[#161e2d] text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <input
              name="name" // Matches {{name}} in EmailJS
              type="text"
              required
              placeholder=" "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="peer w-full bg-[#161e2d] border-2 border-blue-500/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
            />
            <label className="absolute left-4 top-4 text-blue-500/40 text-[10px] uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-blue-400 peer-focus:bg-[#0f172a] peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-blue-400 peer-[:not(:placeholder-shown)]:bg-[#0f172a] peer-[:not(:placeholder-shown)]:px-2">
              Identifier (Name)
            </label>
          </div>

          <div className="group relative">
            <input
              name="email" // Matches {{email}} in EmailJS
              type="email"
              required
              placeholder=" "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="peer w-full bg-[#161e2d] border-2 border-blue-500/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono"
            />
            <label className="absolute left-4 top-4 text-blue-500/40 text-[10px] uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-blue-400 peer-focus:bg-[#0f172a] peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-blue-400 peer-[:not(:placeholder-shown)]:bg-[#0f172a] peer-[:not(:placeholder-shown)]:px-2">
              Return Path (Email)
            </label>
          </div>

          <div className="group relative">
            <textarea
              name="message" // Matches {{message}} in EmailJS
              required
              rows={5}
              placeholder=" "
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="peer w-full bg-[#161e2d] border-2 border-blue-500/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono"
            />
            <label className="absolute left-4 top-4 text-blue-500/40 text-[10px] uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-blue-400 peer-focus:bg-[#0f172a] peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-blue-400 peer-[:not(:placeholder-shown)]:bg-[#0f172a] peer-[:not(:placeholder-shown)]:px-2">
              Transmission_Data
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full group relative flex items-center justify-center gap-3 px-8 py-4 ${isSubmitting ? 'bg-blue-900' : 'bg-blue-600'} text-white font-mono uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:bg-blue-700`}
          >
            <span className="relative z-10 font-black">
              {isSubmitting ? 'ESTABLISHING_LINK...' : 'INITIATE_TRANSFER'}
            </span>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin relative z-10" />
            ) : (
              <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
          </button>
        </form>
      </div>
    </SectionBlock>
  );
};

export default ContactSection;