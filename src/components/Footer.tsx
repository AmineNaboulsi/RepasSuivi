"use client";

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white shadow-md rounded-lg p-4 mt-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} RepasSuivi. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            Made with ❤️ by Amine
          </div>
        </div>
      </div>
    </footer>
  );
}