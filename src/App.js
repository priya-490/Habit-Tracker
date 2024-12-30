
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LoginPage, SignupPage } from "./MyComponents/Login";
import Header from './MyComponents/Header.js';
import Dashboard from './MyComponents/Dashboard.js';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* now we will create our main display page */}
          <Route path="/mainPage" element={< Dashboard />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
