import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../api/wp'; // make sure this returns an array of posts
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postList = await getAllPosts();

        const postsWithImages = await Promise.all(
          postList.map(async (post) => {
            if (post.featured_media) {
              try {
                const mediaRes = await axios.get(
                  `https://gomowebb.com/headless-poc/wp-json/wp/v2/media/${post.featured_media}`
                );
                return { ...post, thumbnail: mediaRes.data.source_url };
              } catch {
                return { ...post, thumbnail: null };
              }
            }
            return { ...post, thumbnail: null };
          })
        );

        setPosts(postsWithImages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/post/${post.slug}`}>
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={post.thumbnail ?? '/placeholder.jpg'}
                alt={post.title.rendered}
              />
            </Link>
            <div className="p-5">
              <Link to={`/post/${post.slug}`}>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title.rendered}
                </h2>
              </Link>
              <div
                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
              />
              <Link
                to={`/post/${post.slug}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
