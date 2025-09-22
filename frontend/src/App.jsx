import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './index.css';
import PatientDashboard from './pages/PatientDashboard';
import Navbar from './components/Navbar';
import Community from './pages/Community';
import Ordernow from './pages/Ordernow';
import Findadoctor from './pages/FindDoctor';
import Contact from './pages/Contact';
import Home from './pages/home/Home';
import DoctorCategoryPage from './pages/DoctorCategory/DoctorCategoryPage';
import DoctorProfilePage from './pages/doctorProfilePage/DoctorProfile';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/order" element={<Ordernow />} />
          <Route path="/doctors" element={<Findadoctor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor/category/:specialization" element={<DoctorCategoryPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;