import { rawServices } from "./servicesData";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  process: { step: string; detail: string }[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  imageUrl?: string;
  category?: string;
};

export const serviceImages: Record<string, string> = {
  "acne-body-acne": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
  "acne-scars-marks": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  "anti-aging-pores": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "pigmentation-tanning": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "melasma": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "vitiligo": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "psoriasis": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
  "keloid": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "lichen-planus": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  "eczema": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
  "urticaria-skin-allergy": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  "fungal-infection": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  "chickenpox-herpes": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "burn-treatment": "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80",
  "rosacea": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "leprosy": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  "furuncle-infections": "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80",
  "pediatric-skin-diseases": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "sle-scleroderma": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "connective-tissue-autoimmune": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
  "ingrown-nail": "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80",
  "nail-fungal-infection": "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80",
  "nail-psoriasis": "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80",
  "all-nail-diseases": "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80",
  "skin-cancer": "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80",
  "sexually-transmitted-diseases": "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80",
  "hairfall-thinning": "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80",
  "male-pattern-hairfall": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "female-pattern-hairfall": "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80",
  "dandruff": "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80",
  "ingrown-hair": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "alopecia-areata": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "scalp-psoriasis": "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80",
  "scarring-alopecia": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "folliculitis": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "lichen-sclerosus": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  "tinea-capitis": "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80",
  "granuloma-pyogenicum-hair": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "seborrheic-dermatitis": "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80",
  "diode-laser-hair-reduction": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "laser-for-scars": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "mnrf-acne-scars": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  "q-switch-laser-pigmentation": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "laser-treatment-lpp": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "carbon-facial-laser": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  "tattoo-removal": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  "birthmark-removal": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "bindi-tattoo-removal": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  "permanent-makeup-removal": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "hifu-laser-antiaging": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
  "keloid-treatment-procedure": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "mole-removal": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
  "skintag-wart-removal": "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80",
  "mucoid-cyst-cautery": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "ingrown-nail-removal": "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80",
  "sebaceous-cyst-removal": "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80",
  "lipoma-removal": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "biopsy": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "vitiligo-surgery": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "lobuloplasty": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
  "corn-removal": "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80",
  "granuloma-pyogenicum-removal": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "prp-face": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "prp-hair": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "gfc-hair": "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80",
  "medifacial": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "hydrafacial": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "chemical-peeling": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  "dermaroller-dermapen": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  "dark-circle-lips-pigmentation": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "iv-glutathione-brightening": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  "microneedling-subcision-scars": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  "botox": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
};

export const services: Service[] = rawServices.map(s => ({
  ...s,
  imageUrl: s.imageUrl || serviceImages[s.slug] || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
}));

export const getCategory = (slug: string) => {
  const service = rawServices.find(s => s.slug === slug);
  if (service?.category) return service.category;
  
  if (["prp-therapy", "hair-fall-treatment", "laser-hair-removal", "baldness"].includes(slug)) {
    return "Trichology";
  }
  if ([
    "anti-aging-treatment",
    "cosmetology-procedures",
    "skin-polishing",
    "hydra-facial",
    "chemical-peel",
    "chemical-peelings",
    "bindi-tattoo-removal",
    "botox"
  ].includes(slug)) {
    return "Cosmetology";
  }
  if ([
    "nail-disorders",
    "nail-problems",
    "skin-allergy-treatment",
    "skin-biopsy",
    "drug-allergy",
    "hyperhydrosis"
  ].includes(slug)) {
    return "Medical Care";
  }
  return "Dermatology";
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMins: number;
  cover: string;
  body: string[];
};

