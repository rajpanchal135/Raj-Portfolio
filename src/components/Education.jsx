import { Award } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const educationItems = [
  {
    title: 'M.Sc. IT in Full Stack Development',
    period: '2025 — 2027',
    periodColor: 'text-primary',
    institution: 'GLS University, Ahmedabad',
    description: 'Specializing in full-stack development, distributed computing, and AI systems.',
    dotColor: 'bg-primary',
    active: true,
  },
  {
    title: 'Bachelor of Computer Applications',
    period: '2022 — 2025 | CGPA: 7.96',
    periodColor: 'text-slate-500',
    institution: null,
    description: 'Core computer science foundations — data structures, algorithms, DBMS, and networking.',
    dotColor: 'bg-slate-300 dark:bg-white/20',
    active: false,
  },
]

const certifications = [
  {
    title: 'Web Development',
    issuer: 'Great Learning',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
  },
  {
    title: 'Data Analysis',
    issuer: 'Microsoft',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'Figma UI/UX',
    issuer: 'Simplilearn',
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-500/10',
  },
  {
    title: 'AWS S3 Workshop',
    issuer: 'GLS University',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-500/10',
  },
  {
    title: 'CyberShadez Agentverse Workshop',
    issuer: 'GLS University',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
  },
]

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Education Timeline */}
        <div>
          <ScrollReveal>
            <p className="text-sm font-mono text-primary tracking-wide uppercase mb-2">Background</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Education</h2>
          </ScrollReveal>

          <div className="space-y-10 border-l-2 border-slate-200 dark:border-white/10 pl-8 relative">
            {educationItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150}>
                <div className="relative">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full ${item.dotColor} border-4 border-slate-50 dark:border-[#0a0a0a]`}
                  >
                    {item.active && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className={`${item.periodColor} font-mono text-sm mb-1`}>{item.period}</p>
                  {item.institution && (
                    <p className="text-slate-500 text-sm mb-2">{item.institution}</p>
                  )}
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <ScrollReveal>
            <p className="text-sm font-mono text-primary tracking-wide uppercase mb-2">Recognition</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Certifications</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 100}>
                <div className="p-5 rounded-xl glass-card flex items-center gap-4 card-hover">
                  <div className={`p-3 rounded-xl ${cert.iconBg}`}>
                    <Award className={`${cert.iconColor} w-5 h-5`} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{cert.title}</p>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
