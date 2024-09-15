// src/pages/BlogDetails.js
import React, { useState, useEffect } from "react";
import socket from "../../socket";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";
import BlogPostList from "./BlogPostList";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [posts, setPosts] = useState([]);

  const { setBreadcrumbs } = useBreadcrumbs();
  useEffect(() => {
    setBreadcrumbs([
      { link: "/", title: "Blog List" },
      { link: "#", title: "Blog Detail" },
    ]);
  }, []);

  useEffect(() => {
    // Fetch blog details and posts initially
    api.get(`/blogs/${blogId}`).then((response) => {
      setBlog(response.data);
    }).catch((err) => {
      setBlog({})
    });
    
    api.get(`/blogs/${blogId}/posts`).then((response) => {
      setPosts(response.data);
    });

    // Listen for live updates on the blog and its posts
    socket.on(`update-posts-${blogId}`, (updatedPosts) => {
      setPosts(updatedPosts);
    });

    // Clean up on component unmount
    return () => {
      socket.off(`update-posts-${blogId}`);
    };
  }, [blogId]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      {Object.keys(blog).length ? 
        (
          <>
            <h1 className="text-4xl font-bold mb-2 text-center">{blog.name}</h1>
            <BlogPostList posts={posts} />
          </>
        )
        :
        <div className="bg-gray-100 p-5 mt-2 rounded">Blog not found.</div>
      }
      
    </div>
  );
};

export default BlogDetails;
