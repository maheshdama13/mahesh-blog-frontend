// src/pages/BlogList.js
import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const { setBreadcrumbs } = useBreadcrumbs();
  useEffect(() => {
    setBreadcrumbs([
      { link: "/", title: "Blog List" },
    ]);
  }, []);

  useEffect(() => {
    // Fetch blogs initially
    api.get("/blogs").then((response) => {
      setBlogs(response.data);
    });

    // Listen for live updates from the backend via socket.io
    socket.on("update-blogs", (updatedBlogs) => {
      setBlogs(updatedBlogs);
    });

    // Clean up on component unmount
    return () => {
      socket.off("update-blogs");
    };
  }, []);
  

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border bottom-1 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-1"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{blog.name}</h3>
              <Link to={`/blogs/${blog.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
