# Portfolio UX implementation

This folder implements the approved V12 portfolio design in the existing React/Vite application.

- `PortfolioPage.tsx` retains the five-section reading flow: Hero, About, Experience, Skills, and Contact.
- `sections/` contains the employer timeline and complete technology directory as React components.
- `portfolio.css` contains the visual tokens for the dark and light themes and responsive design.
- `interactions.js` draws the scroll-reactive canvas. The scenes correspond to the hero, About, Amazon, Tesla, Intel, Western Digital, Infosys, Skills, and Contact.
- The hero scene is rendered at **85% of its original opacity**, a 15% reduction. The career scenes keep their approved opacity.
- `public/technology-icons/` stores locally bundled icons from the approved preview. Other technology logos may still use external CDNs and fall back to readable text if offline.
- `public/Prasanth_Annam_Resume.pdf` is the resume linked by the site's download buttons.

## Validation

Run `npm ci`, `npm run build`, `npm run lint`, and `npm run test:portfolio` after installing dependencies. Animations respect `prefers-reduced-motion`. Review the business-value and reach figures for public disclosure before merging.
