// /src/pages/Page.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageWithACF } from '../api/wp';
import PageBuilder from '../components/PageBuilder';
import Seo from '../components/Seo';

export default function Page() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageWithACF(slug).then(res => {
      if (res && res.length > 0) {
        setData(res[0]);
      } else {
        setData(false); // not found
      }
    });
  }, [slug]);

  if (data === false) return <div>Page not found</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Seo yoast={data.yoast} />
      <PageBuilder blocks={data.acf?.page_builder} />
    </div>
  );
}
