import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";
import { Button, Table, Tooltip } from "flowbite-react";
import CustomModel from "../CustomModel";
import CustomInput from "../CustomInput";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogName, setBlogName] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { setBreadcrumbs } = useBreadcrumbs();
  useEffect(() => {
    setBreadcrumbs([{ link: "/admin", title: "Blog List" }]);
  }, []);

  useEffect(() => {
    api.get("/admin/blogs").then((res) => setBlogs(res.data));
  }, []);

  const createBlog = () => {
    api.post("/admin/blogs", { name: blogName }).then((res) => {
      setBlogs([...blogs, res.data]);
      setBlogName("");
      setOpenCreateModal(false)
    });
  };

  const deleteBlog = (id) => {
    api.delete(`/admin/blogs/${id}`).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    });
  };

  const togglePublish = (id, isPublished) => {
    api
      .patch(`/admin/blogs/${id}/publish`, { isPublished: !isPublished })
      .then((res) => {
        setBlogs(blogs.map((blog) => (blog.id === id ? res.data : blog)));
      });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">
      Blogs
      <Button
          type="button"
          onClick={() => setOpenCreateModal(true)}
          className="float-end"
        >
          Create a Blog
        </Button>
      </h1>

      <CustomModel
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        title="Create a Blog"
      >
        <div>
          <div>
            <CustomInput
              type="text"
              label="Title"
              value={blogName}
              name="title"
              className="mb-4"
              onChange={(e) => setBlogName(e.target.value)}
              required
            />
          </div>

          <Button onClick={createBlog}>Create New Blog</Button>
        </div>
      </CustomModel>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {blogs.map((blog) => (
            <Table.Row
              key={blog.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <Link to={`/admin/blogs/${blog.id}`}>{blog.name}</Link>
              </Table.Cell>

              <Table.Cell>
                <div class="flex gap-1">
                  <Tooltip content="Click to toggle status">
                    <Button
                      size="xs"
                      color={`${blog.isPublished ? "success" : "warning"}`}
                      onClick={() => togglePublish(blog.id, blog.isPublished)}
                    >
                      {blog.isPublished ? "Published" : "Unpublished"}
                    </Button>
                  </Tooltip>

                  <Link to={`/admin/blogs/${blog.id}`}>
                    <Button
                      size="xs"
                      color={"blue"}
                    >
                      View
                    </Button>
                  </Link>

                  <Button
                    size="xs"
                    color={"failure"}
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete
                  </Button>

                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default BlogList;
