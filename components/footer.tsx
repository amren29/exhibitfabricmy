import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary">
              {siteConfig.name}
            </h3>
            <p className="text-xs text-gray-300">
              Premium custom trade show booths and fabric printing services across Malaysia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-xs text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
              {siteConfig.contact.offices.map((office, index) => (
                <li key={index} className="flex items-center space-x-2 text-xs text-gray-300">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    {office.location.replace(" (HQ)", "").replace(" (Branch)", "")}:
                  </span>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {office.phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start space-x-2 text-xs text-gray-300">
                <Mail className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-white font-medium">Email:</span>
                  {siteConfig.contact.offices.map((office, index) => (
                    <span key={index} className="inline-flex items-center">
                      <span className="text-white font-medium">{index + 1}.</span>
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-white transition-colors ml-1"
                      >
                        {office.email}
                      </a>
                      {index < siteConfig.contact.offices.length - 1 && (
                        <span className="ml-1"></span>
                      )}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
