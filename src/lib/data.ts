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
};

export const productList: Product[] = [
  { id: "p1", name: "Glow Renew Serum", category: "Serums", price: 2400, skin: "All", hair: null, benefits: ["Brightens", "Even tone", "Hydrates"], ingredients: ["Niacinamide 10%", "Vitamin C", "Hyaluronic Acid"], blurb: "Lit-from-within radiance in 4 weeks." },
  { id: "p2", name: "Gentle Calm Cleanser", category: "Face Wash", price: 950, skin: "Sensitive", hair: null, benefits: ["Calms", "Non-stripping"], ingredients: ["Centella Asiatica", "Panthenol"], blurb: "A morning ritual for reactive skin." },
  { id: "p3", name: "Velvet Veil SPF 50", category: "Sunscreens", price: 1450, skin: "All", hair: null, benefits: ["Broad spectrum", "No white cast"], ingredients: ["Zinc Oxide", "Niacinamide"], blurb: "Silken finish, daily protection." },
  { id: "p4", name: "Ceramide Cloud Cream", category: "Moisturizers", price: 1800, skin: "Dry", hair: null, benefits: ["Repairs barrier", "Plumps"], ingredients: ["Ceramide NP", "Squalane"], blurb: "Pillowy hydration that lasts 24h." },
  { id: "p5", name: "Clear Skin Spot Serum", category: "Acne Care", price: 500, skin: "Oily", hair: null, benefits: ["Targets breakouts"], ingredients: ["Salicylic 2%", "Tea Tree"], blurb: "Calms a flare without drying out." },
  { id: "p6", name: "Root Revive Serum", category: "Hair Growth", price: 2200, skin: null, hair: "Thinning", benefits: ["Boosts density"], ingredients: ["Redensyl", "Caffeine", "Biotin"], blurb: "A nightly massage for visible thickness." },
  { id: "p7", name: "Silken Hair Mask", category: "Hair Care", price: 1650, skin: null, hair: "Dry", benefits: ["Softens", "Reduces frizz"], ingredients: ["Argan Oil", "Keratin"], blurb: "Restores salon-soft strands." },
  { id: "p8", name: "Timeless Retinol", category: "Anti Aging", price: 2900, skin: "All", hair: null, benefits: ["Smooths lines"], ingredients: ["Encapsulated Retinol 0.3%"], blurb: "Your nightly age-rewind ritual." },
  { id: "p9", name: "Clarifying Scalp Tonic", category: "Hair Care", price: 1400, skin: null, hair: "Oily", benefits: ["Balances scalp"], ingredients: ["Salicylic", "Rosemary"], blurb: "Fresh, weightless roots all day." },
  { id: "p10", name: "Bright Eye Elixir", category: "Serums", price: 1950, skin: "All", hair: null, benefits: ["De-puffs", "Brightens"], ingredients: ["Caffeine", "Peptides"], blurb: "Wake up — even when you didn't." },
  { id: "p11", name: "Soft Foam Oil Wash", category: "Face Wash", price: 990, skin: "Oily", hair: null, benefits: ["Removes excess oil"], ingredients: ["Salicylic", "Green Tea"], blurb: "A clean reset, never tight." },
  { id: "p12", name: "Hydra Mist", category: "Moisturizers", price: 1100, skin: "All", hair: null, benefits: ["Refreshes"], ingredients: ["Rose water", "HA"], blurb: "A spritz of dew on demand." }
];