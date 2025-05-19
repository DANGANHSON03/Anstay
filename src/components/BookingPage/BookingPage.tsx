import React from "react";
import "./BookingPage.css";

const BookingPage = () => {
  const apartment = {
    name: "CĂN BỐN TẮM GỖ",
    address:
      "Số 9, Ngõ 6, Đường Lê Thánh Tông, Quận Hoàn Kiếm, Hà Nội, Việt Nam",
    checkIn: "15/05/2025",
    checkOut: "18/05/2025",
    guests: {
      adults: 2,
      children: 0,
      babies: 0,
    },
    price: 471800,
  };

  return (
    <div className="booking-page">
      <p className="expire-warning">
        Đặt phòng của bạn sẽ không còn hiệu lực sau <strong>07:04</strong>
      </p>

      <div className="booking-grid">
        {/* Cột trái */}
        <div className="booking-left">
          <section className="card hotel-info">
            <h3>SAZIHOME LÊ THÁNH TÔNG - HÀ NỘI</h3>
            <h4 style={{ margin: "6px 0", fontWeight: "normal" }}>
              {apartment.name}
            </h4>
            <p>{apartment.address}</p>

            <div className="summary-box">
              <p>
                <strong>
                  {apartment.guests.adults} người lớn,{" "}
                  {apartment.guests.children} trẻ em, {apartment.guests.babies}{" "}
                  em bé
                </strong>
              </p>
              <p>Ngày nhận phòng: {apartment.checkIn}</p>
              <p>Ngày trả phòng: {apartment.checkOut}</p>
            </div>
          </section>
        </div>

        {/* Cột phải */}
        <div className="booking-right">
          <section className="card customer-form">
            <h4>Thông tin của bạn</h4>
            <input type="text" placeholder="Họ và tên*" />
            <input type="text" placeholder="📞 Số điện thoại" />
            <input type="email" placeholder="📧 Email*" />
            <input type="text" placeholder="🪪 CMND / Hộ chiếu" />
            <input type="date" placeholder="Ngày sinh" />
            <select>
              <option>Việt Nam</option>
              <option>Quốc tịch khác</option>
            </select>
          </section>
        </div>
      </div>

      {/* Phần thanh toán toàn chiều rộng */}
      <div className="payment-section card">
        <h4>Thông tin thanh toán</h4>
        <table>
          <thead>
            <tr>
              <th>Chi tiết</th>
              <th>Giá (₫)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phòng 1: {apartment.name}</td>
              <td>{apartment.price.toLocaleString()}</td>
            </tr>
            <tr>
              <td>1 người lớn đã thêm</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>

        <div className="payment-button">
          <button className="btn-pay">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
