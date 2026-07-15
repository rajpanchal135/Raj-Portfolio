import useTypingEffect from '../hooks/useTypingEffect'
import ScrollReveal from './ScrollReveal'
import { ArrowDown } from 'lucide-react'

const typingWords = ['Scalable Systems', 'AI Solutions', 'Distributed Apps', 'Real-time Software']

export default function Hero() {
  const typedText = useTypingEffect(typingWords, 110, 70, 2200)

  return (
    <section className="relative pt-28 pb-24 px-6 overflow-hidden min-h-[100svh] flex items-center">
      {/* Background Glow Effects */}
      <div className="hero-glow hero-glow-blue"></div>
      <div className="hero-glow hero-glow-purple"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <ScrollReveal delay={0}>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-primary text-xs font-mono mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            OPEN FOR INTERNSHIPS & FULL-TIME ROLES
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          {/* Headline with Typing Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.05]">
            Building <br className="md:hidden" />
            <span className="gradient-text italic pr-1 md:pr-2">
              {typedText}
            </span>
            <span className="typing-cursor">&nbsp;</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            I'm an <strong className="text-slate-700 dark:text-slate-200">M.Sc. IT Student</strong> and{' '}
            <strong className="text-slate-700 dark:text-slate-200">Full Stack Developer</strong> specializing in Python,
            TCP/IP Socket Programming, and Real-time Distributed Applications.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="mailto:pithavaraj4@gmail.com"
              className="group px-8 py-3.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              Hire Me
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-3.5 border border-slate-300 dark:border-white/10 rounded-full font-semibold hover:bg-slate-100 dark:hover:bg-white/5 hover:border-primary/30 transition-all duration-300"
            >
              View Case Studies
            </a>
          </div>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <ScrollReveal delay={700}>
          <div className="animate-float">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex flex-col items-center gap-2 text-slate-400 hover:text-primary transition-colors"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
