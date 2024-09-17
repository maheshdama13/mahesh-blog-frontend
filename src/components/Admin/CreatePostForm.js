import React from "react";
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

export default function CreatePostForm({
  handleSubmit
}) {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        imageFile: null,
        metaUrl: '',
      }}
      validationSchema={postSchema}
      onSubmit={async(values, { setSubmitting }) => {
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

          {/* Description Field */}
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
          {/* Submit Button */}
          <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting ? 'Submitting...' : 'Add Post'}
            </button>
        </Form>
      )}
    </Formik>
  );
}
