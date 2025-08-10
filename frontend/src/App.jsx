import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Upload from './Upload.jsx';

function Home(){ return <div className="p-8"><h1 className="text-2xl font-bold">I Tube (Demo)</h1><p className="mt-4">Simple starter site — upload goes to Firebase Storage (you must configure Firebase).</p></div> }

export default function App(){
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="p-4 bg-white shadow-sm">
          <nav className="container mx-auto flex gap-4">
            <Link to="/" className="font-semibold">Home</Link>
            <Link to="/upload" className="font-semibold">Upload</Link>
          </nav>
        </header>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}