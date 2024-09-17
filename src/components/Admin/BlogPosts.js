import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import CustomModel from "../CustomModel";
import EditPostForm from "./EditPostForm";
import { ConfirmBox } from "../ConfirmBox";
import NoListPanel from "../NoListPanel";

export default function BlogPosts({ 
  posts, 
  deletePost, 
  refreshPosts,
  handleDeletePost,
  deleteConfirmBoxOpen,
  setDeleteConfirmBoxOpen
}) {
  const [editPost, setEditPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (post) => {
    setEditPost(post);
    setIsEditModalOpen(true);
  }

  return (
    <div className="relative overflow-x-auto">
      <ConfirmBox  
        title="Are you sure?"
        openModal={deleteConfirmBoxOpen}
        setOpenModal={setDeleteConfirmBoxOpen}
        onSubmit={deletePost}
      >
      Do you want to delete the post?
      </ConfirmBox>

      <CustomModel
        openModal={isEditModalOpen}
        setOpenModal={setIsEditModalOpen}
        title="Edit post"
      >
        <EditPostForm editPost={editPost} setOpenModal={setIsEditModalOpen} refreshPosts={refreshPosts} />
      </CustomModel>

      {!posts.length ?
          (
            <NoListPanel>No posts are available.</NoListPanel>
          )
          : 
          <Table striped>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Facebook Embed</Table.HeadCell>
          <Table.HeadCell>Twitter Embed</Table.HeadCell>
          <Table.HeadCell>Meta Data URL</Table.HeadCell>
          <Table.HeadCell>Action </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {posts.map((post) => (
            <Table.Row
              key={post.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{post.title}</Table.Cell>
              <Table.Cell>{post.description}</Table.Cell>
              <Table.Cell>
                {post.imageUrl && (
                  <img
                    className="max-w-36"
                    src={post.imageUrl}
                    alt="Post Image"
                  />
                )}
              </Table.Cell>

              <Table.Cell className="max-w-[100px]">
                {post.facebookEmbed ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell className="max-w-[100px]">
                {post.twitterEmbed ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell>{post.metaUrl}</Table.Cell>
              <Table.Cell className="flex gap-1">
                <Button
                  size={"xs"}
                  onClick={() => handleEdit(post)}
                  color={"warning"}
                >
                  Edit
                </Button>
                <Button
                  size={"xs"}
                  onClick={() => handleDeletePost(post.id)}
                  color={"failure"}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      }
      
    </div>
  );
}
