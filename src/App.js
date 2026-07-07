import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ElevateSA from './ElevateSA';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ElevateSA page="home" />} />
          <Route path="/about" element={<ElevateSA page="about" />} />
          <Route path="/services" element={<ElevateSA page="services" />} />
          <Route path="/contact" element={<ElevateSA page="contact" />} />
          <Route path="/privacy" element={<ElevateSA page="privacy" />} />
          <Route path="/terms" element={<ElevateSA page="terms" />} />
          <Route path="/services/:serviceId" element={<ElevateSA page="service" />} />
          <Route path="*" element={<ElevateSA page="home" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
