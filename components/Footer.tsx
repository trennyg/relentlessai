'use client'

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="px-6 py-8"
      style={{ backgroundColor: '#080808' }}
    >
      {/* System status line */}
      <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: 12, marginBottom: 24, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#2A2A2A', letterSpacing: '0.08em' }}>
        SYS: ALL SYSTEMS OPERATIONAL · UPTIME: 99.9% · BUILD: PRODUCTION
      </div>
      <div style={{ borderTop: '1px solid #222', paddingTop: 24 }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: wordmark + copyright */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <span
            className="text-lg"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
          >
            <span style={{ color: '#F0EDE6' }}>RELENTLESS </span>
            <span style={{ color: '#D4F044' }}>AIS</span>
          </span>
          <p
            className="text-xs"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              color: '#888480',
            }}
          >
            © 2025 Relentless AIS. All Rights Reserved.
          </p>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: '#888480', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4F044')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888480')}
          >
            <LinkedinIcon />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: '#888480', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4F044')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888480')}
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
      </div>
    </footer>
  )
}
