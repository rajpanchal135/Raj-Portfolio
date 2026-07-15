import { MapPin } from 'lucide-react'
import ScrollReveal from './ScrollReveal'



export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      {/* Background decoration for glass effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent dark:via-blue-500/10 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <ScrollReveal direction="left" className="md:col-span-2 flex justify-center">
            <div className="relative">
              {/* Gradient Ring */}
              <div className="avatar-ring w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                <img
                  src="/PSPHOTO.png"
                  alt="Raj Pithava"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Bio Content */}
          <div className="md:col-span-3 space-y-6">
            <ScrollReveal direction="right">
              <p className="text-sm font-mono text-primary tracking-wide uppercase mb-2">About Me</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Passionate about building{' '}
                <span className="gradient-text">systems that scale.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150}>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                I'm Raj Pithava, a Full Stack Developer currently pursuing my M.Sc. in IT
                at GLS University. I specialize in building distributed systems, real-time
                applications, and AI-powered tools using Python, TCP/IP sockets, and modern
                web technologies.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={250}>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                When I'm not coding, you'll find me exploring new frameworks, contributing
                to open-source projects, or diving deep into system architecture patterns.
                I believe in writing clean, maintainable code that solves real problems.
              </p>
            </ScrollReveal>

            {/* Stats section removed */}
          </div>
        </div>
      </div>
    </section>
  )
}
