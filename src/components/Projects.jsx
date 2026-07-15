import { useRef, useState, useEffect } from 'react'
import { CheckCircle2, Github, ExternalLink } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const projects = [
  {
    title: 'SphereVision Lab System',
    techLabel: 'TCP/IP • Python',
    techColor: 'text-primary',
    gradientFrom: 'from-blue-500/20',
    checkColor: 'text-primary',
    description:
      'A cross-platform distributed client-host system designed for automated laboratory management. Features real-time command broadcasting and kiosk-mode restrictions.',
    features: [
      'Secure Auth via PBKDF2 hashing',
      'Real-time file sync with background workers',
      'Multi-client command broadcasting',
      'Kiosk-mode for secure lab environments',
    ],
    tags: ['System Architecture', 'Networking'],
    github: 'https://github.com/rajpanchal135',
    demo: null,
  },
  {
    title: 'AI Desktop Assistant',
    techLabel: 'OpenAI API • SQLite',
    techColor: 'text-[#8A2BE2]',
    gradientFrom: 'from-[#8A2BE2]/30',
    checkColor: 'text-[#8A2BE2]',
    description:
      "Voice-enabled assistant for task automation. Integrates OpenAI's LLMs for intelligent system-level responses and data fetching.",
    features: [
      'Speech-to-Text Command Execution',
      'Intelligent system task automation',
      'Context-aware conversation memory',
      'Plugin-based extensibility',
    ],
    tags: ['AI/ML', 'Automation'],
    github: 'https://github.com/rajpanchal135',
    demo: null,
  },
]

export default function Projects() {
  const targetRef = useRef(null)
  const trackRef = useRef(null)
  const [xOffset, setXOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current || !trackRef.current) return
      const { top, height } = targetRef.current.getBoundingClientRect()
      
      const scrollY = -top
      const maxScroll = height - window.innerHeight
      
      let progress = scrollY / maxScroll
      progress = Math.max(0, Math.min(progress, 1))
      
      const trackWidth = trackRef.current.scrollWidth
      const windowWidth = window.innerWidth
      
      // Only scroll horizontally if track is wider than window
      if (trackWidth > windowWidth) {
        const paddingOffset = windowWidth > 768 ? 96 : 48 // Extra scroll padding at the end
        const maxTranslate = trackWidth - windowWidth + paddingOffset
        setXOffset(progress * maxTranslate)
      } else {
        setXOffset(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section id="projects" ref={targetRef} className="h-[250vh] relative bg-slate-100/50 dark:bg-transparent">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-16">
        {/* Background decoration for glass effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/5 to-transparent dark:via-blue-500/10 pointer-events-none"></div>
        
        {/* Header */}
        <div className="max-w-6xl mx-auto w-full px-6 relative z-10 mb-8 md:mb-12 shrink-0">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary tracking-wide uppercase mb-2">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Systems</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">
              Deep dives into distributed architecture and automation. Scroll down to explore.
            </p>
          </ScrollReveal>
        </div>

        {/* Horizontal Track */}
        <div className="w-full overflow-visible relative z-10">
          <div 
            ref={trackRef}
            className="flex gap-8 px-6 md:px-12 w-max will-change-transform"
            style={{ 
              transform: `translate3d(-${xOffset}px, 0, 0)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`group relative p-[2px] rounded-3xl bg-gradient-to-br ${project.gradientFrom} to-transparent w-[85vw] md:w-[600px] shrink-0`}
              >
                <div className="glass-card p-8 rounded-3xl h-full flex flex-col bg-white/70 dark:bg-white/5">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className={`text-xs font-mono ${project.techColor} shrink-0 ml-4`}>
                      {project.techLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className={`w-4 h-4 ${project.checkColor} mt-0.5 shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Footer: Tags + Links */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 text-[10px] uppercase font-bold tracking-widest text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-primary"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-primary"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
