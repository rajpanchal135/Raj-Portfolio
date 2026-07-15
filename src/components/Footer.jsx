import { Github, Linkedin, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-16 border-t border-slate-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* Logo */}
          <a
            href="#"
            onClick={scrollToTop}
            className="font-bold text-2xl tracking-tighter hover:text-primary transition-colors"
          >
            RAJ <span className="text-primary">PITHAVA</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rajpanchal135"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/raj-pithava"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-white/5 mb-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Designed & Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Raj Pithava
          </p>
          <p className="text-slate-400 text-xs font-mono">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Back to Top */}
        <div className="flex justify-center mt-10">
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-colors font-mono"
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  )
}
