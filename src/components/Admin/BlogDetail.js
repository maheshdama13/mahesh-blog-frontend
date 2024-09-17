import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import CustomModel from "../CustomModel";
import { Button } from "flowbite-react";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";
import BlogPosts from "./BlogPosts";
import CreatePostForm from "./CreatePostForm";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [posts, setPosts] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteConfirmBoxOpen, setDeleteConfirmBoxOpen] = useState(false);

  const { setBreadcrumbs } = useBreadcrumbs();
  useEffect(() => {
    setBreadcrumbs([
      { link: "/admin", title: "Blog List" },
      { link: "#", title: "Blog Detail" },
    ]);
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [blogId]);

  const refreshPosts = () => {
    api.get(`/blogs/${blogId}/posts`).then((res) => setPosts(res.data));
  };

  const handleSubmit = async (values) => {
    try {
      api
        .post(`/admin/blogs/${blogId}/posts`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setPosts([...posts, res.data]);
          setOpenCreateModal(false);
          toast("Post created successfully.");
        })
        .catch(() => {
          toast("Something went wrong, Please try again later.");
        });

    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const deletePost = () => {
    api
      .delete(`/admin/blogs/${blogId}/posts/${deleteId}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== deleteId));
        setDeleteConfirmBoxOpen(false);
        toast("Post deleted successfully.");
      })
      .catch(() => {
        toast("Something went wrong, Please try again later.");
      });
  };

  const handleDeletePost = (id) => {
    setDeleteId(id);
    setDeleteConfirmBoxOpen(true);
  };

  /* const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  }; */

  /* const handleFileChange = (e) => {
    const { name, files } = e.target;

    setNewPost((prevState) => {
      return { ...prevState, [name]: files[0] };
    });
  }; */

  return (
    <>
      <CustomModel
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        title="Create a post"
      >
        <CreatePostForm
          handleSubmit={handleSubmit}
        />
      </CustomModel>

      <h1 className="text-xl font-bold mb-5">
        Posts
        <Button
          type="button"
          onClick={() => setOpenCreateModal(true)}
          className="float-end"
        >
          Create a Post
        </Button>
      </h1>

      <BlogPosts
        posts={posts}
        deletePost={deletePost}
        refreshPosts={refreshPosts}
        handleDeletePost={handleDeletePost}
        deleteConfirmBoxOpen={deleteConfirmBoxOpen}
        setDeleteConfirmBoxOpen={setDeleteConfirmBoxOpen}
      />
    </>
  );
};

export default BlogDetail;
