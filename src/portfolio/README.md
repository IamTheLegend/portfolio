# Portfolio UX implementation

This folder implements the approved V12 portfolio design in the existing React/Vite application.

- `PortfolioPage.tsx` retains the five-section reading flow: Hero, About, Experience, Skills, and Contact.
- `sections/` contains the employer timeline and complete technology directory as React components.
- `portfolio.css` contains the visual tokens for the dark and light themes and responsive design.
- `interactions.js` draws the scroll-reactive background in two layers: a WebGL "silk" field (`#ambient-gl`, created at runtime, with a 2D fallback) and a particle canvas (`#ambient-canvas`). Each section has its own formation. The hero shows a rising horizon and About a spiral. Each employer shows the product built there: an Amazon partner sales pipeline, a Tesla HR org chart, an Intel compiler, a Western Digital analytics dashboard and an Infosys online tax form. Skills shows a turning globe and Contact a converging halo. Colours, light position and formation for each section are set in the `CHAPTERS` table.
- `public/technology-icons/` stores locally bundled icons from the approved preview. Other technology logos may still use external CDNs and fall back to readable text if offline.
- `public/Prasanth_Annam_Resume.pdf` is the resume linked by the site's download buttons.

## Validation

Run `npm ci`, `npm run build`, `npm run lint`, and `npm run test:portfolio` after installing dependencies. Animations respect `prefers-reduced-motion`. Review the business-value and reach figures for public disclosure before merging.
