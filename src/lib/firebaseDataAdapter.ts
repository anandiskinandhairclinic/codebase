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
  getTestimonials,
  getBlogs,
  getGallery,
  getFAQs,
  createAppointment,
  getSpecialtiesData,
  getWhyChooseUsData,
  getBeforeAfterVideo,
} from "./firebaseServices";
import { clinic, whatsappLink, telLink } from "./clinic";

// Re-export unchanged backend functions
export { createAppointment, whatsappLink, telLink };

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
};

export type Testimonial = {
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
};

export type BeforeAfterItem = {
  id: string;
  treatment: string;
  weeks: number;
  story: string;
};

export type FAQ = { q: string; a: string };

export type Stat = { value: string; label: string };

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
  }));
}

// ────────────────────────────────────────────
// Doctor info
// ────────────────────────────────────────────

export async function getDoctorsList(): Promise<Doctor[]> {
  const doc = await getDoctorInfo();
  return [
    {
      slug: "dr-amit-jain",
      name: doc.name || "Dr. Amit Jain",
      title: doc.role || "Chief Dermatologist & Hair Transplant Specialist",
      image: doc.imageUrl || "https://res.cloudinary.com/dntsjzbei/image/upload/v1780681530/yotg2haunjnbiblavmpb.png",
      experience: "10+ years",
      qualifications: doc.qualifications || ["MBBS", "MD - Skin (Dermatology, Venereology & Leprosy)"],
      specialties: ["Dermatology", "Cosmetology", "Hair Transplant", "Laser Treatments"],
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
// Products (no Firestore collection yet — inline defaults)
// ────────────────────────────────────────────

import products from "@/assets/products.jpg";

export const productImage = products;

export const productList: Product[] = [
  { id: "p1", name: "Glow Renew Serum", category: "Serums", price: 2400, skin: "All", hair: null, benefits: ["Brightens", "Even tone", "Hydrates"], ingredients: ["Niacinamide 10%", "Vitamin C", "Hyaluronic Acid"], blurb: "Lit-from-within radiance in 4 weeks." },
  { id: "p2", name: "Gentle Calm Cleanser", category: "Face Wash", price: 950, skin: "Sensitive", hair: null, benefits: ["Calms", "Non-stripping"], ingredients: ["Centella Asiatica", "Panthenol"], blurb: "A morning ritual for reactive skin." },
  { id: "p3", name: "Velvet Veil SPF 50", category: "Sunscreens", price: 1450, skin: "All", hair: null, benefits: ["Broad spectrum", "No white cast"], ingredients: ["Zinc Oxide", "Niacinamide"], blurb: "Silken finish, daily protection." },
  { id: "p4", name: "Ceramide Cloud Cream", category: "Moisturizers", price: 1800, skin: "Dry", hair: null, benefits: ["Repairs barrier", "Plumps"], ingredients: ["Ceramide NP", "Squalane"], blurb: "Pillowy hydration that lasts 24h." },
  { id: "p5", name: "Clear Skin Spot Serum", category: "Acne Care", price: 1200, skin: "Oily", hair: null, benefits: ["Targets breakouts"], ingredients: ["Salicylic 2%", "Tea Tree"], blurb: "Calms a flare without drying out." },
  { id: "p6", name: "Root Revive Serum", category: "Hair Growth", price: 2200, skin: null, hair: "Thinning", benefits: ["Boosts density"], ingredients: ["Redensyl", "Caffeine", "Biotin"], blurb: "A nightly massage for visible thickness." },
  { id: "p7", name: "Silken Hair Mask", category: "Hair Care", price: 1650, skin: null, hair: "Dry", benefits: ["Softens", "Reduces frizz"], ingredients: ["Argan Oil", "Keratin"], blurb: "Restores salon-soft strands." },
  { id: "p8", name: "Timeless Retinol", category: "Anti Aging", price: 2900, skin: "All", hair: null, benefits: ["Smooths lines"], ingredients: ["Encapsulated Retinol 0.3%"], blurb: "Your nightly age-rewind ritual." },
  { id: "p9", name: "Clarifying Scalp Tonic", category: "Hair Care", price: 1400, skin: null, hair: "Oily", benefits: ["Balances scalp"], ingredients: ["Salicylic", "Rosemary"], blurb: "Fresh, weightless roots all day." },
  { id: "p10", name: "Bright Eye Elixir", category: "Serums", price: 1950, skin: "All", hair: null, benefits: ["De-puffs", "Brightens"], ingredients: ["Caffeine", "Peptides"], blurb: "Wake up — even when you didn't." },
  { id: "p11", name: "Soft Foam Oil Wash", category: "Face Wash", price: 990, skin: "Oily", hair: null, benefits: ["Removes excess oil"], ingredients: ["Salicylic", "Green Tea"], blurb: "A clean reset, never tight." },
  { id: "p12", name: "Hydra Mist", category: "Moisturizers", price: 1100, skin: "All", hair: null, benefits: ["Refreshes"], ingredients: ["Rose water", "HA"], blurb: "A spritz of dew on demand." },
];

export const productCategories = ["All", "Face Wash", "Serums", "Sunscreens", "Moisturizers", "Acne Care", "Hair Growth", "Hair Care", "Anti Aging"];
export const skinTypes = ["All", "Oily", "Dry", "Sensitive", "Combination"];
export const hairTypes = ["All", "Thinning", "Oily", "Dry", "Damaged"];

// ────────────────────────────────────────────
// Before/After (no Firestore collection yet — inline defaults)
// ────────────────────────────────────────────

export const beforeAfter: BeforeAfterItem[] = [
  { id: "ba1", treatment: "Acne Treatment", weeks: 12, story: "Cystic acne calmed by Week 8 with our medical + cosmeceutical protocol." },
  { id: "ba2", treatment: "Pigmentation Reset", weeks: 16, story: "Stubborn melasma fading visibly across six laser sessions." },
  { id: "ba3", treatment: "PRP Hair Therapy", weeks: 20, story: "Thicker hairline & visible regrowth in 5 months." },
  { id: "ba4", treatment: "Hydrafacial Glow", weeks: 4, story: "Brighter, tighter, more even-toned skin in just four sessions." },
];
