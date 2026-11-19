import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhyHirePulse from './components/WhyHirePulse';
import LearningHub from './components/LearningHub';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'signin'

  const handleOpenSignUp = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignIn = () => {
    setAuthMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#292C24] font-sans antialiased selection:bg-[#69764B] selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <Navbar 
        onOpenSignUp={handleOpenSignUp} 
        onOpenSignIn={handleOpenSignIn} 
      />

      {/* Main Page Content */}
      <main className="grow">
        <Hero onOpenSignUp={handleOpenSignUp} />
        <Features onOpenSignUp={handleOpenSignUp} />
        <HowItWorks onOpenSignUp={handleOpenSignUp} />
        <WhyHirePulse onOpenSignUp={handleOpenSignUp} />
        <LearningHub onOpenSignUp={handleOpenSignUp} />
        <FAQ />
        <FinalCTA onOpenSignUp={handleOpenSignUp} />
      </main>

      {/* Footer */}
      <Footer onOpenSignUp={handleOpenSignUp} />

      {/* Interactive Registration / Sign-In Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        initialMode={authMode}
      />
    </div>
  );
}
