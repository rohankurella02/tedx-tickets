import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import Qr from './Components/qrcode/Qr';
import Home from './Components/home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Search from './Components/search/Search';
import Login from './Components/login/Login';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

function App() {
  const supabase = createClient('https://kljpojhmwfmckmspbmmp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsanBvamhtd2ZtY2ttc3BibW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM0NzAsImV4cCI6MTk5ODQ0OTQ3MH0.XGm-s5m8nninpQiWi-Xa79Qi3-_SFm0kYceM09TJGpY')
  const navigate = useNavigate()

  useEffect(() => {
    console.log(localStorage.getItem('sb-kljpojhmwfmckmspbmmp-auth-token'))
    if (localStorage.getItem('sb-kljpojhmwfmckmspbmmp-auth-token') == null) {
      console.log('not logged in')
      navigate('/login')
    }
    else if (localStorage.getItem('sb-kljpojhmwfmckmspbmmp-auth-token').access_token == supabase?.auth?.session?.access_token) {
      console.log('logged in')
    }
    else {
      console.log('not logged in')
    }
  })

  return (
    <div className="App">
      <Toaster />
      <Navbar />
      {/* <Qr /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
