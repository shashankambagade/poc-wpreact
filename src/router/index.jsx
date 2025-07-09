import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from '../pages/Home';
import Page from '../pages/Page'; // ✅ dynamic page renderer

export default function Router() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<Page />} /> {/* ✅ catch all */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
