// /src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { getPageWithACF } from '../api/wp';
import PageBuilder from '../components/PageBuilder';
import Seo from '../components/Seo';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageWithACF('home').then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Seo yoast={data.yoast} />
      <PageBuilder blocks={data.acf?.page_builder} />
    </div>
  );
}
