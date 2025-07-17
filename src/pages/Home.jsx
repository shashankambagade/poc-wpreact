// /src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { getPageWithYoast } from '../api/wp';
import PageBuilder from '../components/PageBuilder';
import Seo from '../components/Seo';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageWithYoast('home').then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {/* now yoast data is populated */}
      <Seo yoast={data.yoast} />
      <PageBuilder blocks={data.acf?.page_builder} />
    </div>
  );
}
