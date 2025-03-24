import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tour.css";

const Tour = () => {
  const navigate = useNavigate();
  const [listingData] = useState([
    {
      id: 1,
      title: "Du lịch Hạ Long 3 ngày 2 đêm",
      time: "3 ngày 2 đêm",
      transportation: "Xe bus + Du thuyền",
      hotel: "Hạ Long Plaza Hotel 5*",
      price: 2500000,
      images: [
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b",
        "https://images.unsplash.com/photo-1573146500785-c0244c0daae3",
        "https://images.unsplash.com/photo-1528127269322-539801943592",
      ],
    },
    {
      id: 2,
      title: "Tour Sapa - Fansipan 2 ngày",
      time: "2 ngày 1 đêm",
      transportation: "Xe limousine",
      hotel: "Bamboo Sapa Hotel 4*",
      price: 1800000,
      images: [
        "https://images.unsplash.com/photo-1565953520-b883f6795957",
        "https://images.unsplash.com/photo-1565953522043-8e75f4b6087f",
      ],
    },
    // ...thêm các tour khác tương tự
  ]);

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

  // Thay thế hàm openPopup bằng hàm navigate
  const handleListingClick = (listingId) => {
    navigate(`/tour/${listingId}`);
  };

  return (
    <div>
      <div className="apart-top">
        <div className="img-top-apart">
          <img
            src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b"
            alt="tour banner"
          />
        </div>
        <div className="title-top-apart">
          <h2>Tour Du Lịch</h2>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container">
          <div className="filters">
            <div className="filter-item">
              <span>Sắp xếp theo:</span>
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
                onClick={() => handleListingClick(listing.id)}
              >
                <div className="listing-image">
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
    </div>
  );
};

export default Tour;
