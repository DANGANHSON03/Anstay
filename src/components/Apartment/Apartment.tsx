import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Apartment.css";

const Apartment = () => {
  const navigate = useNavigate();
  const [listingData] = useState([
    {
      id: 1,
      title: "Vinhomes Metropolis 3BR",
      address: "29 Liễu Giai, Ngọc Khánh",
      district: "Quận Ba Đình",
      bedrooms: 3,
      price: 3000,
      area: 130,
      description: "Căn hộ cao cấp với view đẹp, nội thất hiện đại",
      amenities: ["Ban công", "Bảo vệ 24/7", "Bể bơi", "Gym"],
      discount:10,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
        "https://images.unsplash.com/photo-1564078516393-cf04bd966897",
      ],
      soldOut: true, // Add soldOut property
    },
    {
      id: 2,
      title: "T-Place 2BR",
      address: "30A Lý Thường Kiệt, Hàng Bài",
      district: "Quận Hoàn Kiếm",
      bedrooms: 2,
      price: 2300,
      area: 72,
      description: "Căn hộ tiện nghi, gần trung tâm",
      amenities: ["Thang máy", "Bảo vệ 24/7"],
      discount:15,
      images: [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
        "https://images.unsplash.com/photo-1598928636135-d0f224ca81f7",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
        "https://images.unsplash.com/photo-1598928636135-d0f224ca81f7",
      ],
      
    },
    {
      id: 3,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        "https://images.unsplash.com/photo-1502005097973-6a7082348e28",
        "https://images.unsplash.com/photo-1495433324511-bf8e92934d90",
      ],
    },
    {
      id: 4,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
    {
      id: 5,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
    {
      id: 6,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
    {
      id: 7,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
    {
      id: 8,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
   
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
    {
      id: 9,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
    {
      id: 10,
      title: "FLESTA Lancaster Luminaire 3BR",
      address: "1152 Đường Láng, Láng Thượng",
      district: "Quận Đống Đa",
      bedrooms: 2,
      price: 2100,
      area: 92,
      description: "Căn hộ hiện đại, đầy đủ tiện nghi",
      amenities: ["Bể bơi", "Gym", "Bảo vệ 24/7"],
      images: [
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
        "/api/placeholder/400/200",
      ],
    },
  ]);

  // State for active image index per listing
  const [activeImages, setActiveImages] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
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
    navigate(`/apartment/${listingId}`);
  };

  return (
    <div>
      <div className="apart-top">
        <div className="img-top-apart">
          <img
            src="https://i.ibb.co/hpMFfrw/z4852932594666-d9c69ab00f1ae9691c10540639338a2b.jpg"
            alt="poster"
          />
        </div>
        <div className="title-top-apart">
          <h2>Căn hộ</h2>
        </div>
      </div>
      <div className="container-wrapper">
        <div className="container">
          {/* Filters */}
          <div className="filters">    
            <span>Sắp xếp theo:</span>
            <div className="filter-item">
              <select className="filter-select">
                <option>Kỳ hạn: Tất cả</option>
              </select>
            </div>
            <div className="filter-item">
              <select className="filter-select">
                <option>Giá tiền: Giá giảm dần</option>
              </select>
            </div>
          </div>

          {/* Listings grid */}
          <div className="listings-grid">
            {visibleListings.map((listing) => (
              <div
                key={listing.id}
                className="listing-card"
                onClick={() => handleListingClick(listing.id)}
              >
                {/* Image carousel */}
                <div className="listing-image">
                  {listing.discount && (
                    <div className="discount-badge-ap">
                      -{listing.discount}%
                    </div>
                  )}
                  {listing.soldOut && (
                    <div className="sold-out-banner">Hết phòng</div>
                  )}
                  <img
                    src={listing.images[activeImages[listing.id] || 0]}
                    alt={listing.title}
                    className="listing-img"
                  />
                  {/* Favorite button */}
                  {/* <button
                    className="favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    ❤
                  </button> */}
                  {/* Navigation arrows */}
                  <div className="nav-buttons">
                    <button
                      className="nav-btn nav-btn-prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(listing.id, "prev");
                      }}
                    >
                      ❮
                    </button>
                    <button
                     
                      className="nav-btn nav-btn-next"
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
                        onClick={() =>
                          setActiveImages({
                            ...activeImages,
                            [listing.id]: index,
                          })
                        }
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  <div className="listing-address">📍 {listing.address}</div>
                  <div className="listing-address">📍 {listing.district}</div>
                  <div className="listing-details">
                    <div className="listing-price">${listing.price}/tháng</div>
                    <div className="listing-feature">
                      🛏️ {listing.bedrooms} phòng ngủ
                    </div>
                  </div>
                  <div className="listing-details">
                    <div></div>
                    <div className="listing-feature">📏 {listing.area}m²</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button - only show if there are more items to load */}
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

export default Apartment;
