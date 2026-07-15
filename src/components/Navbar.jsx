import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, FileDown } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [activeSection, setActiveSection] = useState('')

  // Track scroll for navbar background opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-slate-200/80 dark:border-white/10 glass'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-bold text-xl tracking-tighter hover:text-primary transition-colors"
          >
            RAJ <span className="text-primary">PITHAVA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === link.href
                    ? 'text-primary'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}

            {/* Resume Download */}
            <a
              href="/Rj_Resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Resume
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors ${menuOpen ? 'hamburger-open' : ''}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-[#0a0a0a] border-l border-slate-200 dark:border-white/10 p-8 pt-20 mobile-menu md:hidden ${
          menuOpen ? 'open' : ''
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-lg font-semibold transition-colors ${
                activeSection === link.href
                  ? 'text-primary'
                  : 'text-slate-700 dark:text-slate-200 hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-slate-200 dark:border-white/10" />
          <a
            href="/Rj_Resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-full text-sm font-semibold hover:opacity-80 transition-colors justify-center"
          >
            <FileDown className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </>
  )
}
