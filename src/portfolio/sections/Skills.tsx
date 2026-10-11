import type { CSSProperties, SyntheticEvent } from 'react'

function handleIconLoad(event: SyntheticEvent<HTMLImageElement>) {
  const fallback = event.currentTarget.nextElementSibling as HTMLElement | null
  if (fallback) fallback.style.visibility = 'hidden'
}

function handleIconError(event: SyntheticEvent<HTMLImageElement>) {
  // Retain the readable text fallback if a third-party logo is unavailable.
  event.currentTarget.hidden = true
}

export function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="heading reveal">
          <p className="kicker">
            {"03 / Technical skills"}
          </p>
          <h2 className="title">
            {"Tech I work with."}
          </h2>
          <p className="lead">
            {"The languages, frameworks and platforms I've used to ship real products, from the front end to the cloud and AI."}
          </p>
        </div>
        <div className="skill-grid">
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"Languages"}
              </h3>
              <span className="skill-count">
                {"06"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/f08c238fc842.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"J"}
                  </span>
                </span>
                <span>
                  {"Java"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"C#"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/3a7c9b7e3a2f.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"P"}
                  </span>
                </span>
                <span>
                  {"Python"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"T"}
                  </span>
                </span>
                <span>
                  {"TypeScript"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/4bfc384af309.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"J"}
                  </span>
                </span>
                <span>
                  {"JavaScript"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"S"}
                  </span>
                </span>
                <span>
                  {"SQL"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"Frontend & UI"}
              </h3>
              <span className="skill-count">
                {"08"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/ecb2e5c7b954.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"R"}
                  </span>
                </span>
                <span>
                  {"React"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/2d0e91f108df.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"A"}
                  </span>
                </span>
                <span>
                  {"Angular"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/e30073bba164.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"H"}
                  </span>
                </span>
                <span>
                  {"HTML5"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/721faa996961.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"CSS3"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"J"}
                  </span>
                </span>
                <span>
                  {"jQuery"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"D"}
                  </span>
                </span>
                <span>
                  {"D3.js"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"H"}
                  </span>
                </span>
                <span>
                  {"Highcharts"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"RD"}
                  </span>
                </span>
                <span>
                  {"Responsive Design"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"Backend & Frameworks"}
              </h3>
              <span className="skill-count">
                {"09"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"SB"}
                  </span>
                </span>
                <span>
                  {"Spring Boot"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"SF"}
                  </span>
                </span>
                <span>
                  {"Spring Framework"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"AC"}
                  </span>
                </span>
                <span>
                  {"ASP.NET Core"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"AM"}
                  </span>
                </span>
                <span>
                  {"ASP.NET MVC"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/c59a5c629aa3.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"N"}
                  </span>
                </span>
                <span>
                  {"Node.js"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"E"}
                  </span>
                </span>
                <span>
                  {"Express"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"F"}
                  </span>
                </span>
                <span>
                  {"FastAPI"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"DJ"}
                  </span>
                </span>
                <span>
                  {"Django"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"RA"}
                  </span>
                </span>
                <span>
                  {"REST APIs"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"Distributed Systems"}
              </h3>
              <span className="skill-count">
                {"08"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"M"}
                  </span>
                </span>
                <span>
                  {"Microservices"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"ES"}
                  </span>
                </span>
                <span>
                  {"Event-Driven Systems"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"K"}
                  </span>
                </span>
                <span>
                  {"Kafka"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"R"}
                  </span>
                </span>
                <span>
                  {"RabbitMQ"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AP"}
                  </span>
                </span>
                <span>
                  {"Async Processing"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"HA"}
                  </span>
                </span>
                <span>
                  {"High-Volume APIs"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"SD"}
                  </span>
                </span>
                <span>
                  {"System Design"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"RS"}
                  </span>
                </span>
                <span>
                  {"Real-Time Systems"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"Databases"}
              </h3>
              <span className="skill-count">
                {"08"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"P"}
                  </span>
                </span>
                <span>
                  {"PostgreSQL"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"D"}
                  </span>
                </span>
                <span>
                  {"DynamoDB"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"M"}
                  </span>
                </span>
                <span>
                  {"MySQL"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"SS"}
                  </span>
                </span>
                <span>
                  {"SQL Server"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"M"}
                  </span>
                </span>
                <span>
                  {"MongoDB"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"R"}
                  </span>
                </span>
                <span>
                  {"Redis"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"E"}
                  </span>
                </span>
                <span>
                  {"Elasticsearch"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"S"}
                  </span>
                </span>
                <span>
                  {"SQL/NoSQL"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"AWS & Cloud"}
              </h3>
              <span className="skill-count">
                {"15"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/dc5075aa2e7c.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"A"}
                  </span>
                </span>
                <span>
                  {"AWS"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AL"}
                  </span>
                </span>
                <span>
                  {"AWS Lambda"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AG"}
                  </span>
                </span>
                <span>
                  {"API Gateway"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AS"}
                  </span>
                </span>
                <span>
                  {"Amazon S3"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AE"}
                  </span>
                </span>
                <span>
                  {"Amazon EC2"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AR"}
                  </span>
                </span>
                <span>
                  {"Amazon RDS"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AS"}
                  </span>
                </span>
                <span>
                  {"Amazon SQS"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AS"}
                  </span>
                </span>
                <span>
                  {"Amazon SNS"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"SF"}
                  </span>
                </span>
                <span>
                  {"Step Functions"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"CloudWatch"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"CloudFormation"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AC"}
                  </span>
                </span>
                <span>
                  {"AWS CDK"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AK"}
                  </span>
                </span>
                <span>
                  {"AWS KMS"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AG"}
                  </span>
                </span>
                <span>
                  {"AWS Glue"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AA"}
                  </span>
                </span>
                <span>
                  {"Amazon Athena"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"Data & Analytics"}
              </h3>
              <span className="skill-count">
                {"07"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"E"}
                  </span>
                </span>
                <span>
                  {"ETL"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"DW"}
                  </span>
                </span>
                <span>
                  {"Data Warehousing"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"PB"}
                  </span>
                </span>
                <span>
                  {"Power BI"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"A"}
                  </span>
                </span>
                <span>
                  {"Athena"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"G"}
                  </span>
                </span>
                <span>
                  {"Glue"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AP"}
                  </span>
                </span>
                <span>
                  {"Analytics Platforms"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"DP"}
                  </span>
                </span>
                <span>
                  {"Data Pipelines"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"AI & Agentic Systems"}
              </h3>
              <span className="skill-count">
                {"09"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AB"}
                  </span>
                </span>
                <span>
                  {"Amazon Bedrock"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"L"}
                  </span>
                </span>
                <span>
                  {"LangGraph"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"M"}
                  </span>
                </span>
                <span>
                  {"MCP"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"R"}
                  </span>
                </span>
                <span>
                  {"RAG"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"MS"}
                  </span>
                </span>
                <span>
                  {"Multi-Agent Systems"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AO"}
                  </span>
                </span>
                <span>
                  {"Agent Orchestration"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AK"}
                  </span>
                </span>
                <span>
                  {"Amazon Kendra"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"Claude"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"LI"}
                  </span>
                </span>
                <span>
                  {"LLM Integration"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"DevOps & Delivery"}
              </h3>
              <span className="skill-count">
                {"09"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/e50077bc6b79.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"D"}
                  </span>
                </span>
                <span>
                  {"Docker"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"K"}
                  </span>
                </span>
                <span>
                  {"Kubernetes"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"T"}
                  </span>
                </span>
                <span>
                  {"Terraform"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/968ac3ee6acc.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"J"}
                  </span>
                </span>
                <span>
                  {"Jenkins"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/cc4456453d07.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"GC"}
                  </span>
                </span>
                <span>
                  {"GitLab CI/CD"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="/technology-icons/6940f1eba95f.svg" alt="" onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"G"}
                  </span>
                </span>
                <span>
                  {"Git"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"M"}
                  </span>
                </span>
                <span>
                  {"Maven"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#e89978"} as CSSProperties}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg" alt="" loading="lazy" onError={handleIconError} onLoad={handleIconLoad} />
                  <span className="tech-fallback" aria-hidden="true">
                    {"G"}
                  </span>
                </span>
                <span>
                  {"Gradle"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"CI/CD"}
                </span>
              </span>
            </div>
          </div>
          <div className="skill-group reveal">
            <div className="skill-group-heading">
              <span className="skill-dot"></span>
              <h3>
                {"AI Developer Tools"}
              </h3>
              <span className="skill-count">
                {"04"}
              </span>
            </div>
            <div className="tech-list">
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"Cursor"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"C"}
                  </span>
                </span>
                <span>
                  {"Cline"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"K"}
                  </span>
                </span>
                <span>
                  {"Kiro"}
                </span>
              </span>
              <span className="tech">
                <span className="tech-icon" style={{"--ico": "#8caef0"} as CSSProperties}>
                  <span className="tech-fallback" aria-hidden="true">
                    {"AQ"}
                  </span>
                </span>
                <span>
                  {"Amazon Q CLI"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
