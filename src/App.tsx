/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entry transition after initial mount
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
      {/* Background Video with interactive mouse-scrub control */}
      <BackgroundVideo />

      {/* Fixed top navigation */}
      <Navbar mounted={mounted} />

      {/* Main hero section */}
      <Hero mounted={mounted} />

      {/* Vercel Web Analytics */}
      <Analytics />
    </main>
  );
}

