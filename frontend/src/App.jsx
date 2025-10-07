import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./index.css";
import Navbar from "./components/Navbar";
import Findadoctor from "./pages/FindDoctor";
import Home from "./pages/home/Home";
import DoctorCategoryPage from "./pages/DoctorCategory/DoctorCategoryPage";
import DoctorProfilePage from "./pages/doctorProfilePage/DoctorProfile";
import CommunityPage from "./pages/community/communityPage/CommunityPage";
import CreateCommunity from "./pages/community/CreateCommunity";
import CommunityDetail from "./pages/community/communityDetail/communityDetail";
import PostComment from "./pages/community/communityDetail/PostComment";
import TermsOfService from "./pages/info/TermsOfService";
import About from "./pages/About";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import FAQPage from "./pages/info/FAQPage";
import ContactUs from "./pages/info/ContactUs";
import Footer from "./components/Footer";
import Profile from "./pages/Profile/Profile";
import Appointments from "./pages/Appointments/Appointments";
import MyCommunities from "./pages/MyCommunities/MyCommunities";
import PatientHistory from "./pages/PatientHistory.jsx/PatientHistory";
import EditProfile from "./pages/Editprofile/EditProfile";
import AddMedicalHistory from "./pages/AddMedicalHistory/AddMedicalHistory";
import EditMedicalHistory from "./pages/AddMedicalHistory/EditMedicalHistory";
import AppointmentDetails from "./pages/AppointmentDetails/AppointmentDetails";
import BookAppointment from "./pages/BookAppointment/BookAppointment";
import PatientProfileView from "./pages/PatientProfileView/PatientProfileView";
import OrderNow from "./pages/Shop/Ordernow/Ordernow";
import FindProduct from "./pages/Shop/FindProduct/FindProduct";
import ProductDetail from "./pages/Shop/ProductDetail/ProductDetail";
import Cart from "./pages/Shop/Cart/Cart";
import MyOrdersPage from "./pages/Shop/OrderPage/MyOrdersPage";
import OrderDetail from "./pages/Shop/OrderDetail/OrderDetail";
import AddressForm from "./pages/AddressForm/AddressForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route
            path="/patient/appointments/:id"
            element={<AppointmentDetails />}
          />
          <Route path="/mycommunity" element={<MyCommunities />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/patient/medical-history" element={<PatientHistory />} />
          <Route
            path="/patient/medical-history/add"
            element={<AddMedicalHistory />}
          />
          <Route
            path="/patient/medical-history/add/:id"
            element={<EditMedicalHistory />}
          />
          <Route path="/shop" element={<OrderNow />} />
          <Route path="/shop/find" element={<FindProduct />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path="/doctors" element={<Findadoctor />} />
          <Route path="/about" element={<About />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/myorders/:id" element={<OrderDetail />} />
          <Route path="/address/new" element={<AddressForm />} />
          <Route path="/address/edit/:id" element={<AddressForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/doctor/category/:specialization"
            element={<DoctorCategoryPage />}
          />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/patient/:id" element={<PatientProfileView />} />
          <Route
            path="/community/createcommunity"
            element={<CreateCommunity />}
          />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/community/post/:id" element={<PostComment />} />
          <Route path="/info/termsofservice" element={<TermsOfService />} />
          <Route path="/info/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/info/faqs" element={<FAQPage />} />
          <Route path="/info/contact" element={<ContactUs />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/booking/:id" element={<BookAppointment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
