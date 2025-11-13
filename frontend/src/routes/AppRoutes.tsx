import { useRoutes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/Home';
import { ShopPage } from '../pages/shop/ShopPage';
import { ProductDetailPage } from '../pages/shop/ProductDetailPage';
import { ServicesPage } from '../pages/services/ServicesPage';
import { BlogIndexPage } from '../pages/blog/BlogIndexPage';
import { BlogPostPage } from '../pages/blog/BlogPostPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { FAQPage } from '../pages/FAQPage';
import { PoliciesPage } from '../pages/PoliciesPage';
import { CartPage } from '../pages/cart/CartPage';
import { CheckoutPage } from '../pages/cart/CheckoutPage';
import { CheckoutSuccessPage } from '../pages/cart/CheckoutSuccessPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'shop', element: <ShopPage /> },
        { path: 'shop/:slug', element: <ProductDetailPage /> },
        { path: 'services', element: <ServicesPage /> },
        { path: 'blog', element: <BlogIndexPage /> },
        { path: 'blog/:slug', element: <BlogPostPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'faq', element: <FAQPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'checkout/success', element: <CheckoutSuccessPage /> },
        { path: 'shipping', element: <PoliciesPage /> },
        { path: 'terms', element: <PoliciesPage /> },
        { path: 'privacy', element: <PoliciesPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);

  return element;
}

