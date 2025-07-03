import React, { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ui/ScrollToTop";
import Spinner from "@/components/ui/Spinner";
import AppLayout from "@/layouts/AppLayout";

const CartPage = lazy(() => import("@/pages/CartPage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage"));
const DetailPage = lazy(() => import("@/pages/DetailPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="main">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<AppLayout />} path="/">
              <Route element={<CatalogPage />} path="/" />
              <Route element={<DetailPage />} path="/products/:id" />
              <Route element={<CartPage />} path="/cart" />
              <Route element={<NotFoundPage />} path="*" />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default Router;
