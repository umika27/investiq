"use client";

import { useState } from "react";
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUp, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "Demo", "Updates"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Resources", links: ["Documentation", "Help Center", "Community", "Contact"] },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#111827] to-[#0a0a0a] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A99D]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4A90E2]/10 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">
                Invest<span className="text-[#F5A623]">IQ</span>
              </span>
              <Sparkles className="w-5 h-5 text-[#F5A623]" />
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Empowering investors with knowledge. Learn smart investing strategies before putting your money to work.
            </p>
            
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00A99D] transition-colors duration-300"
              />
              <button className="bg-gradient-to-r from-[#00A99D] to-[#008a7d] hover:from-[#008a7d] hover:to-[#007a6d] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00A99D]/25">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-[#00A99D] transition-colors duration-300 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart 
              className={`w-4 h-4 text-red-500 transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              fill="currentColor"
            />
            <span>by InvestIQ Team</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 bg-white/10 hover:bg-[#00A99D] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00A99D]/25"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-[#00A99D] transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 bg-white/10 group-hover:bg-[#00A99D]/20 rounded-lg flex items-center justify-center transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
