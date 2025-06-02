import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const API_URL = "http://localhost:8085";
const BLOG_API = `${API_URL}/api/admin/blog-posts`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    axios
      .get(BLOG_API)
      .then((res) => setBlogs(res.data))
      .catch(() => setBlogs([]));
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Xử lý ảnh (thêm domain nếu cần)
  const getFullImageUrl = (url) => {
    if (!url) return "https://placehold.co/400x250?text=No+Image";
    if (url.startsWith("http")) return url;
    return API_URL + url;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="blog-page">
      <h1>Trải Nghiệm Tour Du Lịch</h1>
      <div className="blog-list">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img
              src={getFullImageUrl(blog.thumbnail)}
              alt={blog.title}
              className="blog-image"
            />
            <div className="blog-content">
              <h2 className="blog-title">{blog.title}</h2>
              <div className="blog-meta">
                <span>
                  📅{" "}
                  {blog.createdAt
                    ? blog.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")
                    : ""}
                </span>
                {/* <span>👁️ 0</span> */}
              </div>
              <p className="blog-description">
                {blog.summary && blog.summary.trim() !== ""
                  ? blog.summary
                  : blog.content
                  ? blog.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                  : ""}
              </p>
              <Link to={`/blog/${blog.id}`}>
                <button className="blog-button">Xem thêm</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              paginate(index + 1);
              ScrollToTop();
            }}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blog;
