import React, { useState, useEffect } from "react";
import "./Hiden.css";
import { useParams } from "react-router-dom";

function Hiden() {
  const { apartment } = useParams();
  const normalizedApartment = apartment?.trim();

  const [openTabs, setOpenTabs] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showVideo, setShowVideo] = useState(false);
  const [showImg, setShowImg] = useState<"A" | "B">("B");
  const [Clicked, setClicked] = useState(true);

  const getVideoUrl = (sectionId) => {
    const videos = {
      "1": "/videos/huong-dan-mo.mp4",
      "2-1": "/videos/huong-dan-bat-dien.mp4",
      "2-2": "/videos/huong-dan-bep.mp4",
      "2-3": "/videos/may-giat.mp4",
      "2-4": "/videos/sudungnuocnong.mp4", //video bình nước nóng chưa co
      "3": "/videos/huong-dan-thang-may.mp4",
      "4": "/videos/nv16.mp4",
      "8-1": "/videos/sudungnuocnong.mp4", // video bồn tắm
      "8-2": "/videos/keodemcua.mp4", // video rèm điện
      "8-3": "", //video hướng dẫn sửa tv
      "9": "/videos/thoathiem.mp4", //video thang thoát hiểm
      "11": "/videos/dorac.mp4", //video phòng đổ rác
    };
    return videos[sectionId] || "";
  };
  const handleClick = () => {
    setClicked(!Clicked);
  };

  const getDoorCode = (apartment) => {
    if (!apartment) return "không có mã";
    const normalizedApartment = apartment.toUpperCase();
    const doorCodes = {
      B516: "737373#",
      B712: "919191#",
      B802: "828282#",
      B901: "919191#",
      B1006: "828282#",
      B1114: "919191#",
      A1509: "Thẻ",
      B1904: "737373#",
      B2006: "828282#",
      B2112: "828282#",
      B2105: "919191#",
      B2106: "393939#",
      B2205: "828282#",
      B2806: "828282#",
      B2811: "828282#",
      B2907: "919191#",
      B3406: "53397647#",
      B3409: "81384700#",
      B3509: "61956091#",
    };
    return doorCodes[normalizedApartment] || "8668";
  };

  const languagesTab = {
    vi: {
      label: "Tiếng Việt",
      image:
        "https://i.ibb.co/8gwnhXNq/z6529289427842-586904014edb822f940b80aae6f5681a.jpg",
    },
    en: {
      label: "English",
      image:
        "https://i.ibb.co/RGMYDynD/z6529289444099-805fa915dbdc9b5509ad1b0f26163c5c.jpg",
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const SHEET_ID = "1W4VT3LIzFtgcW0-_k25zjgLKQMr828ic44mmdCCfi9I";
        const SHEET_NAME = "Event";
        const API_KEY = "AIzaSyCt-Q3stzkgRvpliLFuwhyy2uvF8hXHzfc";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const formattedEvents = data.values.slice(1).map((row) => ({
            title: row[0],
            date: row[1],
            location: row[2],
            description: row[3],
            imageUrl: row[4],
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [events.length]);
  useEffect(() => {
    Object.values(languagesTab).forEach((lang) => {
      const img = new Image();
      img.src = lang.image;
    });
  }, []);

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const toggleTab = (tabId) => {
    setOpenTabs((prev) => {
      if (prev.includes(tabId)) {
        return prev.filter((id) => id !== tabId);
      }
      return [...prev, tabId];
    });
  };

  const isTabOpen = (tabId) => {
    return openTabs.includes(tabId);
  };

  return (
    <div className="guide-container-Hiden">
      <h2 className="guide-title-Hiden">Hướng Dẫn Du Lịch</h2>
      <div
        className="door-password-section"
        style={{
          marginBottom: "10px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            marginBottom: "10px",
            color: "#333",
            fontSize: "35px",
            textTransform: "uppercase",
          }}
        >
          Mật khẩu cửa phòng {normalizedApartment} :{" "}
          {getDoorCode(normalizedApartment)}
        </h2>
        <p style={{ color: "#666", fontStyle: "italic" }}>
          Vui lòng không chia sẻ mật khẩu với người khác !!!
        </p>
      </div>

      <div className="accordion-Hiden">
        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(1)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(1)}
          >
            Hướng dẫn mở cửa
          </button>
          {isTabOpen(1) && (
            <div className="accordion-content-Hiden">
              <div className="guide-button-open">
                <button
                  onClick={() => {
                    setShowImg("B");
                    handleClick();
                  }}
                  className={Clicked ? "active2" : ""}
                >
                  Tòa A
                </button>
                <button
                  onClick={() => {
                    setShowImg("A");
                    handleClick();
                  }}
                  className={!Clicked ? "active2" : ""}
                >
                  Tòa B
                </button>
              </div>
              {showImg === "A" && (
                <img
                  src="https://i.ibb.co/ccWfmNb4/z6619229521484-9f0e843b4a1ea0c54dc0ec51438160aa.jpg"
                  alt="Hướng dẫn mở cửa bằng mật khẩu"
                  className="guide-image-Hiden"
                />
              )}
              {showImg === "B" && (
                <img
                  src="https://i.ibb.co/VcSJVQVr/z6619229521564-70e04130a1408101f50d612fcee5dfd7.jpg"
                  alt=""
                  className="guide-image-Hiden"
                />
              )}
              {/* <button
                onClick={() => setShowPopup("1")}
                className="guide-button-Hiden"
              >
                Xem hướng dẫn
              </button> */}
            </div>
          )}
        </div>

        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(2)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(2)}
          >
            Hướng dẫn Bật Điện-Bếp-Máy Giặt- Bình Nóng Lạnh
          </button>
          {isTabOpen(2) && (
            <div className="accordion-content-Hiden">
              <div className="sub-accordion-Hiden">
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-1");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("2-1")}
                  >
                    Hướng dẫn bật điện
                  </button>
                  {isTabOpen("2-1") && (
                    <div className="sub-accordion-content-Hiden">
                      <p>- Công tắc điện chính nằm bên cạnh cửa ra vào</p>
                      <p>- Bật cầu dao tổng (nếu cần)</p>
                      <p>- Kiểm tra các thiết bị điện hoạt động</p>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-2");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("2-2")}
                  >
                    Hướng dẫn sử dụng bếp
                  </button>
                  {isTabOpen("2-2") && (
                    <div className="sub-accordion-content-Hiden">
                      <p>- Bếp từ: Nhấn nút nguồn để bật</p>
                      <p>- Điều chỉnh nhiệt độ phù hợp (mức 1-9)</p>
                      <p>- Lưu ý vệ sinh bếp sau khi sử dụng</p>
                      <button
                        onClick={() => setShowPopup("2-2")}
                        className="guide-button-Hiden"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-3");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("2-3")}
                  >
                    Hướng dẫn sử dụng máy giặt
                  </button>
                  {isTabOpen("2-3") && (
                    <div className="sub-accordion-content-Hiden">
                      <img
                        src="https://i.ibb.co/3y7TNhd6/maygiat.jpg"
                        alt="Hướng dẫn sử dụng máy giặt"
                        className="guide-image-Hiden"
                      />
                      <button
                        onClick={() => setShowPopup("2-3")}
                        className="guide-button-Hiden"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("2-4");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("2-4")}
                  >
                    Hướng dẫn sử dụng bình nước nóng
                  </button>
                  {isTabOpen("2-4") && (
                    <div className="sub-accordion-content-Hiden">
                      <p>- Bật lên và chờ 30 phút </p>
                      <img
                        src="https://i.ibb.co/ZRywD02k/2.jpg"
                        alt=""
                        className="guide-image-Hiden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(8)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(8)}
          >
            Hướng dẫn sử dụng thiết bị điện
          </button>
          {isTabOpen(8) && (
            <div className="accordion-content-Hiden">
              <div className="sub-accordion-Hiden">
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("8-1");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("8")}
                  >
                    Hướng dẫn sử dụng bồn tắm
                  </button>
                  {isTabOpen("8-1") && (
                    <div className="sub-accordion-content-Hiden">
                      <button
                        onClick={() => setShowPopup("8-1")}
                        className="guide-button-Hiden"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("8-2");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("8")}
                  >
                    Hướng dẫn sử dụng rèm điện <span>(Chỉ có bên tòa A)</span>
                  </button>
                  {isTabOpen("8-2") && (
                    <div className="sub-accordion-content-Hiden">
                      <button
                        onClick={() => setShowPopup("8-2")}
                        className="guide-button-Hiden"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div>

                {/* <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("8-3");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("8")}
                  >
                    Hướng dẫn sửa lỗi TV
                  </button>
                  {isTabOpen("8-3") && (
                    <div className="sub-accordion-content-Hiden">
                      <button
                        onClick={() => setShowPopup("8-3")}
                        className="guide-button-Hiden"
                      >
                        Xem hướng dẫn chi tiết
                      </button>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          )}
        </div>
        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(7)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(7)}
          >
            Thông tin Wi-Fi
          </button>
          {isTabOpen(7) && (
            <div className="accordion-content-Hiden">
              <div className="wifi-info-Hiden">
                <div className="wifi-credential-Hiden">
                  <p className="wifi-label-Hiden">Tên Wi-Fi:</p>
                  <p className="wifi-value-Hiden">
                    Welcome to Anstay - {apartment?.toUpperCase()}
                  </p>
                </div>
                <div className="wifi-credential-Hiden">
                  <p className="wifi-label-Hiden">Mật khẩu:</p>
                  <p className="wifi-value-Hiden">Anstaycamon</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(3)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(3)}
          >
            Hướng dẫn đi thang máy
          </button>
          {isTabOpen(3) && (
            <div className="accordion-content-Hiden">
              <p>- Quẹt thẻ từ trước khi chọn tầng</p>
              <p>- Nút khẩn cấp màu đỏ trong trường hợp cần hỗ trợ</p>
              <button
                onClick={() => setShowPopup("3")}
                className="guide-button-Hiden"
              >
                Xem hướng dẫn sử dụng
              </button>
            </div>
          )}
        </div>
        <div className="accordion-item-Hiden">
          <button
            className="accordion-header-Hiden"
            onClick={() => toggleTab(9)}
            aria-expanded={isTabOpen(9)}
          >
            Hướng dẫn sử dụng thang thoát hiểm
          </button>
          {isTabOpen(9) && (
            <div className="accordion-content-Hiden">
              <p>- Không cần thẻ để sử dụng</p>
              <button
                onClick={() => setShowPopup("9")}
                className="guide-button-Hiden"
              >
                Xem hướng dẫn sử dụng
              </button>
            </div>
          )}
        </div>
        <div className="accordion-item-Hiden">
          <button
            className="accordion-header-Hiden"
            onClick={() => toggleTab(11)}
            aria-expanded={isTabOpen(11)}
          >
            Hướng dẫn tìm phòng đổ rác
          </button>
          {isTabOpen(11) && (
            <div className="accordion-content-Hiden">
              <p>- Không cần thẻ để sử dụng</p>
              <button
                onClick={() => setShowPopup("11")}
                className="guide-button-Hiden"
              >
                Xem hướng dẫn sử dụng
              </button>
            </div>
          )}
        </div>

        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(4)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(4)}
          >
            Thông tin lưu ý khi lưu trú
          </button>
          {isTabOpen(4) && (
            <div className="accordion-content-Hiden">
              <p>
                <strong>Quy định chung:</strong>
              </p>
              <p>- Giờ nhận phòng: 15:00, trả phòng: 12:00</p>
              <p>- Không hút thuốc trong căn hộ</p>
              <p>- Không gây ồn sau 22:00</p>
              <p>
                - Không nấu đồ hải sản, không sử dụng mắm tôm sầu riêng trong
                phòng
              </p>
              <p>- Không làm bẩn sofa</p>
              <p>- Nghiêm cấm sử dụng chất trái phép ma túy</p>
              <p>- Không xả rác xuống cống, bồn cầu, bồn rửa bát</p>
              <p>
                <p>
                  <span>VI PHẠM PHẠT 500.000đ</span>
                </p>
                <p>
                  - Trong thời gian lưu trú thêm khăn tắm, túi rác vui lòng liên
                  hệ với lễ tân để được hỗ trợ miễn phí.
                </p>
                <strong>An toàn:</strong>
              </p>
              <p>- Kiểm tra đã khóa cửa khi ra ngoài</p>
              <p>- Tắt các thiết bị điện khi không sử dụng</p>
              <strong>Liên hệ :</strong>
              <p>
                +84 84 227 2772 ( lễ tân ) <br />
                <span>Hỗ trợ giải đáp thắc mắc trong thời gian lưu trú</span>
              </p>
              <p>
                +84 38 494 5614 (CSKH) <br />
                <span>
                  Tiếp nhận/phản ánh khiếu nại từ khách hàng trong thời gian lưu
                  trú
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(5)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(5)}
          >
            Thông tin thiết bị và mức giá
          </button>
          {isTabOpen(5) && (
            <div className="accordion-content-Hiden">
              <div className="sub-accordion-Hiden">
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-1");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("5-1")}
                  >
                    Bảng Đồ Sành Sứ
                  </button>
                  {isTabOpen("5-1") && (
                    <div className="sub-accordion-content-Hiden">
                      <table className="compensation-table-Hiden">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Giá đền bù (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Bát ăn cơm</td>
                            <td>1</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Gạt tàn sứ</td>
                            <td>1</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Đĩa tròn F20</td>
                            <td>1</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Đĩa tròn F25</td>
                            <td>1</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Đĩa kê tách trà</td>
                            <td>1</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Tô canh</td>
                            <td>1</td>
                            <td>95,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Bát chấm</td>
                            <td>1</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Thìa soup</td>
                            <td>1</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Thìa café nhỏ</td>
                            <td>1</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Dao ăn</td>
                            <td>1</td>
                            <td>110,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Dĩa ăn</td>
                            <td>1</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Đũa ăn</td>
                            <td>Đôi</td>
                            <td>15,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Ly đặt phòng</td>
                            <td>1</td>
                            <td>145,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Tách trà</td>
                            <td>1</td>
                            <td>65,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Muôi múc canh</td>
                            <td>1</td>
                            <td>60,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Chảo chống dính</td>
                            <td>1</td>
                            <td>340,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Bộ xoong nồi inox</td>
                            <td>1</td>
                            <td>980,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Nồi cơm điện</td>
                            <td>1</td>
                            <td>950,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Thớt nhựa trong phòng CH</td>
                            <td>1</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Thớt gỗ trong phòng CH</td>
                            <td>1</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Bộ gia vị đựng trong phòng</td>
                            <td>Bộ</td>
                            <td>205,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Dao thái 22cm</td>
                            <td>1</td>
                            <td>255,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Dao thái 24cm</td>
                            <td>1</td>
                            <td>120,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Xẻng nấu ăn</td>
                            <td>1</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>Kéo nấu ăn trong phòng căn hộ</td>
                            <td>1</td>
                            <td>70,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>Rổ nhựa</td>
                            <td>1</td>
                            <td>80,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Giỏ máy đặt phòng</td>
                            <td>1</td>
                            <td>190,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-2");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("5-2")}
                  >
                    Ceramic Tableware Price List
                  </button>
                  {isTabOpen("5-2") && (
                    <div className="sub-accordion-content-Hiden">
                      <table className="compensation-table-Hiden">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Giá đền bù (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Bowl</td>
                            <td>Chiếc</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Porcelain ashtray</td>
                            <td>Chiếc</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Round disc F20</td>
                            <td>Chiếc</td>
                            <td>55,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Round disc F25</td>
                            <td>Chiếc</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>A plate with a cup of tea</td>
                            <td>Chiếc</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Bowl of soup</td>
                            <td>Chiếc</td>
                            <td>95,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Dipping bowl</td>
                            <td>Chiếc</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Soup spoon</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Small coffee spoon</td>
                            <td>Chiếc</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Eating knife</td>
                            <td>Chiếc</td>
                            <td>110,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Plate</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Chopsticks</td>
                            <td>Đôi</td>
                            <td>15,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Ly made a reservation</td>
                            <td>Chiếc</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Teacup</td>
                            <td>Chiếc</td>
                            <td>65,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Soup ladle</td>
                            <td>Chiếc</td>
                            <td>60,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Non-stick pan</td>
                            <td>Chiếc</td>
                            <td>340,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Stainless steel pots and pans set</td>
                            <td>Chiếc</td>
                            <td>980,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Electric cooker</td>
                            <td>Chiếc</td>
                            <td>950,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Plastic cutting board in CH room</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Wooden cutting board in CH's room</td>
                            <td>Chiếc</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Spice set in the room</td>
                            <td>Bộ</td>
                            <td>205,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Máy sấy tóc</td>
                            <td>1</td>
                            <td>254,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Điện thoại bàn</td>
                            <td>1</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Key phòng</td>
                            <td>1</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>Tivi 40 inch</td>
                            <td>1</td>
                            <td>6,410,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>Tivi 45 inch</td>
                            <td>1</td>
                            <td>8,114,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Ghế sofa đôi (1.6m or 1.8m)</td>
                            <td>1</td>
                            <td>7,000,000</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>Gối ghế sofa</td>
                            <td>1</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>Ghế gỗ đơn</td>
                            <td>1</td>
                            <td>1,500,000</td>
                          </tr>
                          <tr>
                            <td>30</td>
                            <td>Bàn gỗ tròn</td>
                            <td>1</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>31</td>
                            <td>Mặt kính</td>
                            <td>1</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>32</td>
                            <td>Khăn chân (45*80)</td>
                            <td>1</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>33</td>
                            <td>Khăn mặt (34*34)</td>
                            <td>1</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>34</td>
                            <td>Khăn tắm (70*90)</td>
                            <td>1</td>
                            <td>184,000</td>
                          </tr>
                          <tr>
                            <td>35</td>
                            <td>Giỏ mây</td>
                            <td>1</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>36</td>
                            <td>Đèn chụp</td>
                            <td>1</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>37</td>
                            <td>Đèn cây</td>
                            <td>1</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>38</td>
                            <td>Tranh treo tường (70*90)</td>
                            <td>1</td>
                            <td>485,000</td>
                          </tr>
                          <tr>
                            <td>39</td>
                            <td>Tranh treo tường (45*45)</td>
                            <td>1</td>
                            <td>690,000</td>
                          </tr>
                          <tr>
                            <td>40</td>
                            <td>Tranh treo tường (40*40)</td>
                            <td>1</td>
                            <td>450,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-3");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("5-3")}
                  >
                    Compensation Price List
                  </button>
                  {isTabOpen("5-3") && (
                    <div className="sub-accordion-content-Hiden">
                      <table className="compensation-table-Hiden">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Loại vật dụng (Species)</th>
                            <th>Kích thước (Size)</th>
                            <th>Giá (C&B) (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>BED 110*200 (Shafts 3,5,11,12)</td>
                            <td>110*200</td>
                            <td>250,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Mattress protection</td>
                            <td>190*280</td>
                            <td>380,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Sheets</td>
                            <td>180*235</td>
                            <td>700,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Quilt cover</td>
                            <td>180*235</td>
                            <td>760,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Blanket intestines</td>
                            <td>180*235</td>
                            <td>765,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>BED 160*200 (Axis 8,9,10)</td>
                            <td>160*200</td>
                            <td>340,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Mattress protection</td>
                            <td>230*235</td>
                            <td>815,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Quilt cover</td>
                            <td>230*235</td>
                            <td>890,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Blanket intestines</td>
                            <td>230*235</td>
                            <td>890,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>BED 180*200 (Axis 1,2,6,7)</td>
                            <td>180*200</td>
                            <td>320,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Mattress protection</td>
                            <td>180*200</td>
                            <td>320,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Sheets</td>
                            <td>260*280</td>
                            <td>490,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Quilt cover</td>
                            <td>250*235</td>
                            <td>925,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Pillowcase</td>
                            <td>50*70</td>
                            <td>90,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Blanket intestines</td>
                            <td>250*235</td>
                            <td>960,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Gut pillow</td>
                            <td>50*70</td>
                            <td>210,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Pillowcase</td>
                            <td>60*80</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Gut pillow</td>
                            <td>60*80</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Swimsuit</td>
                            <td>-</td>
                            <td>435,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>BED 220*200 (paired 3,5,11,12)</td>
                            <td>200*200</td>
                            <td>365,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Mattress protection</td>
                            <td>200*200</td>
                            <td>365,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Sheets</td>
                            <td>300*280</td>
                            <td>575,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Quilt cover</td>
                            <td>290*235</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Blanket intestines</td>
                            <td>290*235</td>
                            <td>1,115,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-4");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("5-4")}
                  >
                    Bảng Đồ Công Cụ Dụng Cụ
                  </button>
                  {isTabOpen("5-4") && (
                    <div className="sub-accordion-content-Hiden">
                      <table className="compensation-table-Hiden">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Giá đền bù (VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Thùng rác trong phòng (sắt)</td>
                            <td>1</td>
                            <td>329,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Thùng rác trong phòng (da)</td>
                            <td>1</td>
                            <td>366,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Khay đựng Minibar</td>
                            <td>1</td>
                            <td>569,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Khay đựng trà/café</td>
                            <td>1</td>
                            <td>283,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Khay đựng Amenities</td>
                            <td>1</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Bìa da phục vụ phòng</td>
                            <td>1</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Bìa da note pad</td>
                            <td>1</td>
                            <td>195,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Bìa da thu ngân</td>
                            <td>1</td>
                            <td>302,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Bìa da menu</td>
                            <td>1</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Hộp giấy ăn</td>
                            <td>1</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Biển treo cửa đa</td>
                            <td>1</td>
                            <td>165,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Đồng hồ để bàn</td>
                            <td>1</td>
                            <td>473,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Đĩa đựng xà bông (màu đen)</td>
                            <td>1</td>
                            <td>50,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>Điều khiển tivi</td>
                            <td>1</td>
                            <td>300,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Điều khiển điều hòa</td>
                            <td>1</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Đèn bàn làm việc</td>
                            <td>1</td>
                            <td>245,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Đèn ngủ phòng khách</td>
                            <td>1</td>
                            <td>403,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Đèn cây trong phòng</td>
                            <td>1</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Móc treo quần áo gỗ</td>
                            <td>1</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Móc treo quần áo có kẹp</td>
                            <td>1</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Ấm siêu tốc</td>
                            <td>1</td>
                            <td>194,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Máy sấy tóc</td>
                            <td>1</td>
                            <td>254,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Landline</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Room key</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>40 inch TV</td>
                            <td>Chiếc</td>
                            <td>6,410,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>45 inch TV</td>
                            <td>Chiếc</td>
                            <td>8,114,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Double sofa (1.6m or 1.8m)</td>
                            <td>Chiếc</td>
                            <td>7,000,000</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>Sofa pillow</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>Single wooden chair</td>
                            <td>Chiếc</td>
                            <td>1,500,000</td>
                          </tr>
                          <tr>
                            <td>30</td>
                            <td>Round wooden table</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>31</td>
                            <td>Glass surface</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>32</td>
                            <td>Foot towel (45*80)</td>
                            <td>Chiếc</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>33</td>
                            <td>Washcloth (34*34)</td>
                            <td>Chiếc</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>34</td>
                            <td>Towel (70*90)</td>
                            <td>Chiếc</td>
                            <td>184,000</td>
                          </tr>
                          <tr>
                            <td>35</td>
                            <td>Basket</td>
                            <td>Chiếc</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>36</td>
                            <td>Lamp</td>
                            <td>Chiếc</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>37</td>
                            <td>Tree lights</td>
                            <td>Chiếc</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>38</td>
                            <td>Wall painting (70*90)</td>
                            <td>Chiếc</td>
                            <td>485,000</td>
                          </tr>
                          <tr>
                            <td>39</td>
                            <td>Wall painting (45*45)</td>
                            <td>Chiếc</td>
                            <td>690,000</td>
                          </tr>
                          <tr>
                            <td>40</td>
                            <td>Wall painting (40*40)</td>
                            <td>Chiếc</td>
                            <td>450,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("5-5");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("5-5")}
                  >
                    Example Tool Map
                  </button>
                  {isTabOpen("5-5") && (
                    <div className="sub-accordion-content-Hiden">
                      <table className="compensation-table-Hiden">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>SẢN PHẨM</th>
                            <th>ĐƠN VỊ</th>
                            <th>GIÁ ĐỀN BÙ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Trash can in room (iron)</td>
                            <td>Chiếc</td>
                            <td>329,000</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>In-room trash can (leather)</td>
                            <td>Chiếc</td>
                            <td>366,000</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Minibar tray</td>
                            <td>Chiếc</td>
                            <td>569,000</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Tea/coffee tray</td>
                            <td>Chiếc</td>
                            <td>283,000</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Amenities tray</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Leather cover for room service</td>
                            <td>Chiếc</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Note pad leather cover</td>
                            <td>Chiếc</td>
                            <td>195,000</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Cashier leather cover</td>
                            <td>Chiếc</td>
                            <td>302,000</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Menu leather cover</td>
                            <td>Chiếc</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>Tissue box</td>
                            <td>Chiếc</td>
                            <td>344,000</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>Leather door hanging sign</td>
                            <td>Chiếc</td>
                            <td>165,000</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>Clocks</td>
                            <td>Chiếc</td>
                            <td>473,000</td>
                          </tr>
                          <tr>
                            <td>13</td>
                            <td>Soap dish (black)</td>
                            <td>Chiếc</td>
                            <td>50,000</td>
                          </tr>
                          <tr>
                            <td>14</td>
                            <td>TV remote control</td>
                            <td>Chiếc</td>
                            <td>300,000</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>Air-conditioner remote control</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>16</td>
                            <td>Desk lamp</td>
                            <td>Chiếc</td>
                            <td>245,000</td>
                          </tr>
                          <tr>
                            <td>17</td>
                            <td>Living room night light</td>
                            <td>Chiếc</td>
                            <td>403,000</td>
                          </tr>
                          <tr>
                            <td>18</td>
                            <td>Tree lights in the room</td>
                            <td>Chiếc</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>19</td>
                            <td>Wooden clothes hanger</td>
                            <td>Chiếc</td>
                            <td>30,000</td>
                          </tr>
                          <tr>
                            <td>20</td>
                            <td>Clothes hanger with clips</td>
                            <td>Chiếc</td>
                            <td>25,000</td>
                          </tr>
                          <tr>
                            <td>21</td>
                            <td>Super tepid</td>
                            <td>Chiếc</td>
                            <td>194,000</td>
                          </tr>
                          <tr>
                            <td>22</td>
                            <td>Hairdryer</td>
                            <td>Chiếc</td>
                            <td>254,000</td>
                          </tr>
                          <tr>
                            <td>23</td>
                            <td>Landline</td>
                            <td>Chiếc</td>
                            <td>200,000</td>
                          </tr>
                          <tr>
                            <td>24</td>
                            <td>Room key</td>
                            <td>Chiếc</td>
                            <td>100,000</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>40 inch TV</td>
                            <td>Chiếc</td>
                            <td>6,410,000</td>
                          </tr>
                          <tr>
                            <td>26</td>
                            <td>45 inch TV</td>
                            <td>Chiếc</td>
                            <td>8,114,000</td>
                          </tr>
                          <tr>
                            <td>27</td>
                            <td>Double sofa (1.6m or 1.8m)</td>
                            <td>Chiếc</td>
                            <td>7,000,000</td>
                          </tr>
                          <tr>
                            <td>28</td>
                            <td>Sofa pillow</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>29</td>
                            <td>Single wooden chair</td>
                            <td>Chiếc</td>
                            <td>1,500,000</td>
                          </tr>
                          <tr>
                            <td>30</td>
                            <td>Round wooden table</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>31</td>
                            <td>Glass surface</td>
                            <td>Chiếc</td>
                            <td>1,000,000</td>
                          </tr>
                          <tr>
                            <td>32</td>
                            <td>Foot towel (45*80)</td>
                            <td>Chiếc</td>
                            <td>140,000</td>
                          </tr>
                          <tr>
                            <td>33</td>
                            <td>Washcloth (34*34)</td>
                            <td>Chiếc</td>
                            <td>45,000</td>
                          </tr>
                          <tr>
                            <td>34</td>
                            <td>Towel (70*90)</td>
                            <td>Chiếc</td>
                            <td>184,000</td>
                          </tr>
                          <tr>
                            <td>35</td>
                            <td>Basket</td>
                            <td>Chiếc</td>
                            <td>190,000</td>
                          </tr>
                          <tr>
                            <td>36</td>
                            <td>Lamp</td>
                            <td>Chiếc</td>
                            <td>405,000</td>
                          </tr>
                          <tr>
                            <td>37</td>
                            <td>Tree lights</td>
                            <td>Chiếc</td>
                            <td>1,015,000</td>
                          </tr>
                          <tr>
                            <td>38</td>
                            <td>Wall painting (70*90)</td>
                            <td>Chiếc</td>
                            <td>485,000</td>
                          </tr>
                          <tr>
                            <td>39</td>
                            <td>Wall painting (45*45)</td>
                            <td>Chiếc</td>
                            <td>690,000</td>
                          </tr>
                          <tr>
                            <td>40</td>
                            <td>Wall painting (40*40)</td>
                            <td>Chiếc</td>
                            <td>450,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(6)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(6)}
          >
            Sơ đồ khách sạn
          </button>
          {isTabOpen(6) && (
            <div className="accordion-content-Hiden">
              <div className="hotel-map-Hiden">
                <div className="floor-plan-Hiden">
                  <div className="floor-level-Hiden">
                    <h3>Ảnh sơ đồ khách sạn</h3>
                    <div className="floor-areas-Hiden">
                      <img
                        style={{ width: "70vw" }}
                        src="https://i.ibb.co/HfPXRbX9/image-1.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="floor-level-Hiden">
                    <h3>Tầng hầm (B1–B2)</h3>
                    <div className="floor-areas-Hiden">
                      <div className="area-Hiden">
                        Bãi đỗ xe: Dành cho cư dân và khách lưu trú
                      </div>
                      <div className="area-Hiden">
                        Khu kỹ thuật: Bao gồm hệ thống điện, nước, và an ninh
                      </div>
                    </div>
                  </div>

                  <div className="floor-level-Hiden">
                    <h3>Tầng trệt (Tầng 1)</h3>
                    <div className="floor-areas-Hiden">
                      <div className="area-Hiden">
                        Sảnh lễ tân: Khu vực tiếp đón khách với không gian sang
                        trọng
                      </div>
                      <div className="area-Hiden">
                        Quầy lễ tân: Nơi làm thủ tục nhận và trả phòng
                      </div>
                      <div className="area-Hiden">
                        Khu vực chờ: Ghế ngồi thoải mái cho khách chờ
                      </div>
                      <div className="area-Hiden">
                        Khu vực bảo vệ: Đảm bảo an ninh 24/7
                      </div>
                    </div>
                  </div>

                  <div className="floor-level-Hiden">
                    <h3>Tầng 2–5</h3>
                    <div className="floor-areas-Hiden">
                      <div className="area-Hiden">
                        Phòng họp và hội nghị: Trang bị đầy đủ thiết bị hiện đại
                      </div>
                      <div className="area-Hiden">
                        Phòng gym: Khu vực tập luyện thể dục thể thao
                      </div>
                      <div className="area-Hiden">
                        <span> Tầng 3: khu vui chơi trẻ em (Free)</span>
                      </div>
                      <div className="area-Hiden">
                        Khu vực sinh hoạt chung: Không gian thư giãn và giao lưu
                      </div>
                    </div>
                  </div>

                  <div className="floor-level-Hiden">
                    <h3>Tầng 40 (Tầng mái)</h3>
                    <div className="floor-areas-Hiden">
                      <div className="area-Hiden">
                        Hồ bơi vô cực: Nằm trên tầng cao nhất với tầm nhìn bao
                        quát Vịnh Hạ Long
                      </div>
                      <div className="area-Hiden">
                        Sky Bar: Quầy bar ngoài trời, phục vụ đồ uống và tổ chức
                        sự kiện
                      </div>
                      <div className="area-Hiden">
                        Khu vực thư giãn: Ghế nằm và không gian xanh để nghỉ
                        ngơi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(10)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(10)}
          >
            Nhóm hỗ trợ thuê xe máy, ăn uống ship 24/24
          </button>
          {isTabOpen(10) && (
            <div className="accordion-content-Hiden">
              <div className="sub-accordion-Hiden">
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("10-1");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("10-1")}
                  >
                    Bạn cần xe để di chuyển ?
                  </button>
                  {isTabOpen("10-1") && (
                    <div className="sub-accordion-content-Hiden">
                      <p>Zalo/Whatsapp: 0936.486.890</p>
                      <p>Số điện thoại: 0982.461.015</p>
                      <img
                        style={{ width: "74vw" }}
                        src="https://i.ibb.co/chPHm58X/image-2.png"
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="sub-accordion-item-Hiden">
                  <button
                    className="sub-accordion-header-Hiden"
                    onClick={() =>
                      window.open("https://zalo.me/g/xxtjfp354", "_blank")
                    }
                  >
                    Zalo đặt đồ ăn ship tận phòng 24/24
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="accordion-item-Hiden">
          <button
            onClick={() => toggleTab(12)}
            className="accordion-header-Hiden"
            aria-expanded={isTabOpen(12)}
          >
            Giới thiệu một vài địa điểm ăn uống hấp dẫn
          </button>
          {isTabOpen(12) && (
            <div className="accordion-content-Hiden">
              <div className="sub-accordion-Hiden">
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("12-1");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("12-1")}
                  >
                    Đồ ăn
                  </button>
                  {isTabOpen("12-1") && (
                    <div className="sub-accordion-content-Hiden">
                      <div className="food-all">
                        <div className="food">
                          <div className="descriptionFood food-left">
                            <h2>Ăn sáng</h2>
                            <p>
                              - Bún cù kỳ Hường Béo - Đường Tấn Mài, Cái Dăm,
                              Bãi Cháy (50k/bát)
                            </p>
                            <p>
                              - Bún hải sản Ngọc Hà - 334 Hạ Long, Bãi Cháy (từ
                              40k/bát)
                            </p>
                            <p>
                              - Bánh đa cua - bánh cuốn chả mực cô Tuyết - Sân
                              vườn Cái Dăm, Bãi Cháy (từ 35k/suất)
                            </p>
                            <p>- Phở gà Tuấn Hiếu - 352 Cái Dăm (từ 40k/bát)</p>
                            <p>
                              - Phở gà Hà Nội - Rặng dừa Cái Dăm, Bãi Cháy (từ
                              50k/bát)
                            </p>
                            <p>
                              - Bún riêu cua tóp mỡ Hà Nội - 1124 Đường Hạ Long,
                              Bãi Cháy (từ 35k/suất)
                            </p>
                            <p>
                              - Bún cá chấm Hào sản - Sân vườn Cái Dăm, Bãi Cháy
                              (từ 35k/suất)
                            </p>
                            <p>
                              - Bún bò huế Phương Đông - Sân vườn Cái Dăm, Bãi
                              Cháy (từ 35k/suất)
                            </p>
                            <p>
                              - Bánh mì ngon Thuý Thuỳ - 420 Cái Dăm (từ 20k)
                            </p>
                            <p>
                              - Bún sườn măng - Sân vườn Cái Dăm, Bãi Cháy (từ
                              35k/bát)
                            </p>
                          </div>
                          <div className="img-food">
                            <img
                              src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/7/21/1219307/Bun-Cu-Ky.jpeg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="food">
                          <div className="img-food">
                            <img
                              src="https://hotel84.com/hotel84-images/news/photo/nhahang-cua-vang-halong.jpg"
                              alt=""
                            />
                            <img
                              src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/487729480_1185500953368411_2510347861964589143_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=lxTcEOeEcvkQ7kNvwGtzSpm&_nc_oc=AdmuH3iBX_CYDU09x7cTO7bXBHg-XbxBZKIJYQWfhWoZeMPzET9t8BeSv3knQPH_uXw&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=SFJJIjGDsRp4WvPq307ilg&oh=00_AfIONJ7R0Qp3BJndsEPR5m4c-XeqE0RB7_hICLIO0uxu1g&oe=683D99AF"
                              alt=""
                            />
                          </div>
                          <div className="descriptionFood  food-right">
                            <h2>Nhà hàng/Hải sản/Ăn chính</h2>
                            <p>- Nhà hàng Ngọc Phương Nam</p>
                            <p>- Nhà hàng Hồng Hạnh 3 – 50 Hạ Long, Bãi Cháy</p>
                            <p>
                              - Nhà hàng Hồng Hạnh 6 – Tổ 11C khu 4A, P. Hùng
                              Thắng, Hạ Long
                            </p>
                            <p>
                              - Nhà hàng Cua Vàng – 32 Phan Châu Trinh, Bãi
                              Cháy, Hạ Long
                            </p>
                            <p>
                              - Nhà hàng Green – Số 2 Đ. Hoàng Quốc Việt, KĐT
                              Cái Dăm, Bãi Cháy, Hạ Long
                            </p>
                            <p>
                              - Nhà hàng Thuỳ Linh – Đối diện chung cư Newlife,
                              Đ. Hoàng Quốc Việt, P. Hùng Thắng, Bãi Cháy
                            </p>
                            <p>
                              - Nhà hàng Thiên Anh – 11 Đ. Phan Bội Châu, Bãi
                              Cháy
                            </p>
                            <p>
                              - Nhà hàng Nhật Sakurajima Corner – dãy A KBT
                              Green Bay Village, Đ. Hoàng Quốc Việt, P. Hùng
                              Thắng, Hạ Long (buffet từ 399k)
                            </p>
                            <p>
                              - Nhà hàng Hàn quốc Sơm Maul – Đường Rặng Dừa Cái
                              Dăm, Bãi Cháy (buffet từ 170k)
                            </p>
                            <p>
                              - Nhà hàng Hàn Quốc Won – Cạnh KS Blue Sky Đường
                              Rặng dừa Cái Dăm (từ 150k/người)
                            </p>
                            <p>
                              - Nhà hàng Trung Quốc YnY – Đường Rặng Dừa Cái Dăm
                              (từ 50k/người)
                            </p>
                            <p>
                              - Nhà hàng Trung Quốc Shu Xiang Yuan – Số 2 Đường
                              Rặng Dừa Cái Dăm (từ 50k/người)
                            </p>
                            <p>
                              - Nhà hàng Lẩu bò Ba Toa 1900 – Đường Rặng Dừa Cái
                              Dăm (từ 150k/người)
                            </p>
                            <p>
                              - Nhà hàng lẩu nướng Kiwi – Bò nhúng dấm – Tầng 1
                              Toà A Chung cư Newlife (từ 150k/người)
                            </p>
                            <p>
                              - Nhà hàng Âu Mapa Bistro – 409 Đường Hạ Long, Bãi
                              Cháy (từ 250k/người)
                            </p>
                          </div>
                        </div>
                        <div className="food">
                          <div className="descriptionFood food-left">
                            <h2>Ăn nhẹ, ăn vặt</h2>
                            <p>
                              - Xiên chiên, nhậu nhẹ nhàng Tổ cafe – 50 Hùng
                              Thắng (Từ 50k/người)
                            </p>
                            <p>
                              - Bún đậu quán Anh Em – Khu sân vườn Cái Dăm, Bãi
                              Cháy (Từ 40k/suất)
                            </p>
                            <p>
                              - Bò nướng đá núi lửa Fujicow – 551 Đường Hạ Long,
                              Bãi Cháy (Từ 80k/suất)
                            </p>
                            <p>
                              - Jinju Kimbap – Sân vườn Cái Dăm, Bãi Cháy (từ
                              50k/người)
                            </p>
                            <p>- Ăn vặt chợ Vườn Đào (từ 50k/người)</p>
                            <p>
                              - Bầu Pizza – SN 29 Tổ 10 Khu 5 Bãi Cháy (từ
                              80k/cái)
                            </p>
                            <p>- Lotteria – 676 Hạ Long</p>
                            <p>
                              - Cơm rang phở Quân – Sân vườn Cái Dăm (từ
                              45k/suất)
                            </p>
                            <p>
                              - Nem nướng, sữa chua Nhón – Đằng sau toà C chung
                              cư Newlife Bãi Cháy
                            </p>
                            <p>- Hợp tác xã quà quê – 1132 Hạ Long, Ao Cá</p>
                          </div>
                          <div className="img-food">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZBrSHuG_3OmcB7gHho4mjf9BYIR2pGpK_jQ&s"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="food">
                          <div className="img-food">
                            <img
                              src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/468951126_1288895119091087_4787621595311610663_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=aVJBIrkYWQ4Q7kNvwHTCUCa&_nc_oc=AdkYGN3zFWskIqzIG5-E4WDqvnwx9ZsfRKnuuu7WuwuuK6UKd46vDPBfa_HxdWbePtY&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=a97BhvzzKVnlEbMOKGvNkQ&oh=00_AfL4eXxS1dD554nRY6xaEUDIgq6WZGc18Tdt4hhd0bPZIQ&oe=683CAE1C"
                              alt=""
                            />
                          </div>
                          <div className="descriptionFood food-right">
                            <h2>Ăn đêm</h2>
                            <p>
                              - Quán ăn đêm Bà Lan Béo – đường vào Cổng chợ Vườn
                              Đào
                            </p>
                            <p>
                              - Quán ăn đêm Minh Tuấn – Đ. Hậu Cần, Bãi Cháy
                            </p>
                            <p>- Quán ăn đêm Lan Thư – 444 Cái Dăm</p>
                            <p>- Quán ăn đêm Cô Hường – Số 186 Giếng Đáy</p>
                          </div>
                        </div>
                        <div className="food">
                          <div className="descriptionFood food-left">
                            <h2>Quán Ốc</h2>
                            <p>
                              - Ốc Chull – Đường vào nhà hàng Cua Vàng, Cái Dăm
                              Bãi Cháy
                            </p>
                            <p>- Ốc Nàng Dâu – 228 EC Hùng Thắng</p>
                            <p>- Ốc Ngọc Sơn – 538 Cái Dăm</p>
                            <p>- Ốc Giếng Đáy – Số 14 Tổ 4 Khu 4 Giếng Đáy</p>
                          </div>
                          <div className="img-food">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1kTB2ZfJ2gvvYwFWb2mVvLwqZqa4fTdE7-w&s"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="sub-accordion-item-Hiden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTab("12-2");
                    }}
                    className="sub-accordion-header-Hiden"
                    aria-expanded={isTabOpen("12-2")}
                  >
                    Đồ uống
                  </button>
                  {isTabOpen("12-2") && (
                    <div className="sub-accordion-content-Hiden">
                      <div className="food-all">
                        <div className="food">
                          <div className="img-food">
                            <img
                              src="https://vetauthamvinhhalong.com/wp-content/uploads/2023/04/nha-hang-hong-hanh-ha-long-1.jpg"
                              alt=""
                            />
                          </div>
                          <div className="descriptionFood food-right">
                            <h2> Đồ uống-cafe, chill, quán có đồ uống</h2>
                            <p>La Luna Coffee – Đồi Monaco, Bãi Cháy</p>
                            <p>
                              Cái Quán ở ngay Ao Cá – Số 2A Cao Đạt, Bãi Cháy
                              (bờ hồ Ao Cá)
                            </p>
                            <p>Laika bãi biển – Đường Bao biển Bãi Cháy</p>
                            <p>
                              Thông zeo – Căn tin hải quân, Đồi Hải quân, Vườn
                              Đào, Bãi Cháy
                            </p>
                            <p>
                              Tổ cafe (có cả xiên chiên, nhậu nhẹ nhàng) – 50
                              Hùng Thắng
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popups for video guides */}
      {showPopup && (
        <>
          <div
            className="popup-overlay-Hiden"
            onClick={() => setShowPopup(null)}
          >
            <div
              className="popup-content-Hiden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                style={{
                  opacity: 2,
                  filter: "none",
                  backdropFilter: "none",
                  zIndex: 9999,
                  position: "relative",
                  display: "block",
                  background: "#000",
                }}
              >
                <source src={getVideoUrl(showPopup)} type="video/mp4" />
              </video>
              <button
                onClick={() => setShowPopup(null)}
                className="close-popup-Hiden"
              >
                Đóng
              </button>
            </div>
          </div>
        </>
      )}

      <div className="video-container-Hiden">
        <h2>Video Giới Thiệu Về Tour Du Lịch</h2>
        {showVideo ? (
          <video
            controls
            autoPlay
            width="100%"
            style={{
              maxWidth: "1024px",
              maxHeight: "500px",
              margin: "0 auto",
              display: "block",
              objectFit: "contain",
            }}
          >
            <source src={getVideoUrl("4")} type="video/mp4" />
          </video>
        ) : (
          <div>
            <img
              src="https://i.ibb.co/Mykb5jVT/dao-ngoc-vung-1.jpg"
              alt="Xem video"
              style={{
                cursor: "pointer",
                width: "100%",
                maxWidth: "1024px",
                maxHeight: "700px",
              }}
              onClick={() => setShowVideo(true)}
            />
            <button
              onClick={() => setShowVideo(true)}
              style={{
                fontSize: "16px",
                backgroundColor: "#1666dd",
                color: "#fff",
              }}
            >
              ▶ Xem video
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hiden;
