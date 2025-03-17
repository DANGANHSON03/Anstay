import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Apartment from "./components/Apartment/Apartment";
import ApartmentDetail from "./components/ApartmentDetail/ApartmentDetail";
import Tour from "./components/Tour/Tour";
import TourDetail from "./components/TourDetail/TourDetail";
import Booking from "./components/Booking/Booking";
import Help from "./components/Help/Help";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartment" element={<Apartment />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
