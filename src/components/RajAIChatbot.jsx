import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Sparkles } from 'lucide-react'

import { predictIntent } from '../utils/nlpEngine'

const INTENT_RESPONSES = {
  greetings: "Hello! I'm Raj-AI ✨ I'm a custom NLP model built from scratch to answer questions about Raj's experience, skills, and projects.",
  skills: "Raj's core stack includes Python, React, FastAPI, TCP/IP, and WebSockets. He excels in both frontend UI development and complex distributed backend systems.",
  projects: "Raj's top project is the SphereVision Lab Management System. It's a cross-platform distributed client-host system built with Python, SQLite, TCP/IP, and WebRTC.",
  education: "Raj is currently pursuing his M.Sc. IT in Full Stack Development at GLS University (expected 2027), after completing his BCA with a 7.96 CGPA.",
  contact: "You can reach Raj at pithavaraj4@gmail.com or connect with him on LinkedIn. He is currently open for internships and full-time roles!",
  whoami: "Raj Pithava is a Full Stack Developer specializing in real-time distributed applications, scalable backends, and AI integrations.",
  unknown: "Oh honey, I could calculate the mathematical mysteries of the universe using my TF-IDF vectors, but my creator specifically trained my neural net to only boast about his amazing Full Stack skills! Ask me about his projects instead! 💫"
}

const generateAIResponse = (input) => {
  const intent = predictIntent(input)
  return INTENT_RESPONSES[intent] || INTENT_RESPONSES.unknown
}

export default function RajAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm Raj-AI ✨ Ask me anything about Raj's skills, projects, or experience!" }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    // Add user message
    const userMsg = inputText.trim()
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking and response
    setTimeout(() => {
      // TODO: Replace with real OpenAI API call in the future
      const response = generateAIResponse(userMsg)
      setMessages(prev => [...prev, { sender: 'ai', text: response }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center ${isOpen ? 'scale-0 pointer-events-none' : 'scale-100'}`}
        aria-label="Open Chatbot"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[380px] h-[500px] max-h-[80vh] bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col z-[110] transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary bg-slate-200">
                <img src="/PSPHOTO.png" alt="Raj" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#111]"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm">Raj-AI</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ask me anything</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-[#0a0a0a]/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 dark:bg-slate-800' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-black rounded-tr-sm' : 'bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-white/10 border border-slate-200 dark:border-transparent p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] rounded-b-2xl">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about Raj..."
              className="flex-1 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-[#111] rounded-full px-4 py-2.5 text-sm outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-full bg-primary text-white hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