export const blogs: BlogPost[] = [
  {
    slug: "best-acne-treatments",
    title: "Best Acne Treatments That Actually Work",
    excerpt: "A dermatologist-curated guide to ingredients and procedures that clear acne for good.",
    category: "Acne",
    date: "2026-04-12",
    readMins: 6,
    cover: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=70",
    body: [
      "Acne is more than a skin issue — it's a hormonal, inflammatory and lifestyle puzzle that needs a layered plan.",
      "Medical-grade retinoids, salicylic acid, benzoyl peroxide and in-clinic peels form the backbone of effective therapy.",
      "Consistency, sun protection and patient-specific tweaks are what make protocols actually work.",
    ],
  },
  {
    slug: "prp-for-hair-loss",
    title: "PRP for Hair Loss: What to Expect",
    excerpt: "How platelet rich plasma stimulates regrowth — and who it works best for.",
    category: "Hair",
    date: "2026-03-22",
    readMins: 5,
    cover: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1200&q=70",
    body: [
      "PRP harnesses your own growth factors to reactivate dormant follicles.",
      "Best results typically appear after 4–6 sessions spaced a month apart.",
      "It is safest and most effective when combined with a tailored medical plan.",
    ],
  },
  {
    slug: "daily-skin-care-tips",
    title: "Daily Skin Care Tips From a Dermatologist",
    excerpt: "Simple, science-backed habits to keep skin healthy at every age.",
    category: "Skincare",
    date: "2026-02-14",
    readMins: 4,
    cover: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=70",
    body: [
      "Cleanse gently, moisturise consistently, and never skip sunscreen.",
      "Less is more — chasing trends often hurts the skin barrier.",
    ],
  },
  {
    slug: "pigmentation-solutions",
    title: "Pigmentation Solutions for Indian Skin",
    excerpt: "Why melasma is stubborn — and the layered plan that actually fades it.",
    category: "Pigmentation",
    date: "2026-01-30",
    readMins: 6,
    cover: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=70",
    body: [
      "Sun protection is non-negotiable for any pigmentation plan.",
      "Depigmenting actives plus calibrated peels deliver the best long-term results.",
    ],
  },
  {
    slug: "chemical-peel-benefits",
    title: "Chemical Peels: Benefits, Myths & Recovery",
    excerpt: "What peels can and cannot do, and how to choose the right one for your skin.",
    category: "Procedures",
    date: "2026-01-10",
    readMins: 5,
    cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=70",
    body: [
      "Peels exfoliate at controlled depths to renew skin and treat specific concerns.",
      "Medical peels are safe for Indian skin when chosen and performed correctly.",
    ],
  },
];

