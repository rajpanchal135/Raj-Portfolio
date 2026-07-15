import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import RajAIChatbot from './components/RajAIChatbot'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  // Sync the `dark` class on <html> for Tailwind dark mode
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="bg-slate-50 dark:bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200 dark:from-slate-900 dark:via-[#0a0a0a] dark:to-black text-slate-900 dark:text-slate-100 font-sans antialiased min-h-screen transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <RajAIChatbot />
    </div>
  )
}
