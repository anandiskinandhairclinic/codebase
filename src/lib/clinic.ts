export const clinic = {
  name: "Anandi Skin & Hair Clinic",
  doctor: "Dr. Vishakha Padmakar Patil",
  credentials: "MBBS, MD - Skin (Dermatology, Venereology & Leprosy), Board-Certified Dermatologist",
  tagline: "Expert Dermatology & Advanced Cosmetology",
  phone: "+91 84593 23581",
  phoneRaw: "918459323581",
  email: "info@anandiclinic.in",
  whatsappMessage: "Hello Anandi Skin & Hair Clinic, I'd like to book a consultation.",
  rating: 5.0,
  reviews: 17,
  address: {
    line1: "46, Datta Nagar Rd, Sai Nagar, Dattanagar",
    line2: "Chandrabhaga Nagar, Ambegaon Budruk",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411046",
    country: "India",
  },
  timings: [
    { day: "Monday – Saturday", hours: "6:00 PM – 9:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Anandi+Skin+&+Hair+Clinic+Ambegaon+Pune&output=embed",
  socials: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
};

export const whatsappLink = (msg = clinic.whatsappMessage) =>
  `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(msg)}`;

export const telLink = `tel:${clinic.phone.replace(/\s/g, "")}`;