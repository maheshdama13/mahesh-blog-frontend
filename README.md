# Live Blog Frontend

This is the frontend of the Live Blog application, built using React.js and styled with Tailwind CSS. It provides real-time updates for blog posts, supporting various types of posts including text, images, Facebook/Twitter embeds, and metadata scraped from URLs.

## Features

- View a list of live blogs.
- View blog details and posts in real-time.
- Create, edit, and delete blog posts.
- Supports multiple post types:
    - Title & Description   
    - Title & Description with Image
    - Title & Description with Scraped Metadata (URL)
    - Title with Facebook/Twitter Embeds

## Requirements

- Node.js (v16 or higher)
- npm (v6 or higher)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/maheshdama13/mahesh-blog-frontend.git
cd mahesh-blog-frontend
```

### 2. Install dependencies
```bash
npm install
```

### Set up the backend API URL in a .env file:
Copy the content of `example.env` and create a new env file having name `.env` and paste.
Change "REACT_APP_SERVER_URL" in .env as per you backend url.

### 5. Run the application
```bash
npm start
```
It will automatically sync the Sequelize models with the database:
The app will be available at http://localhost:3000.

## Usage
### Admin:
URL: `http://localhost:3000/admin`
1. Blog List: View the list of blogs.
2. Delete The Blog.
3. Publish / Unpublish the blog.
4. Blog Detail: View posts of a specific blog.
5. Create a new post, Update / Delete existing post.
6. Real-Time Updates: Posts are updated in real-time for the public site (user side) without refreshing the page.
7. Switch from Admin to Public site by clicking "Go to Public Site" button in the navbar.

### Public Site (User):
URL: `http://localhost:3000`
1. Blog List: View the realtime list of published blogs.
2. Blog Detail: View the blog detail and the realtime posts of a specific blog.
3. Switch from Public site to Admin by clicking "Go to Admin" button in the navbar.

## Dependencies
- React - Library for building the UI.
- Axios - HTTP client for making API requests.
- Tailwind CSS - Utility-first CSS framework.
- React Router - For handling navigation between pages.
- Socket - To fech realtime blogs and posts.
