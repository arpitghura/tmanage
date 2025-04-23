// src/components/Footer.js
import React from 'react';
import { FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">TManage</div>
        <nav className="space-y-2">
          <p className="font-semibold">Explore</p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Design</li>
            <li>Prototyping</li>
            <li>Development features</li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Twitter</span>
            <FiTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">YouTube</span>
            <FiYoutube className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">LinkedIn</span>
            <FiLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
