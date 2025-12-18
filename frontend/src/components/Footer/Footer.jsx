import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaHeart, FaBook } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Press", path: "/press" }
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faq" },
      { name: "Shipping Info", path: "/shipping" }
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Refund Policy", path: "/refunds" }
    ],
    shop: [
      { name: "All Books", path: "/all-books" },
      { name: "New Releases", path: "/new-releases" },
      { name: "Best Sellers", path: "/bestsellers" },
      { name: "Genres", path: "/genres" }
    ]
  };

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: <FaTwitter />, url: "#", label: "Twitter", color: "hover:text-sky-400" },
    { icon: <FaInstagram />, url: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: <FaLinkedin />, url: "#", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: <FaGithub />, url: "#", label: "GitHub", color: "hover:text-gray-400" }
  ];

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center transform rotate-12">
                <FaBook className="text-white text-2xl -rotate-12" />
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">
                StorySeeker
              </h2>
            </div>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Your ultimate destination for discovering incredible books. Join our community of readers and explore stories that inspire, entertain, and enlighten.
            </p>
            
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>support@storyseeker.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span>123 Book Street, Reading City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-zinc-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-zinc-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-zinc-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold mb-3 text-white">
              📧 Stay in the Loop
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              Get the latest book recommendations and exclusive deals delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-zinc-500 text-sm transition-colors"
              />
              <button className="px-6 py-3 bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="text-sm text-zinc-400 text-center md:text-left">
              <span className="inline-flex items-center gap-2">
                &copy; {currentYear} 
                <span className="text-yellow-400 font-semibold">StorySeeker</span>
                | Crafted with 
                <FaHeart className="text-red-500 animate-pulse inline" /> 
                by 
                <span className="text-yellow-400 font-semibold">WNS</span>
              </span>
            </div>

            <div className="flex items-center gap-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-zinc-400 ${social.color} transition-all duration-200 transform hover:scale-110`}
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-500">
              {footerLinks.legal.slice(0, 2).map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-500"></div>
    </footer>
  );
};

export default Footer;