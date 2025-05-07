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
import Blog from "./components/Blog/Blog.tsx";
import ScrollToTop from "./components/ScrollToTop/SrcollToTop";
import Culture from "./components/AboutList/Aboutculture/Culture";
import Support from "./components/Support/Support";
import HidenPage from "./pages/HidenPage/HidenPage";
import FormQr from "./components/FormQr/FormQr.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Route không dùng MainLayout */}
          <Route path="/hiden-page" element={<HidenPage />} />
          <Route path="/form-qr" element={<FormQr />} />

          {/* <Route path="/hidenVi" element={<HidenViet/>} />
          <Route path="/hidenEn" element={<HidenEn/>}/> */}

          {/* Các route dùng MainLayout */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/apartment"
            element={
              <MainLayout>
                <Apartment />
              </MainLayout>
            }
          />
          <Route
            path="/apartment/:id"
            element={
              <MainLayout>
                <ApartmentDetail />
              </MainLayout>
            }
          />
          <Route
            path="/tour"
            element={
              <MainLayout>
                <Tour />
              </MainLayout>
            }
          />
          <Route
            path="/tour/:id"
            element={
              <MainLayout>
                <TourDetail />
              </MainLayout>
            }
          />
          <Route
            path="/booking"
            element={
              <MainLayout>
                <Booking />
              </MainLayout>
            }
          />
          <Route
            path="/help"
            element={
              <MainLayout>
                <Help />
              </MainLayout>
            }
          />
          <Route
            path="/about-us"
            element={
              <MainLayout>
                <AboutUs />
              </MainLayout>
            }
          />
          <Route
            path="/about-us/company"
            element={
              <MainLayout>
                <AboutCP />
              </MainLayout>
            }
          />
          <Route
            path="/about-us/groupcompany"
            element={
              <MainLayout>
                <AboutGCP />
              </MainLayout>
            }
          />
          <Route
            path="/about-us/culture"
            element={
              <MainLayout>
                <Culture />
              </MainLayout>
            }
          />
          <Route
            path="/about-us/contact"
            element={
              <MainLayout>
                <AboutContact />
              </MainLayout>
            }
          />
          <Route
            path="/coperate"
            element={
              <MainLayout>
                <Coperate />
              </MainLayout>
            }
          />
          <Route
            path="/explore&experience"
            element={
              <MainLayout>
                <ExploExper />
              </MainLayout>
            }
          />
          <Route
            path="/dashbroad"
            element={
              <MainLayout>
                <DashBroad />
              </MainLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <MainLayout>
                <Blog />
              </MainLayout>
            }
          />

          <Route
            path="/support"
            element={
              <MainLayout>
                <Support />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
