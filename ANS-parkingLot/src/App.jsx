import './App.css';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Container from './components/layout/Container';
import Parking from './components/pages/Parking';
import EmployeeTable from './components/pages/EmployeeTable';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parking" element={<Parking/>} />
          <Route path="/employees" element={<EmployeeTable/>} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
