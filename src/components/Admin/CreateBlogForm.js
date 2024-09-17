import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const postSchema = Yup.object().shape({
  name: Yup.string().required('Title is required'),
  
});

const CreateBlogForm = ({ createBlog }) => {
  return (
      <Formik
        initialValues={{
          name: ''
        }}
        validationSchema={postSchema}
        onSubmit={(values, { setSubmitting }) => {
          createBlog(values);
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            {/* Title Field */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
  );
};

export default CreateBlogForm;
