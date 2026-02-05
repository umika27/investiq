"use client";

import { Sparkles, Twitter, Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#" },
    { name: "Simulator", href: "#" },
    { name: "Learning Center", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "API", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Email", icon: Mail, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#111827] text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#111827] to-[#0a0f18]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A99D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#4A90E2]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A99D] to-[#00B8A9] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">
                Invest<span className="text-[#F5A623]">IQ</span>
              </span>
            </div>
            <p className="text-[#9CA3AF] max-w-sm leading-relaxed mb-6">
              Learn how investing works while you invest. Smart financial education for everyone.
            </p>
            
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#00A99D]/50 transition-colors"
              />
              <button className="magnetic-btn px-6 py-3 bg-gradient-to-r from-[#00A99D] to-[#00B8A9] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#00A99D]/30 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-4 capitalize">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-[#9CA3AF] hover:text-white transition-colors duration-300 text-sm flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-[#6B7280] text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>by InvestIQ Team</span>
            <span className="mx-2">|</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00A99D]/50 transition-all duration-300 group"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 text-[#9CA3AF] group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-[#00A99D] via-[#4A90E2] to-[#F5A623]" />
    </footer>
  );
}
