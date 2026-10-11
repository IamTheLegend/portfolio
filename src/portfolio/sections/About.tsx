export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="reveal">
          <p className="kicker">
            {"01 / About me"}
          </p>
          <h2 className="title">
            {"Engineer by craft, "}
            <span className="accent">
              {"owner by habit."}
            </span>
          </h2>
          <p className="paragraph">
            {"I've spent 10+ years building and running production software at Amazon, Tesla, Intel, Western Digital and Infosys. I'm at home anywhere in the stack, from React front ends and Java or .NET services to AWS infrastructure and data pipelines. I like owning a system from the first design doc all the way through launch and on-call."}
          </p>
          <p className="paragraph">
            {"Today I lead a 10-engineer team on AWS Partner Central, where 180K+ AWS partners manage how they sell with AWS. Before that, I led the team behind Tesla's HR software, automated compiler bug-hunting at Intel, built self-service analytics at Western Digital, and started out on the front end of India's GST tax portal."}
          </p>
          <p className="paragraph">
            {"Teams usually bring me in to make slow things fast, make fragile systems reliable, and help people ship. Recently I co-designed an agentic AI approach to engineering that cut one project's estimate from ~205 to ~120 engineer-weeks and helped bring AI adoption to 98% across ~450 engineers."}
          </p>
        </div>
        <aside className="about-side reveal" aria-label="Career highlights">
          <div className="metric">
            <span className="metric-number">
              {"10+"}
            </span>
            <span className="metric-label">
              {"Years building and running production software"}
            </span>
          </div>
          <div className="metric">
            <span className="metric-number">
              {"57%"}
            </span>
            <span className="metric-label">
              {"Faster load times for the AWS partner console my team builds"}
            </span>
          </div>
          <div className="metric">
            <span className="metric-number">
              {"180K+"}
            </span>
            <span className="metric-label">
              {"AWS partners use the platform I lead engineering on"}
            </span>
          </div>
          <div className="callout">
            <strong>
              {"Beyond the code:"}
            </strong>
            {" Led teams of 5–10 engineers at Amazon, Tesla and Western Digital. Won Amazon's GenAI Hackathon. M.S. in Computer and Information Science from FIU (3.97 GPA)."}
          </div>
        </aside>
      </div>
    </section>
  )
}
