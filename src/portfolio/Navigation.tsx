export function Navigation() {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Prasanth, home">
          {"Prasanth"}
          <i>
            {"."}
          </i>
        </a>
        <div className="nav-links">
          <a href="#about">
            {"About"}
          </a>
          <a href="#work">
            {"Experience"}
          </a>
          <a href="#skills">
            {"Skills"}
          </a>
          <a href="#contact">
            {"Contact"}
          </a>
        </div>
        <div className="nav-actions">
          <button className="icon-btn" id="theme-btn" aria-label="Switch to light mode" title="Toggle light/dark theme">
            <svg id="theme-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
          </button>
          <a className="nav-resume" href="/Prasanth_Annam_Resume.pdf" download="Prasanth_Annam_Resume.pdf">
            {"↓ Résumé"}
          </a>
          <button className="icon-btn menu-btn" aria-label="Open navigation" aria-expanded="false" id="menu-btn">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div className="mobile-menu" id="mobile-menu">
        <a href="#about">
          {"About"}
        </a>
        <a href="#work">
          {"Experience"}
        </a>
        <a href="#skills">
          {"Skills"}
        </a>
        <a href="#contact">
          {"Contact"}
        </a>
      </div>
    </header>
  )
}
