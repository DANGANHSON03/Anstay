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
import AboutUs from "./components/AboutUs/AboutUs";
import AboutCP from "./components/AboutList/AboutCP/AboutCP";
import AboutGCP from "./components/AboutList/AboutGCP/AboutGCP";
import AboutContact from "./components/AboutList/AboutContact/AboutContact";
import Coperate from "./components/Coperate/Coperate";
import { AuthProvider } from "./Context/AuthContext";
import ExploExper from "./components/ExploExper/ExploExper";
import DashBroad from "./components/DashBroad/DashBroad";
import Food from "./components/Food/Food";
function App() {
  return (
    <AuthProvider>
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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/about-us/company" element={<AboutCP />} />
            <Route path="/about-us/groupcompany" element={<AboutGCP />} />
            <Route path="/about-us/contact" element={<AboutContact />} />
            <Route path="/coperate" element={<Coperate />} />
            <Route path="/explore&experience" element={<ExploExper />} />
            <Route path="/dashbroad" element={<DashBroad />} />
            <Route path="/food" element={<Food />} />

            {/* Add more routes as needed */}
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
