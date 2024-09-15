import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import CustomModel from "../CustomModel";
import { Button } from "flowbite-react";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";
import BlogPosts from "./BlogPosts";
import CreatePostForm from "./CreatePostForm";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [posts, setPosts] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: null,
    facebookEmbed: "",
    twitterEmbed: "",
    metaUrl: "",
  });

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var form_data = new FormData();
    form_data.append(blogId, blogId);
    for (var key in newPost) {
      if (newPost[key]) form_data.append(key, newPost[key]);
    }
    // console.log(form_data);

    try {
      api
        .post(`/admin/blogs/${blogId}/posts`, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setPosts([...posts, res.data]);
          setOpenCreateModal(false);
        });

      setNewPost({
        title: "",
        description: "",
        image: "",
        facebookEmbed: "",
        twitterEmbed: "",
        metaUrl: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const deletePost = (id) => {
    api
      .delete(`/admin/blogs/${blogId}/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post.id !== id)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setNewPost((prevState) => {
      return { ...prevState, [name]: files[0] };
    });
  };

  return (
    <>
      <CustomModel
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        title="Create a post"
      >
        <CreatePostForm
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          newPost={newPost}
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

      <BlogPosts posts={posts} deletePost={deletePost} refreshPosts={refreshPosts} />
    </>
  );
};

export default BlogDetail;
