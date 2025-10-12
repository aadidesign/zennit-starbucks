import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import RewardsPage from './pages/RewardsPage';
import GiftCardsPage from './pages/GiftCardsPage';
import OurStoryPage from './pages/OurStoryPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin Dashboard - No Navbar/Footer */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Auth Pages - No Navbar/Footer */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Regular Pages - With Navbar/Footer */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
                  <Route path="/gift-cards" element={<GiftCardsPage />} />
                  <Route path="/our-story" element={<OurStoryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

