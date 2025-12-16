import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background Elements */}
      <div className="bg-noise fixed inset-0 z-[-1]" />
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-400/30 blob" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/30 blob" style={{ animationDelay: '2s' }} />
      <div className="fixed top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-pink-400/20 blob" style={{ animationDelay: '4s' }} />

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pb-12 space-y-32">
        <Hero />

        <About />
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
