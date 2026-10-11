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
            {"At AWS I lead projects on Partner Central, where 180K+ partners manage how they sell with AWS, in a program representing ~$5B in business value. Before that, I led a team of five on Tesla's HR software, automated compiler bug-hunting at Intel, led a team of eight on self-service analytics at Western Digital, and began as a UI engineer on India's GST tax platform."}
          </p>
          <p className="paragraph">
            {"Teams usually bring me in to make slow things fast, make fragile systems reliable, and help people ship. Recently I co-designed an agentic AI approach to engineering that cut one project's estimate by about 40% and helped bring AI adoption to 98% across ~450 engineers."}
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
              {"~$5B"}
            </span>
            <span className="metric-label">
              {"Business value of the AWS partner program my projects support"}
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
            {" Led teams of 5 to 8 engineers across projects at Amazon, Tesla and Western Digital, plus a 10-engineer project at AWS. Won Amazon's GenAI Hackathon and Tesla's Lead with Purpose Award. M.S. in Computer and Information Science, FIU."}
          </div>
        </aside>
      </div>
    </section>
  )
}
