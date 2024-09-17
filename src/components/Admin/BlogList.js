import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";
import { Button, Table, Tooltip } from "flowbite-react";
import CustomModel from "../CustomModel";
import CustomInput from "../CustomInput";
import { ConfirmBox } from "../ConfirmBox";
import { toast } from "react-toastify";
import CreateBlogForm from "./CreateBlogForm";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogName, setBlogName] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteConfirmBoxOpen, setDeleteConfirmBoxOpen] = useState(false);

  const { setBreadcrumbs } = useBreadcrumbs();
  useEffect(() => {
    setBreadcrumbs([{ link: "/admin", title: "Blog List" }]);
  }, []);

  useEffect(() => {
    api.get("/admin/blogs").then((res) => setBlogs(res.data));
  }, []);

  const createBlog = (values) => {
    api.post("/admin/blogs", values).then((res) => {
      setBlogs([...blogs, res.data]);
      setBlogName("");
      setOpenCreateModal(false)
    });
  };

  const handledeleteBlog = (id) => {
    setDeleteId(id);
    setDeleteConfirmBoxOpen(true);
  }
  
  const deleteBlog = () => {
    api.delete(`/admin/blogs/${deleteId}`).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== deleteId));
      setDeleteConfirmBoxOpen(false);
      toast('Blog deleted successfully.');
    }).catch(() => {
      toast('Something went wrong, Please try again later.');
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

      <ConfirmBox  
        title="Are you sure?"
        openModal={deleteConfirmBoxOpen}
        setOpenModal={setDeleteConfirmBoxOpen}
        onSubmit={deleteBlog}
      >
      Do you want to delete the blog?
      </ConfirmBox>

      {/* Create Blog Modal */}
      <CustomModel
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        title="Create a Blogs"
      >
        <CreateBlogForm createBlog={createBlog} />
       
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
                    onClick={() => handledeleteBlog(blog.id)}
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
