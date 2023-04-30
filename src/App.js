import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import Qr from './Components/qrcode/Qr';
import Home from './Components/home/Home';
import { Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Search from './Components/search/Search';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      {/* <Qr /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
