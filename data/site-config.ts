import { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Exhibit Fabric",
  description:
    "Custom Trade Show Booths & Fabric Printing - Premium exhibition solutions across Malaysia",
  contact: {
    email: "infohq@exhibit.my",
    phone: "+60 18-902 3676",
    address: "Kuala Lumpur | Kota Kinabalu | Kuching",
    offices: [
      {
        location: "Kuala Lumpur (HQ)",
        address: "Block D, Platinum Sentral, Jalan Stesen Sentral 2 Level 3, 4 & 5, 50470 Kuala Lumpur",
        phone: "+60 18-902 3676",
        email: "infokl@exhibit.my",
      },
      {
        location: "Kota Kinabalu (Branch)",
        address: "Unit 10-15, 10th Floor, Menara Maa, 6, Lorong Api - Api 1, Api-api Centre, 88000 Kota Kinabalu, Sabah",
        phone: "018 902 3676",
        email: "infokk@exhibit.my",
      },
      {
        location: "Kuching (Branch)",
        address: "Jln Tun Datuk Patinggi Haji Ahmad Zaidi Adruce, Level 2, 93200 Kuching, Sarawak",
        phone: "010 357 0729",
        email: "infokuching@exhibit.my",
      },
    ],
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100091975490698",
    instagram: "https://instagram.com/exhibitfabric",
    whatsapp: "https://wa.me/60123456789",
  },
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/product" },
  { label: "Gallery", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { platform: "Facebook", url: siteConfig.social.facebook, icon: "facebook" },
  {
    platform: "Instagram",
    url: siteConfig.social.instagram,
    icon: "instagram",
  },
  { platform: "WhatsApp", url: siteConfig.social.whatsapp, icon: "message-circle" },
];

export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
    alt: "Custom Trade Show Booth Display",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop",
    alt: "Fabric Printing Exhibition",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop",
    alt: "Professional Event Displays",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop",
    alt: "LED Lightbox Solutions",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&h=1080&fit=crop",
    alt: "Portable Exhibition Booths",
  },
];
