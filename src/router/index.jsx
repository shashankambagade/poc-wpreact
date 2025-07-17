import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from '../pages/Home';
import PostList from '../pages/Post';
import SinglePost from '../pages/SinglePost'; // ← your detail view
import Page from '../pages/Page'; // ← your page view
import ProductList from '../pages/Products'; // ← your product list view
import SingleProduct from '../pages/SingleProduct';

export default function Router() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<Page />} />
          <Route path="/posts" element={<PostList />} />         {/* list all posts */}
          <Route path="/products" element={<ProductList />} />         {/* list all products */}
          <Route path="/product/:slug" element={<SingleProduct />} />
          <Route path="/post/:slug" element={<SinglePost />} />   {/* single post */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
