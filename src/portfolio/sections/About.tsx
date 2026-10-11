export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="reveal">
          <p className="kicker">
            {"01 / About me"}
          </p>
          <h2 className="title">
            {"From APIs to interfaces, "}
            <span className="accent">
              {"built to scale."}
            </span>
          </h2>
          <p className="paragraph">
            {"I'm a full-stack engineer with 11+ years of experience building production software at Amazon, Tesla, Intel, Western Digital, and Infosys. I work across frontend, backend, cloud, and data to turn complex problems into products people can use."}
          </p>
          <p className="paragraph">
            {"At Amazon, I build partner experiences used at scale, improve product performance, and lead engineering delivery. Earlier, I worked on employee applications at Tesla, compiler tools at Intel, analytics platforms at Western Digital, and public-service interfaces at Infosys."}
          </p>
          <p className="paragraph">
            {"I enjoy leading practical engineering work: setting direction, solving difficult performance problems, and shipping software that makes a measurable difference."}
          </p>
        </div>
        <aside className="about-side reveal" aria-label="Career highlights">
          <div className="metric">
            <span className="metric-number">
              {"11+"}
            </span>
            <span className="metric-label">
              {"Years building and shipping production software"}
            </span>
          </div>
          <div className="metric">
            <span className="metric-number">
              {"57%"}
            </span>
            <span className="metric-label">
              {"Faster page loads for AWS partner experiences"}
            </span>
          </div>
          <div className="metric">
            <span className="metric-number">
              {"~$2.5B"}
            </span>
            <span className="metric-label">
              {"Estimated program value associated with strategic AWS initiatives"}
            </span>
          </div>
          <div className="callout">
            <strong>
              {"Leadership:"}
            </strong>
            {" Led engineering teams of 5–10 people at Amazon, Tesla, and Western Digital."}
          </div>
        </aside>
      </div>
    </section>
  )
}
