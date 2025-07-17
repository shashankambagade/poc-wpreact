// /src/pages/Page.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// use the correct path, and pull in the Yoast‐aware fetcher if you need SEO
import { getPageWithYoast } from '../api/wp';
import PageBuilder from '../components/PageBuilder';
import Seo from '../components/Seo';

export default function Page() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getPageWithYoast(slug)
      .then(page => {
        // getPageWithYoast returns an object with an id if found
        if (page && page.id) {
          setData(page);
        } else {
          setData(false);
        }
      })
      .catch(() => setData(false));
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
