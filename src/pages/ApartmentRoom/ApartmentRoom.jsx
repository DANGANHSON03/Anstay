import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom"; // Sử dụng useLocation để lấy location từ URL
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoomCard from "../../components/RoomCard/RoomCard";

const ApartmentRoom = () => {
  const { area, apartmentId, apartmentName } = useParams(); // Lấy các tham số từ URL
  const location = useLocation(); // Lấy URL hiện tại từ useLocation
  const searchParams = new URLSearchParams(location.search); // Trích xuất các tham số từ query string của URL

  const [propertyData, setPropertyData] = useState({
    images: [],
    address: "",
    rating: "",
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderRef = useRef(null);

  // Tính toán các hình ảnh duy nhất từ kết quả tìm kiếm

  // Kiểm tra và fetch dữ liệu nếu apartmentId có giá trị
  useEffect(() => {
    if (!apartmentId) {
      setError("Apartment ID is missing.");
      setLoading(false);
      return; // Nếu không có apartmentId, dừng lại và thông báo lỗi
    }

    const fetchData = async () => {
      try {
        // Lấy dữ liệu căn hộ dựa trên apartmentId
        const propertyRes = await fetch(
          `https://anstay.com.vn/api/apartments/${apartmentId}`
        );
        if (!propertyRes.ok) throw new Error("Failed to fetch property data");
        const propertyJson = await propertyRes.json();
        setPropertyData({
          images: propertyJson.images || [],
          address: propertyJson.location || "Unknown Address",
          rating: propertyJson.rating || "No Rating",
        });

        // Lấy các phòng của căn hộ với `apartmentId`
        const roomsRes = await fetch(
          `https://anstay.com.vn/api/rooms/apartment/${apartmentId}`
        );
        if (!roomsRes.ok) throw new Error("Failed to fetch rooms");
        const roomsData = await roomsRes.json();
        setRooms(roomsData);

        // Tính toán các hình ảnh duy nhất từ kết quả tìm kiếm (dựa trên dữ liệu phòng)
        const urls = new Set();
        const result = [];
        roomsData.forEach((item) => {
          item.images?.forEach((img) => {
            if (img.imageUrl && !urls.has(img.imageUrl)) {
              urls.add(img.imageUrl);
              result.push(img.imageUrl);
            }
          });
        });
        setUniqueImages(result); // Cập nhật uniqueImages vào state
      } catch (err) {
        setError(err.message);
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apartmentId]); // Fetch lại khi `apartmentId` thay đổi
  const [uniqueImages, setUniqueImages] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>; // Hiển thị lỗi nếu có
  }

  // Fallback hình ảnh mặc định nếu không có dữ liệu
  const finalImages =
    uniqueImages.length > 0 ? uniqueImages : ["/default-image.jpg"];

  return (
    <>
      <div className="carousel-wrapper">
        {finalImages.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {finalImages.map((src, i) => (
              <div key={i} className="carousel-slide">
                <div className="image-wrapper">
                  <img src={src} alt={`Slide ${i}`} />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="carousel-slide">
            <div className="image-wrapper">
              <img src="/default-image.jpg" alt="No image" />
            </div>
          </div>
        )}

        <div className="carousel-info">
          {/* Hiển thị tên căn hộ từ apartmentName */}
          <h3 className="carousel-title">{searchParams.get("location")}</h3>
          <div className="carousel-address">🗺️ {propertyData.address}</div>
          <div className="carousel-address">💬 {propertyData.rating}</div>
        </div>
      </div>

      <div>
        {rooms.length > 0 ? (
          rooms.map((room) => <RoomCard key={room.id} data={room} />)
        ) : (
          <p>No rooms available for this apartment.</p>
        )}
      </div>
    </>
  );
};

export default ApartmentRoom;
