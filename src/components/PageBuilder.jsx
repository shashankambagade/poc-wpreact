// /src/components/PageBuilder.jsx
import HeroSection from './sections/HeroSection';
import ContentBlock from './sections/ContentBlock';
import WhyChoose from './sections/WhyChoose';
// Add additional modules as needed

export default function PageBuilder({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const layout = block.acf_fc_layout;

        switch (layout) {
          case 'hero_section':
            return <HeroSection key={index} data={block} />;

          case 'after_hero_section':
            return <ContentBlock key={index} data={block} />;

          case 'why_choose':
            return <WhyChoose key={index} data={block} />;

          // Add more cases as you build modules
          default:
            console.warn(`⚠️ Unhandled layout: ${layout}`);
            return null;
        }
      })}
    </>
  );
}

// /src/components/PageBuilder.jsx
import HeroSection from './sections/HeroSection';
import ContentBlock from './sections/ContentBlock';
import WhyChoose from './sections/WhyChoose';
// Add additional modules as needed

export default function PageBuilder({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const layout = block.acf_fc_layout;

        switch (layout) {
          case 'hero_section':
            return <HeroSection key={index} data={block} />;

          case 'after_hero_section':
            return <ContentBlock key={index} data={block} />;

          case 'why_choose':
            return <WhyChoose key={index} data={block} />;

          // Add more cases as you build modules
          default:
            console.warn(`⚠️ Unhandled layout: ${layout}`);
            return null;
        }
      })}
    </>
  );
}