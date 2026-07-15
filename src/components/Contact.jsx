import { useState } from 'react'
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    // Using a mailto link so it works immediately without a backend API key
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      window.location.href = `mailto:pithavaraj4@gmail.com?subject=${subject}&body=${body}`
      
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 500) // Small delay for UX
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent dark:via-purple-500/10 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div>
            <ScrollReveal>
              <p className="text-sm font-mono text-primary tracking-wide uppercase mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's build something{' '}
                <span className="gradient-text">amazing together.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-lg">
                I'm always open to discussing new projects, creative ideas, internship
                opportunities, or just having a conversation about tech.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="space-y-4">
                <a
                  href="mailto:pithavaraj4@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Email</p>
                    <p className="font-semibold">pithavaraj4@gmail.com</p>
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Form */}
          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 glass-card rounded-xl form-input text-sm dark:text-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 glass-card rounded-xl form-input text-sm dark:text-white"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full pl-11 pr-4 py-3.5 glass-card rounded-xl form-input text-sm resize-none dark:text-white"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === 'idle' && (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                )}
                {status === 'error' && 'Something went wrong. Try again.'}
              </button>

              <p className="text-xs text-slate-400 text-center">
                Or reach out directly at{' '}
                <a href="mailto:pithavaraj4@gmail.com" className="text-primary hover:underline">
                  pithavaraj4@gmail.com
                </a>
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
