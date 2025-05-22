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
import OurStory from "./components/AboutList/OurStory/OurStory.tsx";
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
import SearchResults from "./pages/SearchResults/SearchResults";
import ApartmentList from "./pages/ApartmentList/ApartmentList";
import Header from "./components/Header/Header";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/hiden-page/:apartment" element={<HidenPage />} />
          <Route path="/form-qr" element={<FormQr />} />
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/tour-ha-noi"
            element={
              <MainLayout>
                <Tour />
              </MainLayout>
            }
          />
          <Route
            path="/tour-ha-long"
            element={
              <MainLayout>
                <Tour />
              </MainLayout>
            }
          />
          <Route
            path="/tour-ha-noi/:tourName/view"
            element={
              <MainLayout>
                <TourDetail />
              </MainLayout>
            }
          />
          <Route
            path="/tour-ha-long/:tourName/view"
            element={
              <MainLayout>
                <TourDetail />
              </MainLayout>
            }
          />
          <Route
            path="/apartment-ha-noi"
            element={
              <MainLayout>
                <Apartment />
              </MainLayout>
            }
          />

          <Route
            path="/apartment-ha-long"
            element={
              <MainLayout>
                <Apartment />
              </MainLayout>
            }
          />

          <Route
            path="/apartment-ha-noi/:apartmentName/view"
            element={
              <MainLayout>
                <ApartmentDetail />
              </MainLayout>
            }
          />
          <Route
            path="/apartment-ha-long/:apartmentName/view"
            element={
              <MainLayout>
                <ApartmentDetail />
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
            path="/about-us/our-story"
            element={
              <MainLayout>
                <OurStory />
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
          <Route
            path="/search-results"
            element={
              <MainLayout>
                <SearchResults />
              </MainLayout>
            }
          />
          <Route
            path="/apartment-detail/:apartmentId"
            element={<ApartmentDetail />}
          />
          <Route
            path="/apartments/ha-noi"
            element={
              <MainLayout>
                <ApartmentList />
              </MainLayout>
            }
          />
          <Route
            path="/apartments/ha-long"
            element={
              <MainLayout>
                <ApartmentList />
              </MainLayout>
            }
          />
          <Route
            path="/apartments/:locationSlug"
            element={
              <MainLayout>
                <ApartmentList />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
