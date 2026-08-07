import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Heritage } from './components/Heritage';
import { Specialties } from './components/Specialties';
import { FragrancePyramid } from './components/FragrancePyramid';
import { Partnerships } from './components/Partnerships';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 text-obsidian selection:bg-gold-500 selection:text-white">
      <Navbar />

      <main>
        <Hero />
        <Heritage />
        <Specialties />
        <FragrancePyramid />
        <Partnerships />
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};
