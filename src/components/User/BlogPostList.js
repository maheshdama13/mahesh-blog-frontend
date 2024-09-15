import { Card } from "flowbite-react";
import React from "react";

export default function BlogPostList({ posts }) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {!posts.length ?
          (
            <div className="bg-gray-100 p-5 mt-2 rounded">No posts are available.</div>
          )
          : ''
        }

      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

const Post = ({ post }) => {
  return (
    <Card>
      {/* Post Header */}
      {post.title && (
        <h2 className="text-xl font-semibold border-b-2">{post.title}</h2>
      )}

      {/* Post Content */}
      <div className="">
        {/* Post Description */}
        {post.description && (
          <p className="text-gray-700 text-sm mb-4 mt-0">{post.description}</p>
        )}

        {/* Post Image */}
        {post.imageUrl && (
          <div className="mb-4">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="max-w-[500px] h-auto object-cover rounded-lg transition-transform "
            />
          </div>
        )}

        {/* Facebook Embed */}
        {post.facebookEmbed && (
          <>
          <div
            className="fb-embed mb-4"
            dangerouslySetInnerHTML={{ __html: post.facebookEmbed }}
          />

          </>
        )}

        {/* Twitter Embed */}
        {post.twitterEmbed && (
          <div
            className="twitter-embed mb-4"
            dangerouslySetInnerHTML={{ __html: post.twitterEmbed }}
          />
        )}

        {/* Meta URL */}
        {post.metaUrl && (
          <a
            href={post.metaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-300 hover:border-gray-400 rounded-lg p-4 mb-4 transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="flex items-start">
              <img
                src={post.metaImage}
                alt={post.metaTitle}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-600">
                  {post.metaTitle}
                </h3>
                <p className="text-gray-600">{post.metaDescription}</p>
              </div>
            </div>
          </a>
        )}
      </div>
    </Card>
  );
};
