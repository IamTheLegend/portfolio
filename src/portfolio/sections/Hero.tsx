export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-spot"></div>
      <div className="container">
        <div className="status">
          <span className="status-dot"></span>
          {"Open to senior and lead engineering roles"}
        </div>
        <h1>
          {"Hi, I'm Prasanth."}
          <span className="second">
            {"Senior Full-Stack Engineer."}
          </span>
        </h1>
        <p className="intro">
          {"For 10+ years I've built software at real scale: the AWS platform 180K+ partners use to sell, the HR system behind Tesla's 300K+ employees, and front-end work on India's GST platform for 300M+ users. Today I lead projects in an AWS partner program representing ~$5B in business value, and I put agentic AI to work on Amazon Bedrock."}
        </p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            {"Explore my experience "}
            <span className="arrow">
              {"↓"}
            </span>
          </a>
          <a href="/Prasanth_Annam_Resume.pdf" download="Prasanth_Annam_Resume.pdf" className="btn">
            {"Download résumé "}
            <span className="arrow">
              {"↓"}
            </span>
          </a>
          <a href="https://www.linkedin.com/in/prasanth-annam/" className="btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            {"in "}
            <span className="arrow">
              {"↗"}
            </span>
          </a>
        </div>
        <div className="company-line">
          <div className="company-caption">
            {"Experience across"}
          </div>
          <div className="company-names" aria-label="Amazon, Tesla, Intel, Western Digital, Infosys">
            <span>
              {"amazon"}
            </span>
            <span className="tesla-word">
              {"TESLA"}
            </span>
            <span className="intel-word">
              {"intel."}
            </span>
            <span>
              {"Western Digital"}
            </span>
            <span>
              {"Infosys"}
            </span>
          </div>
        </div>
        <a href="#about" className="scroll-hint">
          {"Scroll to explore"}
        </a>
      </div>
    </section>
  )
}
