import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar 
        className="bg-white/70 backdrop-blur-md border-b border-white/20"
        maxWidth="xl"
      >
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">TV Blue Game</Link>
        </NavbarBrand>
        
        <NavbarContent justify="end">
          <NavbarItem>
            <Button 
              as={Link} 
              color="primary" 
              href="/home" 
              variant="flat"
            >
              Watch Video
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white/70 backdrop-blur-md border-t border-white/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 TVBlue Game. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}