export type Testimonial = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  concern: string;
  sub?: string;
  ownerReply?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Nikhil Bare",
    initials: "NB",
    rating: 5,
    date: "5 months ago",
    text: "Skin problem ke liye aaya tha, doctor ne properly explain kiya. Treatment se improvement dikh raha hai. Staff bhi helpful aahe.",
    concern: "Skin Treatment",
    sub: "Local Guide · 3 reviews · 41 photos",
    ownerReply: "Thank you for your feedback"
  },
  {
    name: "Abhay Yadav",
    initials: "AY",
    rating: 5,
    date: "4 months ago",
    text: "Mujhe skin problem thi long time se, Aandi clinic me treatment liya. Ab skin thodi glow kar rahi hai. Perfect nahi but improvement hai. Thank you doctor",
    concern: "Skin Treatment",
    sub: "1 review"
  },
  {
    name: "Reshma",
    initials: "R",
    rating: 5,
    date: "5 months ago",
    text: "Clinic thoda crowded asto, but waiting ke baad proper consultation milta hai. Doctor patiently sunte hai.",
    concern: "Consultation",
    sub: "1 review",
    ownerReply: "Thank you Reshma for your review. Sorry for the waiting time."
  },
  {
    name: "Sakshi Patil",
    initials: "SP",
    rating: 5,
    date: "a year ago",
    text: "I had been struggling with acne for years and tried several remedies with little success. A friend recommended Anandi Skin & Hair Clinic, and I’m so glad I went! The dermatologist was very thorough and explained everything in detail.",
    concern: "Acne Care",
    sub: "1 review",
    ownerReply: "Thank you so much Sakshi for your feedback"
  },
  {
    name: "Kaushal Patil",
    initials: "KP",
    rating: 5,
    date: "a year ago",
    text: "I recently visited Anandi Skin & Hair Clinic for a skin and hair consultation, and I couldn't be more satisfied with the experience. The staff was incredibly welcoming, and the clinic maintained top-notch hygiene standards.",
    concern: "Skin & Hair Consultation",
    sub: "1 review",
    ownerReply: "Thank you for your valuable feedback"
  },
  {
    name: "Shubham Pawar",
    initials: "SP",
    rating: 5,
    date: "5 months ago",
    text: "I had severe allergy on whole body . Got great results instantly. Dr explained everything well",
    concern: "Skin Allergy",
    sub: "1 review",
    ownerReply: "Thank you for your feedback"
  },
  {
    name: "Yashwant More",
    initials: "YM",
    rating: 5,
    date: "a year ago",
    text: "I've visited the clinic i went for acne scars and oily skin dr vishakha properly checked my skin and started the procedure then explained everything that how I'm going to get rid of it",
    concern: "Acne Scars & Oily Skin",
    sub: "2 reviews",
    ownerReply: "Thank you for your valuable feedback"
  },
  {
    name: "Sneha Patil",
    initials: "SP",
    rating: 5,
    date: "a year ago",
    text: "I recently visited Anandi Skin & Hair Clinic for a skin and hair consultation, and I couldn't be more satisfied with the experience. The staff was incredibly welcoming, and the clinic maintained top-notch hygiene standards",
    concern: "Skin & Hair Consultation",
    sub: "1 review",
    ownerReply: "Thank you Sneha for you valuable feedback. Do visit again for your quaterly hydrafacial"
  },
  {
    name: "Dr. Suleman Mulla",
    initials: "SM",
    rating: 5,
    date: "a year ago",
    text: "Best and well experienced Dermatologist in Area.. must visit 😊👍🏻",
    concern: "Consultation",
    sub: "11 reviews · 2 photos",
    ownerReply: "Thank you for your valuable feedback"
  },
  {
    name: "Sagar Sasane",
    initials: "SS",
    rating: 5,
    date: "a month ago",
    text: "Good treatment for skin related",
    concern: "Skin Care",
    sub: "9 reviews · 8 photos"
  },
  {
    name: "Sohel Shaikh",
    initials: "SS",
    rating: 5,
    date: "4 months ago",
    text: "Aandi hair and skin clinic khup chan ahe. Me hair fall sathi gelo hoto, 2 mahinyat farak disla. Doctor calm aahet ani proper explain kartat",
    concern: "Hair Fall Treatment",
    sub: "3 reviews",
    ownerReply: "Thank you for your valuable feedback"
  },
  {
    name: "Vishal Kusale",
    initials: "VK",
    rating: 5,
    date: "4 months ago",
    text: "Aandi clinic cha experience changla hota. Doctor khup friendly aahet. Hindi aur Marathi dono me samjha dete hai, isliye tension nahi hota.",
    concern: "Consultation",
    sub: "3 reviews",
    ownerReply: "Thank you for the feedback"
  },
  {
    name: "Shrutika Dhone",
    initials: "SD",
    rating: 5,
    date: "4 months ago",
    text: "Best clinic for hair treatment. I have dandruff problem, please consult me. Medicine is regular and results are good. It takes patience but it is worth it.",
    concern: "Dandruff Treatment",
    sub: "3 reviews",
    ownerReply: "Thanks Shrutika for your valuable feedback"
  },
  {
    name: "KRISHNA DABHADE",
    initials: "KD",
    rating: 5,
    date: "4 months ago",
    text: "Doctor khup patiently sagla explain kartat. Majha acne problem khup kami zala aahe ata. Thank you Anandi clinic.",
    concern: "Acne Care",
    sub: "Local Guide · 7 reviews · 9 photos",
    ownerReply: "Thank you Krishna for your feedback"
  },
  {
    name: "veeresh birajdar",
    initials: "VB",
    rating: 5,
    date: "5 months ago",
    text: "Mala skin allergy sathi treatmnt ghetla, itching khup kami zali. Overall satisfied aahe",
    concern: "Skin Allergy",
    sub: "2 reviews · 7 photos",
    ownerReply: "Thanks for your valuable feedback"
  },
  {
    name: "Pratik Jadhav",
    initials: "PJ",
    rating: 5,
    date: "a year ago",
    text: "My hair was thick and thin, I used to lose my hair constantly, I went to the clinic and I am getting my treatment as per the information given by Dr. Vishakha. Now my hair loss has completely disappeared, the fear of baldness that I had is gone.",
    concern: "Hair Loss Treatment",
    sub: "2 reviews",
    ownerReply: "feedback dilya baddal Thank you pratik"
  },
  {
    name: "Rushikesh Ragde",
    initials: "RR",
    rating: 5,
    date: "5 months ago",
    text: "Very professional clinic. Great experience with the staff and dermatologist.",
    concern: "Skin Care",
    sub: "1 review · 1 photo"
  }
];

