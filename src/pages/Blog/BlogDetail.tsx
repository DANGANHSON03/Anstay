import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BlogDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const API_URL = "https://anstay.com.vn";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${API_URL}/api/admin/blog-posts/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Xử lý ảnh (nếu là relative path thì tự động thêm domain)
  const getFullImageUrl = (url?: string) => {
    if (!url) return "https://placehold.co/600x300?text=No+Image";
    if (url.startsWith("http")) return url;
    return API_URL + url;
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600 italic">
        Đang tải bài viết...
      </div>
    );

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
            📅{" "}
            {blog.createdAt
              ? blog.createdAt.split("T")[0].split("-").reverse().join("-")
              : ""}
          </p>
          <img
            src={getFullImageUrl(blog.thumbnail)}
            alt="Ảnh chính"
            className="blog-main-img"
          />
          {/* {blog.summary && (
            // <div className="blog-detail-description">{blog.summary}</div>
          )} */}
        </div>

        <div className="blog-html">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        {/* Nếu muốn hiển thị gallery, BE cần trả thêm trường gallery dạng mảng */}
        {blog.gallery?.length > 0 && (
          <section className="blog-gallery-section">
            <h2 className="blog-gallery-title">Hình ảnh trải nghiệm</h2>
            <div className="blog-gallery-grid">
              {blog.gallery.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={getFullImageUrl(img)}
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
