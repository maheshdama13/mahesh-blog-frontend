import { Button } from "flowbite-react";
import React, { useRef, useState } from "react";
import api from "../../services/api";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const postSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  metaUrl: Yup.string().url("Invalid URL format").nullable(),
  image: Yup.mixed().test(
    "fileType",
    "Only JPEG or PNG images are allowed",
    (value) =>
      !value || (value && ["image/jpeg", "image/png"].includes(value.type))
  ),
});

export default function EditPostForm({ setOpenModal, editPost, refreshPosts }) {
  const handleSubmit = (values) => {
    try {
      api
        .put(`/admin/blogs/${editPost.blogId}/posts/${editPost.id}`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // setPosts([...posts, res.data]);
          setOpenModal(false);
          refreshPosts();
          toast("Post updated successfully.");
        })
        .catch(() => {
          toast("Something went wrong, Please try again later.");
        });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        title: editPost.title,
        description: editPost.description,
        image: editPost.image,
        facebookEmbed: editPost.facebookEmbed,
        twitterEmbed: editPost.twitterEmbed,
        metaUrl: editPost.metaUrl,
      }}
      validationSchema={postSchema}
      onSubmit={async (values, { setSubmitting }) => {
        // console.log(values);
        // console.log("__________________ values");
        await handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <Field
              type="text"
              name="title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <Field
              as="textarea"
              name="description"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(event) =>
                setFieldValue("image", event.target.files[0])
              }
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Facebook Embed Code</label>
            <Field
              as="textarea"
              name="facebookEmbed"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="facebookEmbed"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Twitter Embed Code</label>
            <Field
              as="textarea"
              name="twitterEmbed"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="twitterEmbed"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Meta URL */}
          <div className="mb-4">
            <label className="block text-gray-700">Meta URL</label>
            <Field
              type="text"
              name="metaUrl"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="metaUrl"
              component="div"
              className="text-red-500"
            />
          </div>
          <Button type="submit">Update</Button>
        </Form>
      )}
    </Formik>
  );
}
