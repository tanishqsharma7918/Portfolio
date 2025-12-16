import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import SocialSidebar from './components/SocialSidebar';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-white bg-white dark:bg-[#0a192f] transition-colors duration-300">
      {/* Light Mode: White background | Dark Mode: Navy deep space (#0a192f) */}

      <SocialSidebar />
      <Navbar />

      {/* Hero Section - Full Width, Perfectly Centered */}
      <Hero />

      {/* Other Sections - Constrained Container */}
      <main className="max-w-7xl mx-auto px-6 pb-12 space-y-32">
        <About />
        <Skills />
        <Experience />

        <Projects />

        <Blog />
        <Contact />
      </main>

      <footer className="glass py-8 text-center text-sm opacity-60">
        <p>© 2025 Tanishq Sharma. Designed with Glassmorphism.</p>
      </footer>
    </div>
  );
}

export default App;
