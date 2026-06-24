/**
 * Firebase Data Adapter
 *
 * Bridges the existing Firebase backend (firebaseServices.ts) with the new
 * Lumina frontend data types. Every export matches the shape the new routes
 * expect so they can import from here instead of the old mock-data.ts.
 *
 * Each getter first tries Firestore, then falls back to inline defaults.
 */

import {
  getClinicSettings,
  getHeroData,
  getDoctorInfo,
  getServices,
  getServiceBySlug,
  getTestimonials,
  getBlogs,
  getGallery,
  getFAQs,
  createAppointment,
  getSpecialtiesData,
  getWhyChooseUsData,
  getBeforeAfterVideo,
  getProducts,
  getBeforeAfterItems,
  createOrder,
  addDocToCollection,
  updateDocInCollection,
  deleteDocFromCollection,
  updateSingleDoc,
  getChatbotRules,
} from "./firebaseServices";
import { clinic, whatsappLink, telLink } from "./clinic";

// Re-export unchanged backend functions
export { createAppointment, whatsappLink, telLink, createOrder, addDocToCollection, updateDocInCollection, deleteDocFromCollection, updateSingleDoc, getServiceBySlug, getChatbotRules };

// ────────────────────────────────────────────
// Types that the new frontend expects
// ────────────────────────────────────────────

export type Treatment = {
  slug: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  blurb: string;
  image?: string;
  overview?: string;
  symptoms?: string[];
  causes?: string[];
  process?: { step: string; detail: string }[];
  benefits?: string[];
  faqs?: { q: string; a: string }[];
};

export type Testimonial = {
  id?: string;
  name: string;
  treatment: string;
  rating: number;
  quote: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  read: string;
  imageUrl?: string;
  content?: string;
};

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  image: string;
  experience: string;
  qualifications: string[];
  specialties: string[];
  awards: string[];
  bio: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  skin: string | null;
  hair: string | null;
  benefits: string[];
  ingredients: string[];
  blurb: string;
  imageUrl?: string;
};

export type BeforeAfterItem = {
  id: string;
  treatment: string;
  weeks: number;
  story: string;
  beforeSrc: string;
  afterSrc: string;
};

export type FAQ = { q: string; a: string };

export type Stat = { value: string; label: string };

export type ChatbotRule = {
  id?: string;
  track: "skin" | "hair";
  if: string[];
  then: string[];
};

// ────────────────────────────────────────────
// Clinic info
// ────────────────────────────────────────────

export async function getClinicInfo() {
  const settings = await getClinicSettings();
  return {
    ...clinic,
    ...settings,
  };
}

export { clinic };

// ────────────────────────────────────────────
// Treatments (mapped from backend Services)
// ────────────────────────────────────────────

export async function getTreatments(): Promise<Treatment[]> {
  const services = await getServices();
  return services.map((s: any) => ({
    slug: s.slug,
    name: s.title || s.name || s.slug,
    category: categorizeService(s),
    duration: guessDuration(s),
    price: s.price || 0,
    blurb: s.short || s.overview?.slice(0, 120) + "…" || "",
    image: s.image || s.imageUrl || "",
    overview: s.overview || "",
    symptoms: s.symptoms || [],
    causes: s.causes || [],
    process: s.process || [],
    benefits: s.benefits || [],
    faqs: s.faqs || [],
  }));
}

/** Categorize a backend service into "Skin" or "Hair" for the new UI */
function categorizeService(s: any): string {
  const slug = (s.slug || "").toLowerCase();
  const title = (s.title || "").toLowerCase();
  const hairKeywords = ["hair", "baldness", "prp", "scalp", "dandruff", "trichology"];
  if (hairKeywords.some((k) => slug.includes(k) || title.includes(k))) return "Hair";
  return "Skin";
}

/** Estimate a display duration since the backend doesn't store it */
function guessDuration(s: any): string {
  if (s.duration) return s.duration;
  const slug = (s.slug || "").toLowerCase();
  if (slug.includes("consult") || slug.includes("biopsy")) return "30 min";
  if (slug.includes("peel") || slug.includes("polish")) return "45 min";
  if (slug.includes("prp") || slug.includes("botox")) return "60 min";
  if (slug.includes("laser") || slug.includes("transplant")) return "60 min";
  return "45 min";
}

// ────────────────────────────────────────────
// Testimonials
// ────────────────────────────────────────────

export async function getTestimonialsList(): Promise<Testimonial[]> {
  const rawTestimonials = await getTestimonials();
  return rawTestimonials.map((t: any) => ({
    id: t.id,
    name: t.name || "Patient",
    treatment: t.treatment || t.service || "General",
    rating: t.rating || 5,
    quote: t.quote || t.text || t.review || "",
  }));
}

