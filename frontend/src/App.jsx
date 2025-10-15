import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./utilus/axiosInstance";
import { logOutUser } from "./features/auth/authSlice";
import AdminRoute from "./utilus/ProtectedRoutes.jsx/AdminRoute";
import ProtectedRoute from "./utilus/ProtectedRoutes.jsx/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";
import Home from "./pages/home/Home";
import toast from "react-hot-toast";

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Findadoctor = lazy(() => import("./pages/FindDoctor"));
const DoctorCategoryPage = lazy(() =>
  import("./pages/DoctorCategory/DoctorCategoryPage")
);
const DoctorProfilePage = lazy(() =>
  import("./pages/doctorProfilePage/DoctorProfile")
);
const CommunityPage = lazy(() =>
  import("./pages/community/communityPage/CommunityPage")
);
const CreateCommunity = lazy(() => import("./pages/community/CreateCommunity"));
const PostComment = lazy(() =>
  import("./pages/community/communityDetail/PostComment")
);
const TermsOfService = lazy(() => import("./pages/info/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/info/PrivacyPolicy"));
const FAQPage = lazy(() => import("./pages/info/FAQPage"));
const ContactUs = lazy(() => import("./pages/info/ContactUs"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Appointments = lazy(() => import("./pages/Appointments/Appointments"));
const MyCommunities = lazy(() => import("./pages/MyCommunities/MyCommunities"));
const PatientHistory = lazy(() =>
  import("./pages/PatientHistory.jsx/PatientHistory")
);
const EditProfile = lazy(() => import("./pages/Editprofile/EditProfile"));
const AddMedicalHistory = lazy(() =>
  import("./pages/AddMedicalHistory/AddMedicalHistory")
);
const EditMedicalHistory = lazy(() =>
  import("./pages/AddMedicalHistory/EditMedicalHistory")
);
const AppointmentDetails = lazy(() =>
  import("./pages/AppointmentDetails/AppointmentDetails")
);
const BookAppointment = lazy(() =>
  import("./pages/BookAppointment/BookAppointment")
);
const PatientProfileView = lazy(() =>
  import("./pages/PatientProfileView/PatientProfileView")
);
const OrderNow = lazy(() => import("./pages/Shop/Ordernow/Ordernow"));
const FindProduct = lazy(() => import("./pages/Shop/FindProduct/FindProduct"));
const ProductDetail = lazy(() =>
  import("./pages/Shop/ProductDetail/ProductDetail")
);
const Cart = lazy(() => import("./pages/Shop/Cart/Cart"));
const MyOrdersPage = lazy(() => import("./pages/Shop/OrderPage/MyOrdersPage"));
const OrderDetail = lazy(() => import("./pages/Shop/OrderDetail/OrderDetail"));
const AddressForm = lazy(() => import("./pages/AddressForm/AddressForm"));
const CommunityDetail = lazy(() =>
  import("./pages/community/communityDetail/CommunityDetail")
);
const About = lazy(() => import("./pages/About/About"));
const AdminDashboard = lazy(() =>
  import("./pages/AdminPages/DashBoard.jsx/AdminDashboard")
);
const ChatApp = lazy(() => import("./pages/Chat/ChatApp"));
const Room = lazy(() => import("./pages/Chat/Room"));

const AppWrapper = () => {
  const location = useLocation();
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token
  const isAdmin = userdata?.user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkToken = async () => {
    if (!token) return;
    console.log(userdata);
    try {
      const response = await axiosInstance.get("/auth/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error?.response.status === 401) {
        toast.error("Token validation failed : Login Again");
        dispatch(logOutUser());
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, [userdata, dispatch, navigate]);

  const hideLayoutRoutes = ["/login", "/signup", "/chat", "/room", "/admin"];
  const shouldHideLayout = hideLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-lg font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<OrderNow />} />
          <Route path="/shop/find" element={<FindProduct />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path="/doctors" element={<Findadoctor />} />
          <Route path="/about" element={<About />} />
          <Route path="/info/termsofservice" element={<TermsOfService />} />
          <Route path="/info/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/info/faqs" element={<FAQPage />} />
          <Route path="/info/contact" element={<ContactUs />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/appointments"
            element={<ProtectedRoute element={<Appointments />} />}
          />
          <Route
            path="/patient/appointments/:id"
            element={<ProtectedRoute element={<AppointmentDetails />} />}
          />
          <Route
            path="/mycommunity"
            element={<ProtectedRoute element={<MyCommunities />} />}
          />
          <Route
            path="/community"
            element={<ProtectedRoute element={<CommunityPage />} />}
          />
          <Route
            path="/patient/medical-history"
            element={<ProtectedRoute element={<PatientHistory />} />}
          />
          <Route
            path="/patient/medical-history/add"
            element={<ProtectedRoute element={<AddMedicalHistory />} />}
          />
          <Route
            path="/patient/medical-history/add/:id"
            element={<ProtectedRoute element={<EditMedicalHistory />} />}
          />
          <Route
            path="/doctor/category/:specialization"
            element={<DoctorCategoryPage />}
          />
          <Route
            path="/myorders"
            element={<ProtectedRoute element={<MyOrdersPage />} />}
          />
          <Route
            path="/myorders/:id"
            element={<ProtectedRoute element={<OrderDetail />} />}
          />
          <Route
            path="/orderdetails/:id"
            element={<ProtectedRoute element={<OrderDetail />} />}
          />
          <Route
            path="/address/new"
            element={<ProtectedRoute element={<AddressForm />} />}
          />
          <Route
            path="/address/edit/:id"
            element={<ProtectedRoute element={<AddressForm />} />}
          />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route
            path="/patient/:id"
            element={<ProtectedRoute element={<PatientProfileView />} />}
          />
          <Route
            path="/community/createcommunity"
            element={<ProtectedRoute element={<CreateCommunity />} />}
          />
          <Route
            path="/community/:id"
            element={<ProtectedRoute element={<CommunityDetail />} />}
          />
          <Route
            path="/community/post/:id"
            element={<ProtectedRoute element={<PostComment />} />}
          />
          <Route
            path="/profile/edit"
            element={<ProtectedRoute element={<EditProfile />} />}
          />
          <Route path="/booking/:id"  
          element={<ProtectedRoute element={<BookAppointment />} />}/>


          <Route
            path="/chat"
            element={<ProtectedRoute element={<ChatApp />} />}
          />
          <Route
            path="/chat/:id"
            element={<ProtectedRoute element={<ChatApp />} />}
          />
          <Route path="/room" element={<ProtectedRoute element={<Room />} />} />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminDashboard />} />}
          />
        </Routes>
      </Suspense>

      {!isAdmin && !shouldHideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
