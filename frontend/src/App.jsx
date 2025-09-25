import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./index.css";
import Navbar from "./components/Navbar";
import Ordernow from "./pages/Ordernow";
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
import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/Appointments/Appointments";
import MyCommunities from "./pages/MyCommunities/MyCommunities";
import PatientHistory from "./pages/PatientHistory.jsx/PatientHistory";
import DoctorTodaysAppointment from "./pages/DoctorTodaysAppointment/DoctorTodaysAppointment";
import EditProfile from "./pages/Editprofile/EditProfile";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/mycommunity" element={<MyCommunities />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/patient/history" element={<PatientHistory />} />
          <Route path="/doctor/today" element={<DoctorTodaysAppointment />} />
          <Route path="/order" element={<Ordernow />} />
          <Route path="/doctors" element={<Findadoctor />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/doctor/category/:specialization"
            element={<DoctorCategoryPage />}
          />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
