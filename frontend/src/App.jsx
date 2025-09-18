import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import './index.css';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import Navbar from './components/Navbar';
import Community from './pages/Community';
import Ordernow from './pages/Ordernow';
import Findadoctor from './pages/FindDoctor';
import Contact from './pages/Contact';


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
        </Routes>
      </div>
    </Router>
  );
}

export default App;