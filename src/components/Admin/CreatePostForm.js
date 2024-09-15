import { Button } from "flowbite-react";
import React from "react";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";

export default function CreatePostForm({
  handleSubmit,
  handleInputChange,
  handleFileChange,
  newPost,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CustomInput
          type="text"
          label="Title"
          value={newPost?.title}
          name="title"
          className="mb-4"
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <CustomTextArea
          label="Description"
          value={newPost?.description}
          name="description"
          onChange={handleInputChange}
          className="mb-4"
          required
        />
      </div>
      <div>
        <label>Image</label>
        <CustomInput
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          className="mb-4"
        />
      </div>
      <div>
        <CustomTextArea
          label="Facebook Embed Code"
          value={newPost?.facebookEmbed}
          name="facebookEmbed"
          onChange={handleInputChange}
          className="mb-4"
        />
      </div>
      <div>
        <CustomTextArea
          label="Twitter Embed Code"
          value={newPost?.twitterEmbed}
          name="twitterEmbed"
          onChange={handleInputChange}
          className="mb-4"
        />
      </div>
      <div>
        <CustomInput
          label="Meta URL (for scraping)"
          type="url"
          value={newPost?.metaUrl}
          name="metaUrl"
          onChange={handleInputChange}
          className="mb-4"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
