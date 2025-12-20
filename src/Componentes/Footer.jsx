import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from '../assets/logo.png'; // adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Logo & Website Name */}
        <div className="flex items-center gap-3">
          <img
            src={Logo} // use imported logo
            alt="Logo"
            className="w-10 h-10 object-cover"
          />
          <span className="text-xl font-bold">MyWebsite</span>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold">Contact</h4>
          <p>Email: contact@mywebsite.com</p>
          <p>Phone: +880123456789</p>
          <p>Address: Jessore, Bangladesh</p>
        </div>

        {/* Terms & Conditions */}
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold">Legal</h4>
          <a href="/terms" className="hover:text-indigo-400">
            Terms & Conditions
          </a>
          <a href="/privacy" className="hover:text-indigo-400">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex gap-3 text-xl">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook />
              <h1>hello world for my and my work .....</h1>
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-slate-400">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
