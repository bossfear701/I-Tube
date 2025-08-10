import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Welcome to I Tube</h1>;
}

function Upload() {
  return <h1>Upload Page (Mock)</h1>;
}

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/upload">Upload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}