// ────────────────────────────────────────────
// Blog
// ────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rawBlogs = await getBlogs();
  return rawBlogs.map((b: any) => ({
    slug: b.slug || b.id || "",
    title: b.title || "",
    category: b.category || "Dermatology",
    date: b.date || b.publishedAt || "",
    excerpt: b.excerpt || b.summary || b.content?.slice(0, 140) + "…" || "",
    read: b.readTime || b.read || "5 min",
    imageUrl: b.imageUrl || b.image || undefined,
    content: b.content || b.excerpt || "",
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const list = await getBlogPosts();
  return list.find((p) => p.slug === slug);
}

// ────────────────────────────────────────────
// Doctor info
// ────────────────────────────────────────────

export async function getDoctorsList(): Promise<Doctor[]> {
  const doc = await getDoctorInfo();
  return [
    {
      slug: "dr-vishakha-patil",
      name: doc.name || "Dr. Vishakha Padmakar Patil",
      title: doc.role || "Chief Dermatologist & Hair Care Specialist",
      image: doc.imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
      experience: "10+ years",
      qualifications: doc.qualifications || ["MBBS", "MD - Skin (Dermatology, Venereology & Leprosy), Board-Certified Dermatologist"],
      specialties: ["Dermatology", "Cosmetology", "Hair Care", "Laser Treatments"],
      awards: (doc.publications || []).map((p: any) => `${p.title} — ${p.journal} (${p.year})`),
      bio: doc.bio || "",
    },
  ];
}

// ────────────────────────────────────────────
// FAQs
// ────────────────────────────────────────────

export async function getFaqList(): Promise<FAQ[]> {
  const rawFaqs = await getFAQs();
  return rawFaqs.map((f: any) => ({
    q: f.q || f.question || "",
    a: f.a || f.answer || "",
  }));
}

// ────────────────────────────────────────────
// Stats
// ────────────────────────────────────────────

export async function getStatsList(): Promise<Stat[]> {
  const hero = await getHeroData();
  if (hero.stats && Array.isArray(hero.stats)) {
    return hero.stats.map((s: any) => ({
      value: s.value || s.number || "",
      label: s.label || "",
    }));
  }
  return [
    { value: "10+", label: "Years experience" },
    { value: "15k+", label: "Happy patients" },
    { value: "4.8★", label: "Google rating" },
    { value: "20+", label: "Treatments offered" },
  ];
}

// ────────────────────────────────────────────
// Gallery
// ────────────────────────────────────────────

export async function getGalleryImages() {
  return getGallery();
}

// ────────────────────────────────────────────
// Specialties & Why Choose Us
// ────────────────────────────────────────────

export { getSpecialtiesData, getWhyChooseUsData, getHeroData, getBeforeAfterVideo };

// ────────────────────────────────────────────
// Products (Wired to Firestore)
// ────────────────────────────────────────────

import productsImg from "@/assets/products.jpg";
import { productList as fallbackProducts } from "./data";

export const productImage = productsImg;

export async function getProductsList(): Promise<Product[]> {
  const list = await getProducts();
  if (list.length > 0) return list;
  return fallbackProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const list = await getProductsList();
  return list.find((p) => p.id === id);
}

export const productCategories = ["All", "Face Wash", "Serums", "Sunscreens", "Moisturizers", "Acne Care", "Hair Growth", "Hair Care", "Anti Aging"];
export const skinTypes = ["All", "Oily", "Dry", "Sensitive", "Combination"];
export const hairTypes = ["All", "Thinning", "Oily", "Dry", "Damaged"];

// ────────────────────────────────────────────
// Before/After (Wired to Firestore gallery collection)
// ────────────────────────────────────────────

export async function getBeforeAfterList(): Promise<BeforeAfterItem[]> {
  const list = await getBeforeAfterItems();
  if (list.length > 0) {
    return list.map((item: any) => ({
      id: item.id || "",
      treatment: item.caption || item.treatment || "Treatment",
      weeks: item.weeks || 12,
      story: item.story || "",
      beforeSrc: item.beforeSrc || item.before || "",
      afterSrc: item.afterSrc || item.after || "",
    }));
  }
  // Fallbacks
  return [
    {
      id: "ba1",
      treatment: "Acne Control Therapy",
      weeks: 12,
      story: "Acne control therapy combined with medical peels.",
      beforeSrc: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=70",
      afterSrc: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=900&q=70"
    },
    {
      id: "ba2",
      treatment: "Pigmentation & Tone Laser",
      weeks: 16,
      story: "Stubborn hyperpigmentation fading with laser sessions.",
      beforeSrc: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=70",
      afterSrc: "https://images.unsplash.com/photo-1614109800763-7b46d0a9ad44?w=900&q=70"
    },
    {
      id: "ba3",
      treatment: "PRP Hair Density Therapy",
      weeks: 20,
      story: "PRP sessions over 5 months showing hair restoration.",
      beforeSrc: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=70",
      afterSrc: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=70"
    }
  ];
}

