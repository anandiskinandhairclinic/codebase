export const clinic = {
  name: "Dr Jain's Skin Care Clinic",
  doctor: "Dr. Amit Jain",
  credentials: "MBBS, MD - Skin (Dermatology, Venereology & Leprosy)",
  tagline: "Advanced Skin & Hair Care Solutions in Pune",
  phone: "+91 92443 23441",
  phoneRaw: "919244323441",
  email: "contact@drjainskinclinic.in",
  whatsappMessage: "Hello Dr. Jain's Clinic, I'd like to book a consultation.",
  rating: 4.8,
  reviews: 140,
  address: {
    line1: "Shop 5, Ground Floor, Olive Shopping Complex",
    line2: "Jhambhulwadi Road, Chowk, Dattanagar",
    city: "Katraj, Pune",
    state: "Maharashtra",
    pincode: "411046",
    country: "India",
  },
  timings: [
    { day: "Monday – Saturday", hours: "10:30 AM – 2:00 PM,  5:00 PM – 9:00 PM" },
    { day: "Sunday", hours: "By Appointment" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Olive+Shopping+Complex+Katraj+Pune&output=embed",
  socials: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
};

export const whatsappLink = (msg = clinic.whatsappMessage) =>
  `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(msg)}`;

export const telLink = `tel:${clinic.phone.replace(/\s/g, "")}`;