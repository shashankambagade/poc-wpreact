// pages/Home.jsx
import { useEffect, useState } from 'react';
import { getPageWithACF } from '../api/wp';
import { getPageWithYoast } from '../api/wp';
import HeroSection from '../components/sections/HeroSection';
import WhyChoose from '../components/sections/WhyChoose';
import ContentBlock from '../components/sections/ContentBlock';
import Seo from '../components/Seo';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageWithACF('home').then(setData);
  }, []);

  useEffect(() => {
    getPageWithYoast('home').then(setData);
  }, []);


  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Seo yoast={data.yoast} />
  
      {data.acf?.hero_section?.map((block, index) => {
        switch (block.acf_fc_layout) {
          case 'hero_section':
            return <HeroSection key={index} data={block} />;
          case 'after_hero_section':
            return <ContentBlock key={index} data={block} />;
          case 'why_choose':
            return <WhyChoose key={index} data={block} />;
          default:
            return null;
        } 
      })}
    </div>
  );
}
