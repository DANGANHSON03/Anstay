// src/pages/BlogDetail.tsx
import { useParams } from "react-router-dom";
import { blogData, Blog } from "../../BlogData/blogData";
import { useEffect, useState } from "react";
import "./BlogDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const found = blogData.find((b) => b.id === id);
    setBlog(found || null);
  }, [id]);

  if (!blog)
    return (
      <div className="p-6 text-center text-gray-600 italic">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <>
      <Header />
      <div className="blog-detail-container">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <div className="blog-detail-header">
          <p className="blog-detail-meta">
            📅 {blog.date} &nbsp;|&nbsp; 👁 {blog.views} lượt xem
          </p>
          <img src={blog.image} alt="Ảnh chính" className="blog-main-img" />
          <div className="blog-detail-description">{blog.description}</div>
        </div>

        <div className="blog-html">
          {Array.isArray(blog.content) ? (
            blog.content.map((block, index) => {
              switch (block.type) {
                case "title":
                  return <h2 key={index}>{block.text}</h2>;
                case "paragraph":
                  return (
                    <div
                      key={index}
                      className="blog-list-item"
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                case "image":
                  return (
                    <img
                      key={index}
                      src={block.src}
                      alt={block.alt}
                      className="blog-content-img"
                    />
                  );
                default:
                  return null;
              }
            })
          ) : (
            // fallback để render nếu content vẫn là string cũ
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          )}
        </div>

        {blog.gallery.length > 0 && (
          <section className="blog-gallery-section">
            <h2 className="blog-gallery-title">Hình ảnh trải nghiệm</h2>
            <div className="blog-gallery-grid">
              {blog.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Ảnh ${idx + 1}`}
                  className="blog-gallery-img"
                />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
}
