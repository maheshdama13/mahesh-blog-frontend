import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/Admin/BlogList";
import BlogDetail from "./components/Admin/BlogDetail";

import PublicBlogList from "./components/User/BlogList";
import PublicBlogDetail from "./components/User/BlogDetail";
import NavBar from "./components/NavBar";
import Breadcrumbs from "./components/Breadcrumbs";
import { BreadcrumbProvider } from "./contexts/BreadcrumbContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <BreadcrumbProvider>
        <ToastContainer />
        {/* Global ErrorBoundary wrapping main components */}
        <ErrorBoundary>
          <Router>
            <NavBar />
            <Breadcrumbs />

            <div className="px-32 mb-8">
              <Routes>
                {/* Admin routes / Editorial interface */}
                <Route path="/admin/" element={<BlogList />} />
                <Route path="/admin/blogs/:blogId" element={<BlogDetail />} />

                {/* Public User Routes */}
                <Route path="/" element={<PublicBlogList />} />
                <Route path="/blogs/:blogId" element={<PublicBlogDetail />} />
              </Routes>
            </div>
          </Router>
        </ErrorBoundary>
      </BreadcrumbProvider>
    </>
  );
}

export default App;
