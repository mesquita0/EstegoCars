import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/Home.js";
import { CarPage } from "./pages/CarPage";

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/api/cars/')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarPage />} />
      </Routes>
    </Router>
  );
}
export default App;
