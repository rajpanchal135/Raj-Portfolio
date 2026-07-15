import { useEffect, useRef, useState } from 'react'
import { Code2, Server, Network, Layout } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const skillGroups = [
  {
    icon: Layout,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-500/10',
    title: 'Frontend',
    skills: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'React', level: 80 },
      { name: 'JavaScript', level: 75 },
    ],
  },
  {
    icon: Server,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
    title: 'Backend & DB',
    skills: [
      { name: 'FastAPI', level: 85 },
      { name: 'Django', level: 70 },
      { name: 'MongoDB', level: 70 },
      { name: 'SQLite', level: 75 },
    ],
  },
  {
    icon: Code2,
    iconColor: 'text-primary',
    iconBg: 'bg-blue-500/10',
    title: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'C/C++', level: 65 },
      { name: 'TypeScript', level: 70 },
    ],
  },
  {
    icon: Network,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    title: 'Distributed Systems',
    skills: [
      { name: 'TCP/IP', level: 90 },
      { name: 'WebSockets', level: 80 },
      { name: 'WebRTC', level: 60 },
      { name: 'AWS S3', level: 55 },
    ],
  },
]

function SkillBar({ name, level }) {
  const barRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={barRef} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-slate-400 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
          style={{ width: animated ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm font-mono text-primary tracking-wide uppercase mb-2">What I Work With</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Technical Arsenal</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-14 max-w-xl">
            Technologies and frameworks I use to build reliable, high-performance software.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => {
            const Icon = group.icon
            return (
              <ScrollReveal key={group.title} delay={i * 100}>
                <div className="p-6 rounded-2xl glass-card space-y-5 card-hover h-full">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${group.iconBg}`}>
                      <Icon className={`${group.iconColor} w-6 h-6`} />
                    </div>
                    <h3 className="font-bold text-xl">{group.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
