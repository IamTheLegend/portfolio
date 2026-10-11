export function Experience() {
  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="work-heading reveal">
          <div>
            <p className="kicker">
              {"02 / Experience"}
            </p>
            <h2 className="title">
              {"Where I've worked."}
            </h2>
          </div>
          <p className="lead">
            {"Five companies, one habit: take ownership, make it faster and cheaper, and leave it better than I found it."}
          </p>
        </div>
        <div className="timeline" id="timeline">
          <div className="timeline-progress" id="timeline-progress" aria-hidden="true"></div>
          <article className="career-entry reveal" id="experience-amazon">
            <div className="career-marker" aria-hidden="true">
              <span className="node"></span>
            </div>
            <div className="career-company">
              <p className="chapter-number">
                {"01 "}
                <span>
                  {"/ 05"}
                </span>
              </p>
              <span className="company-logo amazon-word">
                {"amazon"}
                <span className="smile"></span>
              </span>
              <p className="job-title">
                {"Software Development Engineer II"}
              </p>
              <p className="job-dates">
                {"Aug 2024 – Present"}
              </p>
            </div>
            <div className="career-copy">
              <p className="eyebrow small">
                {"AWS Partner Central · Full-stack · Technical leadership"}
              </p>
              <h3>
                {"Leading the platform 180K+ AWS partners use to sell with AWS"}
              </h3>
              <p className="career-description">
                {"I lead a team of 10 engineers on Partner Central 3.0, moving co-sell workflows into a React micro-frontend inside the AWS Console. The program it supports represents roughly $5B in business value, so speed and reliability really matter. I also built a privacy-preserving AWS Clean Rooms pilot that matched ~250K accounts for an initiative tied to ~$400M in estimated revenue."}
              </p>
              <div className="outcomes">
                <div className="outcome">
                  <strong>
                    {"57% faster"}
                  </strong>
                  <span>
                    {"Module load time cut from 4.2s to 1.8s with lazy loading and LCP tuning."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"No silent event loss"}
                  </strong>
                  <span>
                    {"Added dead-letter queues to 27 EventBridge targets on a platform handling ~873K events a day."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"98% AI adoption"}
                  </strong>
                  <span>
                    {"Co-designed an agentic engineering method used across ~450 engineers. It cut one plan from ~205 to ~120 engineer-weeks."}
                  </span>
                </div>
              </div>
              <div className="tag-list">
                <span className="tag">
                  {"React"}
                </span>
                <span className="tag">
                  {"TypeScript"}
                </span>
                <span className="tag">
                  {"AWS"}
                </span>
                <span className="tag">
                  {"EventBridge"}
                </span>
                <span className="tag">
                  {"Amazon Bedrock"}
                </span>
              </div>
            </div>
          </article>
          <article className="career-entry reveal" id="experience-tesla">
            <div className="career-marker" aria-hidden="true">
              <span className="node"></span>
            </div>
            <div className="career-company">
              <p className="chapter-number">
                {"02 "}
                <span>
                  {"/ 05"}
                </span>
              </p>
              <span className="company-logo tesla-word">
                {"TESLA"}
              </span>
              <p className="job-title">
                {"Senior Software Developer"}
              </p>
              <p className="job-dates">
                {"Feb 2023 – Jul 2024"}
              </p>
            </div>
            <div className="career-copy">
              <p className="eyebrow small">
                {"HR platforms · Performance · Team leadership"}
              </p>
              <h3>
                {"Building the HR system 300K+ Tesla employees rely on"}
              </h3>
              <p className="career-description">
                {"I led five engineers building the services behind Tesla's web-based HR operating system, including the training, recognition, profile and hiring tools used across a 300K+ person organization. Building them in-house replaced costly third-party software, and tuning them made everyday HR work noticeably faster."}
              </p>
              <div className="outcomes">
                <div className="outcome">
                  <strong>
                    {"$750K a year"}
                  </strong>
                  <span>
                    {"Saved by replacing third-party training, recognition and profile tools."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"75% faster"}
                  </strong>
                  <span>
                    {"Response time on the candidate application module, with peak error rates down 90%."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"3,000+ APIs"}
                  </strong>
                  <span>
                    {"Optimized across 5 applications, speeding up HR workflows by ~30%."}
                  </span>
                </div>
              </div>
              <div className="tag-list">
                <span className="tag">
                  {"Full-stack"}
                </span>
                <span className="tag">
                  {"APIs"}
                </span>
                <span className="tag">
                  {"SQL"}
                </span>
                <span className="tag">
                  {"Caching"}
                </span>
                <span className="tag">
                  {"Team leadership"}
                </span>
              </div>
            </div>
          </article>
          <article className="career-entry reveal" id="experience-intel">
            <div className="career-marker" aria-hidden="true">
              <span className="node"></span>
            </div>
            <div className="career-company">
              <p className="chapter-number">
                {"03 "}
                <span>
                  {"/ 05"}
                </span>
              </p>
              <span className="company-logo intel-word">
                {"intel"}
                <span className="intel-dot">
                  {"."}
                </span>
              </span>
              <p className="job-title">
                {"Graduate Compilers Intern"}
              </p>
              <p className="job-dates">
                {"May 2022 – Dec 2022"}
              </p>
            </div>
            <div className="career-copy">
              <p className="eyebrow small">
                {"Compiler tooling · Automation · Software quality"}
              </p>
              <h3>
                {"Teaching a tool to hunt compiler bugs"}
              </h3>
              <p className="career-description">
                {"As a graduate intern on Intel's compiler team, I built Eva, a tool that automates 10+ bug-hunting tasks engineers used to do by hand. It turned a half-day testing loop into a 45-minute one and surfaced dozens of real bugs along the way."}
              </p>
              <div className="outcomes">
                <div className="outcome">
                  <strong>
                    {"4h → 45m"}
                  </strong>
                  <span>
                    {"Compiler testing and bug discovery, automated end to end."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"70+ bugs"}
                  </strong>
                  <span>
                    {"Production compiler bugs found through automated testing."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"60% smaller logs"}
                  </strong>
                  <span>
                    {"Per-run logs cut from 25 MB to 10 MB, with every critical diagnostic kept."}
                  </span>
                </div>
              </div>
              <div className="tag-list">
                <span className="tag">
                  {"Python"}
                </span>
                <span className="tag">
                  {"Compilers"}
                </span>
                <span className="tag">
                  {"Test automation"}
                </span>
              </div>
            </div>
          </article>
          <article className="career-entry reveal" id="experience-western">
            <div className="career-marker" aria-hidden="true">
              <span className="node"></span>
            </div>
            <div className="career-company">
              <p className="chapter-number">
                {"04 "}
                <span>
                  {"/ 05"}
                </span>
              </p>
              <span className="company-logo wd-word">
                <span className="wd-glyph">
                  {"▰▰"}
                </span>
                {" Western Digital"}
              </span>
              <p className="job-title">
                {"Senior Software Development Engineer"}
              </p>
              <p className="job-dates">
                {"Aug 2017 – Jul 2021"}
              </p>
            </div>
            <div className="career-copy">
              <p className="eyebrow small">
                {"Analytics platforms · Data engineering · Leadership"}
              </p>
              <h3>
                {"Replacing expensive tools with analytics people actually used"}
              </h3>
              <p className="career-description">
                {"I led eight engineers building self-service BI and finance platforms that replaced proprietary tooling. Along the way I rebuilt a failing file-processing workflow on RabbitMQ, designed ~25 TB data warehouses, and built Angular libraries that other teams adopted."}
              </p>
              <div className="outcomes">
                <div className="outcome">
                  <strong>
                    {"$4M+ saved"}
                  </strong>
                  <span>
                    {"From self-service BI and finance platforms that replaced proprietary tools."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"90% fewer complaints"}
                  </strong>
                  <span>
                    {"After rebuilding a failing file-processing workflow on RabbitMQ, saving $1.5M+ over two years."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"60% faster builds"}
                  </strong>
                  <span>
                    {"Reusable Angular libraries cut development time 60%, code size 35% and load time 40%."}
                  </span>
                </div>
              </div>
              <div className="tag-list">
                <span className="tag">
                  {"Angular"}
                </span>
                <span className="tag">
                  {"RabbitMQ"}
                </span>
                <span className="tag">
                  {"Data warehousing"}
                </span>
                <span className="tag">
                  {"Power BI"}
                </span>
                <span className="tag">
                  {"Leadership"}
                </span>
              </div>
            </div>
          </article>
          <article className="career-entry reveal" id="experience-infosys">
            <div className="career-marker" aria-hidden="true">
              <span className="node"></span>
            </div>
            <div className="career-company">
              <p className="chapter-number">
                {"05 "}
                <span>
                  {"/ 05"}
                </span>
              </p>
              <span className="company-logo infosys-word">
                {"Infosys"}
                <span className="infosys-mark">
                  {"↗"}
                </span>
              </span>
              <p className="job-title">
                {"Systems Engineer"}
              </p>
              <p className="job-dates">
                {"Dec 2015 – Aug 2017"}
              </p>
            </div>
            <div className="career-copy">
              <p className="eyebrow small">
                {"National tax platform · UI engineering"}
              </p>
              <h3>
                {"Building the front end of India's GST tax portal"}
              </h3>
              <p className="career-description">
                {"I started my career as a core UI engineer on India's Goods and Services Tax application, which supports 300M+ users. That meant building pages that worked for very different people, on every kind of device, under real deadline pressure."}
              </p>
              <div className="outcomes">
                <div className="outcome">
                  <strong>
                    {"300M+ users"}
                  </strong>
                  <span>
                    {"Supported by the GST application I helped build."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"80+ pages"}
                  </strong>
                  <span>
                    {"Responsive, role-based pages that work at every screen size."}
                  </span>
                </div>
                <div className="outcome">
                  <strong>
                    {"Green Horn Award"}
                  </strong>
                  <span>
                    {"Recognized for dependable work on critical, tight-deadline projects."}
                  </span>
                </div>
              </div>
              <div className="tag-list">
                <span className="tag">
                  {"Frontend engineering"}
                </span>
                <span className="tag">
                  {"Responsive UI"}
                </span>
                <span className="tag">
                  {"JavaScript"}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
