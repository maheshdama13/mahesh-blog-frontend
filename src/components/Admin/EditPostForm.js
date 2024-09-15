import { Button } from "flowbite-react";
import React, { useRef, useState } from "react";
import api from "../../services/api";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";

export default function EditPostForm({
  setOpenModal,
  editPost,
  refreshPosts
}) {
  const [formData, setFormData] = useState({
                                            title: editPost.title,
                                            description: editPost.description,
                                            image: editPost.image,
                                            facebookEmbed: editPost.facebookEmbed,
                                            twitterEmbed: editPost.twitterEmbed,
                                            metaUrl: editPost.metaUrl 
                                          });

  const handleSubmit = (e) => {
    e.preventDefault();

    var form_data = new FormData();
    for (var key in formData) {
      if (formData[key]) form_data.append(key, formData[key]);
    }

    try {
      api
        .put(`/admin/blogs/${editPost.blogId}/posts/${editPost.id}`, form_data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // setPosts([...posts, res.data]);
          setOpenModal(false);
          refreshPosts();
        });

    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prevState) => {
      return { ...formData, [name]: files[0] };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CustomInput
          type="text"
          label="Title"
          value={formData?.title}
          name="title"
          className="mb-4"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <CustomTextArea
          label="Description"
          value={formData?.description}
          name="description"
          className="mb-4"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image</label>
        <CustomInput
          type="file"
          accept="image/*"
          name="image"
          className="mb-4"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <CustomTextArea
          label="Facebook Embed Code"
          value={formData?.facebookEmbed}
          name="facebookEmbed"
          className="mb-4"
          onChange={handleChange}
        />
      </div>
      <div>
        <CustomTextArea
          label="Twitter Embed Code"
          value={formData?.twitterEmbed}
          name="twitterEmbed"
          className="mb-4"
          onChange={handleChange}
        />
      </div>
      <div>
        <CustomInput
          label="Meta URL (for scraping)"
          type="url"
          value={formData?.metaUrl}
          name="metaUrl"
          className="mb-4"
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
