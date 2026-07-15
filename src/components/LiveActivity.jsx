import { useState, useEffect } from 'react'
import { Terminal, Activity, GitCommit, GitPullRequest, GitBranch, Star, AlertCircle } from 'lucide-react'

export default function LiveActivity() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGitHubEvents = async () => {
      try {
        const response = await fetch('https://api.github.com/users/rajpanchal135/events/public?per_page=5')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setEvents(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(true)
        setLoading(false)
      }
    }

    fetchGitHubEvents()
    // Poll every 60 seconds
    const interval = setInterval(fetchGitHubEvents, 60000)
    return () => clearInterval(interval)
  }, [])

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)
    
    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"
    return Math.floor(seconds) + " seconds ago"
  }

  const formatEvent = (event) => {
    const repoName = event.repo.name.split('/')[1] || event.repo.name
    
    switch(event.type) {
      case 'PushEvent':
        return {
          icon: <GitCommit className="w-4 h-4 text-green-400" />,
          text: `Pushed ${event.payload.commits?.length || 1} commit(s) to ${repoName}`,
          color: 'text-green-400'
        }
      case 'PullRequestEvent':
        return {
          icon: <GitPullRequest className="w-4 h-4 text-purple-400" />,
          text: `${event.payload.action === 'opened' ? 'Opened' : 'Merged'} PR in ${repoName}`,
          color: 'text-purple-400'
        }
      case 'CreateEvent':
        return {
          icon: <GitBranch className="w-4 h-4 text-blue-400" />,
          text: `Created ${event.payload.ref_type} in ${repoName}`,
          color: 'text-blue-400'
        }
      case 'WatchEvent':
        return {
          icon: <Star className="w-4 h-4 text-yellow-400" />,
          text: `Starred ${repoName}`,
          color: 'text-yellow-400'
        }
      default:
        return {
          icon: <Activity className="w-4 h-4 text-slate-400" />,
          text: `Activity in ${repoName}`,
          color: 'text-slate-400'
        }
    }
  }

  return (
    <section className="py-24 px-6 bg-slate-100/50 dark:bg-[#0e0e0e]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Terminal className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">Live_Systems</h2>
        </div>
        
        <div className="bg-[#0a0a0a] rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden font-mono text-sm relative group">
          {/* Mac-style Window Header */}
          <div className="bg-slate-800/40 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
              <span>Connection: ESTABLISHED (wss://api.github.com)</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 text-slate-300 min-h-[250px]">
            <div className="mb-6 text-primary opacity-90">
              $ connect --host api.github.com --user rajpanchal135
              <br/>
              <span className="text-slate-400">&gt; Fetching real-time telemetry...</span>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 animate-pulse">
                <span>[system]</span> Loading event stream... <span className="animate-bounce font-bold text-primary">_</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>[error] Failed to establish secure connection to GitHub.</span>
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-4">
                {events.length > 0 ? events.map((event, i) => {
                  const details = formatEvent(event)
                  return (
                    <div 
                      key={event.id} 
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-white/5 p-2 -mx-2 rounded transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 w-24 shrink-0 font-semibold tracking-wider">
                          [{getTimeAgo(event.created_at)}]
                        </span>
                        {details.icon}
                        <span className={`${details.color} font-medium`}>{details.text}</span>
                      </div>
                    </div>
                  )
                }) : (
                   <div className="text-slate-400">No recent public activity found.</div>
                )}
                
                {/* Blinking Cursor at the end */}
                <div className="mt-6 flex items-center gap-1 text-slate-400 pt-4 border-t border-slate-800">
                  <span className="text-green-400">raj@sys:~$</span>
                  <span className="w-2.5 h-4 bg-slate-400 animate-pulse ml-1 inline-block"></span>
                </div>
              </div>
            )}
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"></div>
        </div>
      </div>
    </section>
  )
}
