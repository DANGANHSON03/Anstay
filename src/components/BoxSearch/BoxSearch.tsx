import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BoxSearch.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBed,
  FaUser,
  FaChild,
  FaSearch,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

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
  const [showAdultSelector, setShowAdultSelector] = useState(false);
  const [showChildSelector, setShowChildSelector] = useState(false);

  const adultSelectorRef = useRef<HTMLDivElement>(null);
  const childSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fakeLocations = [
      { id: 1, name: "SAZIHOME LÊ THÁNH TÔNG" },
      { id: 2, name: "SAZIHOME NGUYỄN DU" },
    ];
    const fakeRooms = [
      { id: 1, label: "1 phòng" },
      { id: 2, label: "2 phòng" },
    ];

    setLocations(fakeLocations);
    setRooms(fakeRooms);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        adultSelectorRef.current &&
        !adultSelectorRef.current.contains(event.target as Node)
      ) {
        setShowAdultSelector(false);
      }
      if (
        childSelectorRef.current &&
        !childSelectorRef.current.contains(event.target as Node)
      ) {
        setShowChildSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIncrement = (type: "adult" | "child") => {
    if (type === "adult" && selectedAdults < 4) {
      setSelectedAdults((prev) => prev + 1);
    } else if (type === "child" && selectedChildren < 2) {
      setSelectedChildren((prev) => prev + 1);
    }
  };

  const handleDecrement = (type: "adult" | "child") => {
    if (type === "adult" && selectedAdults > 1) {
      setSelectedAdults((prev) => prev - 1);
    } else if (type === "child" && selectedChildren > 0) {
      setSelectedChildren((prev) => prev - 1);
    }
  };

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

    const searchParams = {
      location: selectedLocation,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      room: selectedRoom,
      adults: selectedAdults,
      children: selectedChildren,
    };

    navigate("/search-results", { state: searchParams });
  };

  return (
    <div className="boxsearch-wrapper">
      <div className="search-item search-location">
        <FaMapMarkerAlt className="search-icon" />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Chọn địa điểm</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="search-item search-date">
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        className="search-date-input"
        min={new Date().toISOString().split("T")[0]}
      />
    </div>

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
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Số phòng</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.label}
            </option>
          ))}
        </select>
      </div>

      <div className="search-item" ref={adultSelectorRef}>
        <FaUser className="search-icon" />
        <div
          className="counter-select"
          onClick={() => setShowAdultSelector(!showAdultSelector)}
        >
          {selectedAdults} người lớn
          {showAdultSelector && (
            <div className="counter-controls">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement("adult");
                }}
              >
                <FaMinus />
              </button>
              <span>{selectedAdults}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement("adult");
                }}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="search-item" ref={childSelectorRef}>
        <FaChild className="search-icon" />
        <div
          className="counter-select"
          onClick={() => setShowChildSelector(!showChildSelector)}
        >
          {selectedChildren} trẻ em
          {showChildSelector && (
            <div className="counter-controls">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement("child");
                }}
              >
                <FaMinus />
              </button>
              <span>{selectedChildren}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement("child");
                }}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>

      <button className="search-button1" onClick={handleSearch}>
        Tìm phòng
      </button>
    </div>
  );
};

export default BoxSearch;
