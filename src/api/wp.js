import axios from 'axios';

const BASE_URL = 'https://gomowebb.com/headless-poc/wp-json/wp/v2';
const CF7_URL = 'https://gomowebb.com/headless-poc/wp-json/contact-form-7/v1/contact-forms/123/feedback';

//API to fetch Woocommerce Products
const WC_BASE_URL = 'https://gomowebb.com/headless-poc/wp-json/wc';
const WC_URL = 'https://gomowebb.com/headless-poc/wp-json/wc/v3';
const WC_AUTH = {
  username: 'ck_72711cd6713318569a8c2665226f74f34e75a95e', // Consumer Key
  password: 'cs_25775b7891ebb40e89eefdb996673246c0d2a320'  // Consumer Secret
};

// Generic fetcher for simple GET requests
const getResource = (endpoint, params = {}) =>
  axios.get(`${BASE_URL}/${endpoint}`, { params }).then(res => res.data);

// ---------- Pages ----------
export const getPageBySlug = slug => getResource('pages', { slug });
export const getPageWithACF = async slug => {
  const [page] = await getPageBySlug(slug);
  return {
    id: page.id,
    title: page.title?.rendered,
    content: page.content?.rendered,
    acf: page.acf || {}
  };
};
export const getPageWithYoast = async slug => {
  const [page] = await getPageBySlug(slug);
  return {
    id: page.id,
    title: page.title?.rendered,
    content: page.content?.rendered,
    acf: page.acf || {},
    yoast: page.yoast_head_json || {}
  };
};

// ---------- Posts ----------
export const getAllPosts = () => getResource('posts');
export const getPostBySlug = slug => getResource('posts', { slug });

// Paged posts (returns full Axios response)
export const getPosts = (page = 1, per_page = 3) =>
  axios.get(`${BASE_URL}/posts`, { params: { page, per_page } });

// Fetch a single media item
export const getMedia = id => axios.get(`${BASE_URL}/media/${id}`);

// Fetch posts + resolve thumbnails + total pages
export const getPostsWithThumbs = async (page = 1, per_page = 3) => {
  const res = await getPosts(page, per_page);
  const totalPages = parseInt(res.headers['x-wp-totalpages'], 10) || 1;
  const posts = res.data;

  const withThumbs = await Promise.all(
    posts.map(async post => {
      if (!post.featured_media) return { ...post, thumbnail: null };
      try {
        const media = await getMedia(post.featured_media);
        return { ...post, thumbnail: media.data.source_url };
      } catch {
        return { ...post, thumbnail: null };
      }
    })
  );

  return { posts: withThumbs, totalPages };
};

// ---------- Categories ----------
export const getCategories = () => getResource('categories');

// ---------- Case Studies ----------
export const getAllCaseStudies = () => getResource('case-study');
export const getCaseStudyBySlug = slug => getResource('case-study', { slug });

// ---------- Services ----------
export const getAllServices = () => getResource('service');
export const getServiceBySlug = slug => getResource('service', { slug });

// ---------- Menu ----------
export const getMenuItems = () =>
  axios.get(`${BASE_URL.replace('/wp/v2', '')}/myroutes/menu`)
    .then(res => res.data || []);

// ---------- Contact Form ----------
export const submitContactForm = formData =>
  axios.post(CF7_URL, formData);

// ---------- Woocommerce ----------
export const getAllProducts = (params = {}) =>
  axios
    .get(`${WC_URL}/products`, {
      auth: WC_AUTH,
      params
    })
    .then(res => res.data);

    
//API to fetch Single Woocommerce Product by slug
export const getProductBySlug = (slug) =>
  axios.get(`${WC_BASE_URL}/v3/products`, {
    params: { slug },
    auth: {
      username: 'ck_72711cd6713318569a8c2665226f74f34e75a95e', // Consumer Key
      password: 'cs_25775b7891ebb40e89eefdb996673246c0d2a320'  // Consumer Secret
    },
  }).then(res => res.data);