export const galleryImages = [
  // Doctor Images
  { src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80", category: "Doctor", caption: "Dr. Vishakha Padmakar Patil — Chief Dermatologist" },
  // Clinic Images
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=70", category: "Clinic", caption: "Reception Area" },
  { src: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1000&q=70", category: "Clinic", caption: "Consultation Room" },
  { src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=1000&q=70", category: "Clinic", caption: "Lobby & Waiting Area" },
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&q=70", category: "Clinic", caption: "Clinic Exterior" },
  { src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&q=70", category: "Clinic", caption: "Modern Interiors" },
  // Treatment Images
  { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1000&q=70", category: "Treatments", caption: "Procedure Suite" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1000&q=70", category: "Treatments", caption: "Hydrafacial" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&q=70", category: "Treatments", caption: "Laser Suite" },
  // Before & After
  {
    beforeSrc: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=70",
    afterSrc: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=900&q=70",
    category: "Before & After",
    caption: "Acne Control Therapy"
  },
  {
    beforeSrc: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=70",
    afterSrc: "https://images.unsplash.com/photo-1614109800763-7b46d0a9ad44?w=900&q=70",
    category: "Before & After",
    caption: "Pigmentation & Tone Laser"
  },
  {
    beforeSrc: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=70",
    afterSrc: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=70",
    category: "Before & After",
    caption: "PRP Hair Density Therapy"
  }
];

export const faqs = [
  { q: "Do I need an appointment to visit?", a: "Yes, appointments help us serve you on time. You can book online or via WhatsApp." },
  { q: "Are treatments safe for sensitive Indian skin?", a: "Absolutely. All protocols are evidence-based and calibrated for darker skin tones." },
  { q: "What is the consultation fee?", a: "Please contact the clinic for current fees. Transparent pricing, no hidden costs." },
  { q: "Do you treat both men and women?", a: "Yes, we treat patients of all ages and genders." },
  { q: "How soon will I see results?", a: "Most patients notice meaningful improvement within 4–8 weeks of starting therapy." },
];

export const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "15,000+", label: "Happy Patients" },
  { value: "5.0★", label: "Google Rating" },
  { value: "20+", label: "Treatments Offered" },
];

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
  concerns?: string[];
};

export const productList: Product[] = [
  { id: "p1", name: "Ultrawave SPF 50 Sunscreen", category: "Sunscreens", price: 1450, skin: "Combination", hair: null, benefits: ["Broad spectrum protection", "Non-greasy finish"], ingredients: ["Zinc Oxide", "Titanium Dioxide"], blurb: "Sun protection calibrated for oily & combination skin.", concerns: ["Oily Skin", "Combination Skin"] },
  { id: "p2", name: "UV off Green Sunscreen", category: "Sunscreens", price: 1300, skin: "Dry", hair: null, benefits: ["Natural mineral filters", "Hydrating formula"], ingredients: ["Green Tea Extract", "Zinc Oxide"], blurb: "Eco-friendly mineral sun shield for dry and combination skin.", concerns: ["Combination Skin", "Dry Skin"] },
  { id: "p3", name: "UV off Sunscreen", category: "Sunscreens", price: 1250, skin: "All", hair: null, benefits: ["Matte finish", "Brightens skin tone"], ingredients: ["Niacinamide", "UV Filters"], blurb: "Oil control and brightening sunscreen protection.", concerns: ["Oily Skin", "Combination Skin", "Dullness / Brightening"] },
  { id: "p4", name: "Skin Elixir Facewash", category: "Face Wash", price: 950, skin: "Oily", hair: null, benefits: ["Brightening", "Oil control"], ingredients: ["Vitamin C", "Salicylic Acid"], blurb: "Revitalizing cleanse for a brighter, shine-free complexion.", concerns: ["Oily Skin", "Dullness / Brightening"] },
  { id: "p5", name: "Ectoin Facewash", category: "Face Wash", price: 1100, skin: "All", hair: null, benefits: ["Provides deep cleanse", "Soothes acne", "Barrier support"], ingredients: ["Ectoin", "Gentle Surfactants"], blurb: "Deep cleansing action that protects skin barrier while treating acne.", concerns: ["Acne", "Oily Skin", "Combination Skin", "Dullness / Brightening"] },
  { id: "p6", name: "Clevor Snail Mucin", category: "Serums", price: 2100, skin: "All", hair: null, benefits: ["Provides glass skin", "Anti-ageing benefit"], ingredients: ["Snail Secretion Filtrate 96%", "Hyaluronic Acid"], blurb: "Advanced glass skin formulation to smooth out fine lines.", concerns: ["Fine Lines", "Uneven Texture"] },
  { id: "p7", name: "Skinelixir Moisturizer", category: "Moisturizers", price: 1350, skin: "All", hair: null, benefits: ["Hydration without greasy skin", "Lightweight formula"], ingredients: ["Hyaluronic Acid", "Squalane"], blurb: "Pillowy hydration tailored to oily and combination skin.", concerns: ["Oily Skin", "Normal Skin", "Combination Skin"] },
  { id: "p8", name: "Ultrawave Matte Sunscreen Gel", category: "Sunscreens", price: 1500, skin: "Oily", hair: null, benefits: ["Matte gel finish", "Broad spectrum protection"], ingredients: ["Zinc Oxide", "Silica"], blurb: "A weightless gel sunscreen with a zero-shine matte finish.", concerns: ["Oily Skin"] },
  { id: "p9", name: "Lewash Facewash", category: "Face Wash", price: 890, skin: "Normal", hair: null, benefits: ["Face cleansing", "Gentle impurities removal"], ingredients: ["Aloe Vera Extract", "Glycerin"], blurb: "Gentle daily foaming cleanser for balanced skin.", concerns: ["Normal Skin", "Combination Skin", "Oily Skin"] },
  { id: "p10", name: "Exne Facewash", category: "Face Wash", price: 990, skin: "Sensitive", hair: null, benefits: ["Cleanses dull skin", "Calms sensitivity"], ingredients: ["Centella Asiatica", "Chamomile"], blurb: "Calming wash to restore radiance in sensitive, dull skin.", concerns: ["Normal Skin", "Sensitive Skin", "Combination Skin", "Dullness / Brightening"] },
  { id: "p11", name: "Solaire Tint Sunscreen", category: "Sunscreens", price: 1600, skin: "Oily", hair: null, benefits: ["Tinted sunscreen protection", "Corrects dullness"], ingredients: ["Iron Oxides", "Titanium Dioxide"], blurb: "Mineral protection with a sheer skin-evening tint.", concerns: ["Oily Skin", "Dullness / Brightening"] },
  { id: "p12", name: "True Barrier Moisturizer", category: "Moisturizers", price: 1750, skin: "Sensitive", hair: null, benefits: ["Barrier repair", "Deep skin soothing"], ingredients: ["Ceramides Complex", "Oat Extract"], blurb: "Calming relief for compromised, dry, and sensitive skin.", concerns: ["Dry Skin", "Sensitive Skin"] },
  { id: "p13", name: "Hydrant Sunscreen", category: "Sunscreens", price: 1550, skin: "Dry", hair: null, benefits: ["Deep skin hydration", "Sun protection"], ingredients: ["Hyaluronic Acid", "Organic UV filters"], blurb: "Ultra-hydrating sunscreen lotion for dry and sensitive skin types.", concerns: ["Dry Skin", "Normal Skin", "Sensitive Skin"] },
  { id: "p14", name: "Lumisper Serum", category: "Serums", price: 2400, skin: "All", hair: null, benefits: ["Antiageing support", "Brightening glow"], ingredients: ["Retinol 0.2%", "Vitamin C"], blurb: "A glow-boosting youth serum targeting fine lines and dullness.", concerns: ["Fine Lines", "Dullness / Brightening"] },
  { id: "p15", name: "Selfyskin Tinted Sunscreen", category: "Sunscreens", price: 1800, skin: "All", hair: null, benefits: ["Provides foundation-like tint", "Regular makeup replacement"], ingredients: ["Tint particles", "Zinc Oxide"], blurb: "Foundation coverage and sun shield in a single step.", concerns: ["Dullness / Brightening", "Sunburn & Tan"] },
  { id: "p16", name: "Peridew Cleanser Facewash", category: "Face Wash", price: 850, skin: "Sensitive", hair: null, benefits: ["Soothes dry skin", "Hypoallergenic cleanse"], ingredients: ["Oatmeal Extract", "Panthenol"], blurb: "Extra-gentle non-foaming cream wash for dry, hyper-sensitive skin.", concerns: ["Dry Skin", "Sensitive Skin"] },
  { id: "p17", name: "Peridew Oat Moisturizer Lotion", category: "Moisturizers", price: 1400, skin: "All", hair: null, benefits: ["Hydrating oat lotion", "All skin type suitability"], ingredients: ["Colloidal Oatmeal 1%", "Squalane"], blurb: "Lighter lotion formulation suitable for all skin types including oily.", concerns: ["Oily Skin", "Dry Skin", "Normal Skin", "Sensitive Skin", "Combination Skin"] },
  { id: "p18", name: "Lumifair Facewash", category: "Face Wash", price: 950, skin: "All", hair: null, benefits: ["Brightening skin dullness", "Refreshes complexion"], ingredients: ["Glycolic Acid 2%", "Licorice Root"], blurb: "Exfoliating glow wash to remove daily build-up and dullness.", concerns: ["Oily Skin", "Normal Skin", "Combination Skin", "Dullness / Brightening"] },
  { id: "p19", name: "Glutapris Tablets", category: "Kits", price: 1200, skin: "All", hair: null, benefits: ["Brightening glow from within", "Antioxidant tablets"], ingredients: ["L-Glutathione 500mg", "Vitamin C 1000mg"], blurb: "Effervescent skin radiance booster tablets.", concerns: ["Dullness / Brightening"] },
  { id: "p20", name: "Sebocyte Acne Serum", category: "Serums", price: 2200, skin: "Oily", hair: null, benefits: ["Prevents breakouts", "Clears active acne", "Smoothens texture"], ingredients: ["Salicylic Acid 2%", "Niacinamide 5%"], blurb: "Triple action acne treatment serum.", concerns: ["Acne", "Acne Scars", "Oily Skin"] },
  { id: "p21", name: "Spotfix Salicylic Acne Patch", category: "Acne Care", price: 450, skin: "All", hair: null, benefits: ["Targets active acne overnight", "Hydrocolloid defense"], ingredients: ["Salicylic Acid 0.5%", "Hydrocolloid"], blurb: "Discreet pimple patches to speed up acne recovery.", concerns: ["Acne"] },
  { id: "p22", name: "Selfyskin Strong Moisturizer", category: "Moisturizers", price: 1900, skin: "All", hair: null, benefits: ["Hydrates face & body", "Deep barrier replenishment"], ingredients: ["Shea Butter", "Ceramides Complex"], blurb: "Rich nourishing cream for dry body and face areas.", concerns: ["Dry Skin", "Normal Skin", "Sensitive Skin", "Combination Skin"] },
  { id: "p23", name: "Solban Tinted Mineral Sunscreen", category: "Sunscreens", price: 1650, skin: "Dry", hair: null, benefits: ["Tinted mineral defense", "Hydrating formula"], ingredients: ["Zinc Oxide", "Iron Oxides", "Hyaluronic Acid"], blurb: "100% physical mineral sun cream for dry, sensitive skin types.", concerns: ["Dry Skin", "Normal Skin"] },
  { id: "p24", name: "Clevor Sunscreen SPF 50", category: "Sunscreens", price: 1850, skin: "All", hair: null, benefits: ["Sunscreen shielding", "Brightening + Hydrating"], ingredients: ["Vitamin C", "Zinc Oxide", "Hyaluronic Acid"], blurb: "Brightening hybrid sun protection that intensely hydrates.", concerns: ["Dry Skin", "Sensitive Skin", "Normal Skin", "Dullness / Brightening"] }
];