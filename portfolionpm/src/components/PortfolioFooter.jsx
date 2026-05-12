const links = [
  { label: 'Home', href: '#home' },
  { label: 'Stats', href: '#stats' },
  { label: 'Skills', href: '#skills-universe' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/Zeel555' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zeel-sadariya-1634b4283/' },
  { label: 'Email', href: 'mailto:zeelsadariya@gmail.com' },
]

function PortfolioFooter() {
  return (
    <footer className="relative isolate border-t border-white/[0.08] bg-[#020817] px-4 py-10 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.15fr_0.85fr_0.85fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-3 font-display text-lg font-semibold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-400/45 bg-cyan-400/[0.08] text-sm text-cyan-100">
              JS
            </span>
            Jeel Sadariya
          </a>
          <p className="mt-4 max-w-md font-display text-sm leading-6 text-slate-500">
            Full stack developer and AI engineer building intelligent, realtime, production-minded web systems.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">Sitemap</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-sm text-slate-500 transition hover:text-cyan-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">Socials</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-2 font-display text-xs text-slate-400 transition hover:border-cyan-300/35 hover:text-cyan-100"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PortfolioFooter
