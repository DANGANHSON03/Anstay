import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoxSearch.css";
import Select from "react-select";
import { FaMapMarkerAlt, FaBed, FaUser, FaChild } from "react-icons/fa";

interface Location {
  id: number;
  name: string;
}

interface Room {
  id: number;
  label: string;
}

const BoxSearch = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [selectedAdults, setSelectedAdults] = useState(1);
  const [selectedChildren, setSelectedChildren] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://anstay.com.vn/api/apartments");
        const data = await response.json();
        const apartmentLocations = data.map((apartment: any) => ({
          id: apartment.id,
          name: apartment.name,
        }));
        setLocations(apartmentLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();

    const fakeRooms = [
      { id: 1, label: "1 phòng" },
      { id: 2, label: "2 phòng" },
      { id: 3, label: "3 phòng" },
      { id: 4, label: "4 phòng" },
      { id: 5, label: "5 phòng" },
    ];
    setRooms(fakeRooms);
  }, []);

  const handleSearch = () => {
    if (!selectedLocation) {
      alert("Vui lòng chọn địa điểm");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      alert("Vui lòng chọn ngày đến và ngày đi");
      return;
    }
    if (!selectedRoom) {
      alert("Vui lòng chọn số phòng");
      return;
    }

    const queryParams = new URLSearchParams({
      location: selectedLocation,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      room: selectedRoom,
      adults: selectedAdults.toString(),
      children: selectedChildren.toString(),
    }).toString();

    navigate(`/search-results?${queryParams}`);
  };

  return (
    <div className="boxsearch-wrapper">
      <div className="search-item search-location">
        <FaMapMarkerAlt className="search-icon" />
        <Select
          classNamePrefix="react-select"
          options={locations.map((loc) => ({
            value: loc.name,
            label: loc.name,
          }))}
          value={
            locations
              .map((loc) => ({ value: loc.name, label: loc.name }))
              .find((opt) => opt.value === selectedLocation) || null
          }
          onChange={(opt) => setSelectedLocation(opt ? opt.value : "")}
          placeholder="Chọn địa điểm"
          isClearable
          isSearchable={false}
        />
      </div>

      {/* Ngày đến */}
      <div className="search-item search-date">
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="search-date-input"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Ngày đi */}
      <div className="search-item search-date">
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="search-date-input"
          min={checkInDate || new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="search-item">
        <FaBed className="search-icon" />
        <Select
          classNamePrefix="react-select"
          options={rooms.map((room) => ({
            value: room.id,
            label: room.label,
          }))}
          value={
            rooms
              .map((room) => ({ value: room.id, label: room.label }))
              .find((opt) => opt.value === Number(selectedRoom)) || null
          }
          onChange={(opt) => setSelectedRoom(opt ? String(opt.value) : "")}
          placeholder="Số phòng"
          isClearable
          isSearchable={false}
        />
      </div>

      {/* Người lớn */}
      <div className="search-item">
        <div className="counter-box">
          <span className="counter-icon">
            <FaUser />
          </span>
          <div className="counter-box-content">
            <button
              className="counter-btn"
              onClick={() => setSelectedAdults((prev) => Math.max(1, prev - 1))}
            >
              –
            </button>
            <span>{selectedAdults} người lớn</span>
            <button
              className="counter-btn"
              onClick={() => setSelectedAdults((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Trẻ em */}
      <div className="search-item">
        <div className="counter-box">
          <span className="counter-icon">
            <FaChild />
          </span>
          <div className="counter-box-content">
            <button
              className="counter-btn"
              onClick={() =>
                setSelectedChildren((prev) => Math.max(0, prev - 1))
              }
            >
              –
            </button>
            <span>{selectedChildren} trẻ em</span>
            <button
              className="counter-btn"
              onClick={() => setSelectedChildren((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button className="search-button1" onClick={handleSearch}>
        Tìm phòng
      </button>
    </div>
  );
};

export default BoxSearch;
