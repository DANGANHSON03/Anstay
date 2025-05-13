import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Tour.css";

const Tour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tourName } = useParams(); // Extract URL parameter
  const [listingData, setListingData] = useState([]);

  const formatDuration = (days) => {
    if (days < 1) {
      return "Dữ liệu không hợp lệ";
    }
    const nights = days - 1;
    return `${days} ngày ${nights} đêm`;
  };

  const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  };

  useEffect(() => {
    console.log("Tour name from URL:", tourName); // Log the URL parameter
    const fetchTours = async () => {
      try {
        const apiUrl = location.state?.location
          ? `https://anstay.com.vn/api/tours/by-area?area=${location.state.location}`
          : "https://anstay.com.vn/api/tours";

        const response = await fetch(apiUrl);
        const data = await response.json();
        const transformedData = data.map((tour) => ({
          id: tour.id,
          title: tour.name,
          description: tour.description,
          time: formatDuration(tour.durationDays),
          transportation: tour.transportation,
          hotel: tour.hotel,
          price: tour.price,
          discount: tour.discountPercent,
          area: tour.area,
          images: tour.images.map((img) => img.imageUrl) || [
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
          ],
          schedules: tour.schedules,
        }));
        setListingData(transformedData);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [location.state?.location]);

  // State for active image index per listing
  const [activeImages, setActiveImages] = useState({
    1: 0,
    2: 0,
  });

  // State for visible listings count (initially show 9)
  const [visibleCount, setVisibleCount] = useState(9);

  // Function to navigate images
  const navigateImage = (listingId, direction) => {
    const currentIndex = activeImages[listingId];
    const imagesCount = listingData.find((listing) => listing.id === listingId)
      .images.length;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % imagesCount;
    } else {
      newIndex = (currentIndex - 1 + imagesCount) % imagesCount;
    }

    setActiveImages({ ...activeImages, [listingId]: newIndex });
  };

  // Function to handle "Xem thêm" button click
  const handleLoadMore = () => {
    // Increase visible count by 9 or show all remaining items
    setVisibleCount((prev) => Math.min(prev + 9, listingData.length));
  };

  // Get visible listings
  const visibleListings = listingData.slice(0, visibleCount);

  const handleListingClick = (listing) => {
    if (listing.status !== "OCCUPIED") {
      let baseUrl = "/tour";
      if (location.state?.location === "HA_LONG") {
        baseUrl = "/tour-ha-long";
      } else if (location.state?.location === "HA_NOI") {
        baseUrl = "/tour-ha-noi";
      }
      const urlFriendlyName = removeVietnameseTones(listing.title)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      navigate(`${baseUrl}/${urlFriendlyName}/view`, {
        state: { listingId: listing.id },
      });
    }
  };

  return (
    <>
      <div className="apart-top">
        <div className="img-top-apart">
          <img
            src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b"
            alt="tour banner111"
          />
        </div>
        <div className="title-top-apart">
          <h2>Tour Du Lịch</h2>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container">
          <div className="filters">
            <span>Sắp xếp theo:</span>
            <div className="filter-item">
              <select className="filter-select">
                <option>Thời gian: Tất cả</option>
                <option>2 ngày 1 đêm</option>
                <option>3 ngày 2 đêm</option>
              </select>
            </div>
            <div className="filter-item">
              <select className="filter-select">
                <option>Giá: Tất cả</option>
                <option>Dưới 2 triệu</option>
                <option>2-3 triệu</option>
                <option>Trên 3 triệu</option>
              </select>
            </div>
          </div>

          <div className="listings-grid">
            {visibleListings.map((listing) => (
              <div
                key={listing.id}
                className="listing-card"
                onClick={() => handleListingClick(listing)}
              >
                <div className="listing-image">
                  {listing.discount > 0 && (
                    <div className="discount-badge">-{listing.discount}%</div>
                  )}
                  <img
                    src={listing.images[activeImages[listing.id] || 0]}
                    alt={listing.title}
                    className="listing-img"
                  />
                  {/* Navigation buttons */}
                  <div className="nav-buttons">
                    <button
                      className="nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(listing.id, "prev");
                      }}
                    >
                      ❮
                    </button>
                    <button
                      className="nav-btn nav-btn-next1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(listing.id, "next");
                      }}
                    >
                      ❯
                    </button>
                  </div>
                  {/* Dots */}
                  <div className="image-dots">
                    {listing.images.map((_, index) => (
                      <div
                        key={index}
                        className={`dot ${
                          (activeImages[listing.id] || 0) === index
                            ? "active"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImages({
                            ...activeImages,
                            [listing.id]: index,
                          });
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  <div className="listing-info">
                    <div>⏱️ {listing.time}</div>
                    <div>🚗 {listing.transportation}</div>
                    <div>🏨 {listing.hotel}</div>
                  </div>
                  <div className="listing-price">
                    {listing.price.toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < listingData.length && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Xem thêm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tour;
