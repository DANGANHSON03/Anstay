import React ,{useState} from 'react'
import './Blog.css'
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  // Tính toán slice bài
 
  const blogs = [
    {
      id: 1,
      title: 'Kinh nghiệm Du lịch HẠ LONG 2025 chi tiết từ A-Z',
      date: '23-10-2023',
      views: 320,
      description: 'Cách Hà Nội khoảng 160 km, TP Hạ Long thuộc tỉnh Quảng Ninh là một điểm du lịch nổi tiếng không chỉ của miền Bắc, toàn quốc mà trên khắp thế giới. Hạ Long có vịnh biển, có các di sản thế giới, các hoạt động du lịch phong phú, đồ ăn ngon...',
      image: 'https://vcdn1-dulich.vnecdn.net/2022/07/18/ha-long-wyndham-jpeg-7124-1651-1973-2285-1658113195.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=4aBx-i-T2CWSqP1RGoTikQ', // Thay bằng link ảnh thực tế
    },
    // Copy thêm tối đa 6 bài, ví dụ:
    {
      id: 2,
      title: 'Những sáng tạo trong khai thác du lịch trên vịnh Hạ Long',
      date: '23-11-2024',
      views: 520,
      description: 'Với một di sản thiên nhiên độc đáo như Vịnh Hạ Long, việc khai thác, phát triển du lịch cũng phải có sự độc đáo để thu hút du khách từ khắp nơi trên thế giới. Và trong những năm qua, ngành du lịch tỉnh Quảng Ninh cũng như Ban Quản lý Vịnh và các bên liên quan đã nỗ lực đưa ra nhiều sáng tạo để những vẻ đẹp của viên ngọc Hạ Long ngày càng lấp lánh hơn',
      image: 'https://i.ibb.co/cSHb9nRL/2.jpg',
    },
    {
      id: 3,
      title: 'TOUR Du lịch 3 ngày 2 đêm Hạ Long - Đảo Ngọc Vừng',
      date: '23-7-2024',
      views: 401,
      description: 'Tận hưởng chuyến nghỉ dưỡng 3 ngày tại đảo Ngọc, nơi thiên nhiên hòa quyện cùng sự tiện nghi, gói tour sẽ bao gồm xe đưa đón khứ hồi, khách sạn, bữa ăn và nhiều hoạt động thú vị, đạp xe dọc những con đường ven biển tuyệt đẹp, chèo kayak trên làn nước trong vắt, bơi lội & thư giãn tại hồ bơi & phòng gym, thưởng thức hải sản tươi ngon & đặc sản địa phương',
      image: 'https://i.ibb.co/hRwVGpxX/v-nh-H-Long-3.jpg', // Thay bằng link ảnh thực tế
    },
    {
      id: 4,
      title: 'Hạ Long hướng đến là trung tâm du lịch tầm quốc tế',
      date: '24-09-2024',
      views: 530,
      description: 'Thành phố Hạ Long (Quảng Ninh) từ lâu được ví như thiên đường du lịch, giải trí với nhiều hoạt động sôi động, phong phú, thu hút đông đảo khách du lịch trong nước và quốc tế đến trải nghiệm. Thời gian gần đây, khi hạ tầng giao thông ngày càng được đầu tư đồng bộ và hiện đại, diện mạo đô thị thay đổi từng ngày đã giúp Hạ Long có bước tiến bứt phá ngoạn mục, hướng đến trở thành trung tâm du lịch mang tầm quốc tế.',
      image: 'https://i.ibb.co/FrRvMwQ/dao-ngoc-vung-1.jpg', // Thay bằng link ảnh thực tế
    },
    {
      id: 5,
      title: 'Du lịch xanh - chìa khóa để vịnh Hạ Long phát triển bền vững',
      date: '14-12-2024',
      views: 628,
      description: 'Là ngành kinh tế mũi nhọn của địa phương, du lịch Hạ Long đang phải đối mặt với nhiều thách thức trong công tác bảo tồn văn hóa, di sản và suy thoái môi trường. Trước tình hình ấy, phát triển du lịch bền vững theo hướng tăng trưởng xanh được xem là hướng đi cần thiết để không “vắt kiệt” di sản, đồng thời, nâng cao năng lực cạnh tranh của địa phương trong quá trình hội nhập.',
      image: 'https://i.ibb.co/1GjTbNzD/v-nh-H-Long.jpg', // Thay bằng link ảnh thực tế
    },
    {
      id: 6,
      title: 'TOUR Hạ long - Đảo Ngọc Vừng 2 ngày 1 đêm',
      date: '21-07-2024',
      views: 611,
      description: 'Tận hưởng chuyến nghỉ dưỡng 3 ngày tại đảo Ngọc, nơi thiên nhiên hòa quyện cùng sự tiện nghi, gói tour sẽ bao gồm xe đưa đón khứ hồi, khách sạn, bữa ăn và nhiều hoạt động thú vị, đạp xe dọc những con đường ven biển tuyệt đẹp, chèo kayak trên làn nước trong vắt, bơi lội & thư giãn tại hồ bơi & phòng gym, thưởng thức hải sản tươi ngon & đặc sản địa phương',
      image: 'https://i.ibb.co/pv8vCpn0/4-co-nhieu-hinh-thuc-di-chuyen-de-dang-toi-tham-quan-nghi-duong-tai-dao-ngoc-vung-6b4991244a.jpg', // Thay bằng link ảnh thực tế
    },
    {
      id: 7,
      title: 'Vịnh Hạ Long và những trải nghiệm mới',
      date: '30-07-2023',
      views: 528,
      description: 'Vịnh Hạ Long và những trải nghiệm mớVịnh Hạ Long (Quảng Ninh) là một trong những điểm đến du lịch hấp dẫn đặc biệt tại Việt Nam. Nơi đây được vinh danh là 1 trong 7 kỳ quan thiên nhiên mới của thế giới và nhiều lần được UNESCO công nhận là di sản thiên nhiên của thế giới.',
      image: 'https://i.ibb.co/35J3zmZn/3.jpg', // Thay bằng link ảnh thực tế
    },
    // Thêm 4 bài nữa tương tự
  ]; 
  
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const ScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth' });
  };
  return (
    <div className="blog-page">
    <h1>Trải Nghiệm Tour Du Lịch</h1>
    <div className="blog-list">
      {currentBlogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <h2 className="blog-title">{blog.title}</h2>
            <div className="blog-meta">
              <span>📅 {blog.date}</span>
              <span>👁️ {blog.views}</span>
            </div>
            <p className="blog-description">{blog.description}</p>
            <button className="blog-button">Xem thêm</button>
          </div>
        </div>
      ))}
    </div>
     {/* nextpage */}
    <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => (paginate(index + 1), ScrollToTop())}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
  </div>
  )
}

export default Blog
