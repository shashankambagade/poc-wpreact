import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '../api/wp';
import axios from 'axios';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [fetchedPost] = await getPostBySlug(slug); // WP returns an array
        let thumbnail = null;

        if (fetchedPost.featured_media) {
          try {
            const mediaRes = await axios.get(
              `https://gomowebb.com/headless-poc/wp-json/wp/v2/media/${fetchedPost.featured_media}`
            );
            thumbnail = mediaRes.data.source_url;
          } catch {
            // leave thumbnail null
          }
        }

        setPost({ ...fetchedPost, thumbnail });
      } catch (err) {
        console.error('Error loading post:', err);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return <div className="p-8 text-center">Loading…</div>;
  }

  return (
    <article className="max-w-3xl mx-auto p-4">
      <Helmet>
        <title>{post.title.rendered}</title>
        <meta name="description" content={post.excerpt?.rendered.replace(/<[^>]+>/g, '')} />
      </Helmet>

      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title.rendered}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {post.title.rendered}
      </h1>

      <div
        className="prose prose-lg dark:prose-dark max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <Link
        to="/posts"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
      >
        ← Back to all posts
      </Link>
    </article>
  );
};

export default SinglePost;  