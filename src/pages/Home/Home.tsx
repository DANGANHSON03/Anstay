import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Dropdown,
  Space,
  List,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  PlusOutlined,
  MinusOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

import "./Home.css";
import Contact from "../../components/Contact/contact";
import Foryou from "../../components/Foryou/Foryou";
import Event from "../../components/Event/Event";
import Review from "../../components/Review/Review";
import Mapcty from "../../components/Mapcty/Mapcty";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import Should from "../../components/Should/Should";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState([dayjs(), dayjs().add(1, "day")]);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [nights, setNights] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateGuests = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  };

  const handleDateChange = (value) => {
    if (value) {
      setDates([value, value.add(nights, "day")]);
    }
  };

  const handleNightChange = (value) => {
    setNights(value);
    setDates([dates[0], dates[0].add(value, "day")]);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchValue(suggestion.name);
    setShowSuggestions(false);
    // Chuyển hướng đến trang chi tiết
    navigate(`/search/${encodeURIComponent(suggestion.name)}`);
  };

  const suggestions = [
    { name: "Da Nang", country: "Vietnam", key: "2-1" },
    { name: "Da Lat", country: "Lam Dong Province, Vietnam", key: "2-2" },
    {
      name: "Vung Tau City",
      country: "Ba Ria - Vung Tau, Vietnam",
      key: "2-3",
    },
    { name: "Nha Trang", country: "Khanh Hoa, Vietnam", key: "2-4" },
    { name: "Bangkok", country: "Thailand", key: "2-5" },
    { name: "Singapore", country: "", key: "2-6" },
    { name: "Kuala Lumpur", country: "Malaysia", key: "2-7" },
  ];

  // Thêm hàm lọc suggestions
  const filteredSuggestions = suggestions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  const carouselItems = [
    {
      title: "Dominican Republic",
      description:
        "Your family adventure awaits at serene tropical beaches, spas and crystalline pools.",
      tags: ["Spa", "Family Travel", "Beach", "Pool"],
      image: "https://i.ibb.co/JR3qW1Qj/8.jpg",
    },
    {
      title: "Golf Resort",
      description:
        "Experience world-class golf courses surrounded by stunning landscapes.",
      tags: ["Golf", "Luxury", "Resort"],
      image: "https://i.ibb.co/JR3qW1Qj/8.jpg",
    },
    {
      title: "Luxury Poolside",
      description:
        "Relax in a private poolside cabana with first-class amenities.",
      tags: ["Luxury", "Relax", "Resort"],
      image: "https://i.ibb.co/JR3qW1Qj/8.jpg",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const guestMenu = (
    <div
      style={{
        padding: 16,
        width: 250,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        borderRadius: 4,
      }}
    >
      {["adults", "children", "rooms"].map((key, index) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            padding: "8px",
            transition: "background-color 0.3s",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Space>
            <UserOutlined />{" "}
            {key === "adults"
              ? "Adults"
              : key === "children"
              ? "Children"
              : "Rooms"}
          </Space>
          <Space>
            <Button
              icon={<MinusOutlined />}
              onClick={() => updateGuests(key, -1)}
              size="small"
              style={{ backgroundColor: "#f0f0f0" }}
            />
            <span style={{ margin: "0 12px" }}>{guests[key]}</span>
            <Button
              icon={<PlusOutlined />}
              onClick={() => updateGuests(key, 1)}
              size="small"
              style={{ backgroundColor: "#f0f0f0" }}
            />
          </Space>
        </div>
      ))}
    </div>
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="main-home">
      <div className={`search-home-home ${scrolled ? "scrolled" : ""}`}>
        <Card className={`search-card ${scrolled ? "scrolled-card" : ""}`}>
          <h3 className={scrolled ? "scrolled-title" : ""}>
            Search by Requirements
          </h3>
          <div className={`search-card1 ${scrolled ? "scrolled-card1" : ""}`}>
            <div
              ref={searchContainerRef}
              className={`search-container ${
                scrolled ? "scrolled-container" : ""
              }`}
            >
              <label
                className={`search-label ${scrolled ? "scrolled-label" : ""}`}
              >
                Find
              </label>
              <Input
                placeholder="City, Hotel, Destination"
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className={`input-search-home ${
                  scrolled ? "scrolled-input" : ""
                }`}
                style={{ marginBottom: showSuggestions ? 0 : 10 }}
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <List
                  className={`suggestions-list ${
                    scrolled ? "scrolled-suggestions" : ""
                  }`}
                  bordered
                  dataSource={filteredSuggestions}
                  renderItem={(item) => (
                    <List.Item
                      className={`suggestions-item ${
                        scrolled ? "scrolled-suggestion-item" : ""
                      }`}
                      onClick={() =>
                        item.key === "2-1"
                          ? navigate("/danang")
                          : handleSelectSuggestion(item)
                      }
                    >
                      <Space>
                        <EnvironmentOutlined />
                        <span>{item.name}</span>
                        <span
                          className={`country-text ${
                            scrolled ? "scrolled-country-text" : ""
                          }`}
                        >
                          {item.country}
                        </span>
                      </Space>
                    </List.Item>
                  )}
                />
              )}
            </div>

            <div
              className={`search-nav-main-home ${
                scrolled ? "scrolled-nav-main" : ""
              }`}
            >
              <div
                className={`date-picker-container ${
                  scrolled ? "scrolled-date-container" : ""
                }`}
              >
                <label
                  className={`search-label ${scrolled ? "scrolled-label" : ""}`}
                >
                  Check-in:
                </label>
                <DatePicker
                  value={dates[0]}
                  onChange={handleDateChange}
                  format="dddd, DD [thg] M YYYY"
                  suffixIcon={<CalendarOutlined />}
                  className={`custom-date-picker ${
                    scrolled ? "scrolled-date-picker" : ""
                  }`}
                />
              </div>

              <div
                className={`night-select-container ${
                  scrolled ? "scrolled-night-container" : ""
                }`}
              >
                <label
                  className={`search-label ${scrolled ? "scrolled-label" : ""}`}
                >
                  Nights:
                </label>
                <Select
                  value={nights}
                  onChange={handleNightChange}
                  suffixIcon={<ClockCircleOutlined />}
                  className={`night-select ${
                    scrolled ? "scrolled-night-select" : ""
                  }`}
                >
                  {[...Array(30).keys()].map((i) => (
                    <Select.Option key={i + 1} value={i + 1}>
                      {i + 1} night{i + 1 > 1 ? "s" : ""}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div
                className={`check-out-display ${
                  scrolled ? "scrolled-checkout" : ""
                }`}
              >
                <label
                  className={`search-label ${scrolled ? "scrolled-label" : ""}`}
                >
                  Check-out:
                </label>
                <p className={scrolled ? "scrolled-text" : ""}>
                  {dates[1].format("dddd, DD [thg] M YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`search-nav-button ${
              scrolled ? "scrolled-nav-button" : ""
            }`}
          >
            <div
              className={`guest-room-container ${
                scrolled ? "scrolled-guest-container" : ""
              }`}
            >
              <label
                className={`search-label ${scrolled ? "scrolled-label" : ""}`}
              >
                Guests and Rooms:
              </label>
              <Dropdown overlay={guestMenu} trigger={["click"]}>
                <Button
                  block
                  className={`guest-select-button ${
                    scrolled ? "scrolled-guest-button" : ""
                  }`}
                >
                  <UserOutlined />
                  {guests.adults} Adult{guests.adults > 1 ? "s" : ""},
                  {guests.children} {guests.children > 1 ? "Children" : "Child"}
                  ,{guests.rooms} {guests.rooms > 1 ? "Rooms" : "Room"}
                </Button>
              </Dropdown>
            </div>

            <Button
              type="primary"
              icon={<SearchOutlined />}
              block
              className={`search-button ${
                scrolled ? "scrolled-search-button" : ""
              }`}
            >
              Search Hotels
            </Button>
          </div>
        </Card>
      </div>
      <div
        className="img-home-main"
        style={{ position: "relative", zIndex: 1 }}
      >
        <img
          src="https://i.ibb.co/JR3qW1Qj/8.jpg"
          alt="background-main"
          className="background-main"
        />
      </div>
      <Event />
      <Should />
      <Review />
      <Foryou />
      <Contact />
      <Mapcty />
      <ScrollToTopButton showAt={1000} />
    </div>
  );
};

export default Home;
