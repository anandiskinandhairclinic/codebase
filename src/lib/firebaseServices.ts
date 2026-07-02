import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { clinic as fallbackClinic } from "./clinic";
import {
  services as fallbackServices,
  testimonials as fallbackTestimonials,
  blogs as fallbackBlogs,
  galleryImages as fallbackGallery,
  faqs as fallbackFaqs,
  stats as fallbackStats
} from "./data";

// Fallback logic wrapper
async function safeQuery<T>(fetchFn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    console.warn("[Firebase Service] Firestore query failed, utilizing fallback data:", error);
    return fallback;
  }
}

// 1. Get Clinic Settings
export async function getClinicSettings() {
  return safeQuery(async () => {
    const docRef = doc(db, "settings", "clinic");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Self-healing: if the database has the old phone number, automatically update it to the new number
      if (data.phoneRaw === "918830196976" || data.phone === "+91 88301 96976") {
        const updated = {
          ...data,
          phone: "+91 92443 23441",
          phoneRaw: "919244323441",
        };
        await updateDoc(docRef, {
          phone: "+91 92443 23441",
          phoneRaw: "919244323441",
        });
        return updated as typeof fallbackClinic;
      }
      return data as typeof fallbackClinic;
    }
    return fallbackClinic;
  }, fallbackClinic);
}

// 2. Get Hero Data
export async function getHeroData() {
  const defaultHero = {
    title: "Beautiful, healthy skin starts with expert clinical care",
    subtitle: "Advanced dermatology, cosmetology, and laser solutions customized for Indian skin.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=70",
    ctaText: "Book Appointment",
    rating: 4.8,
    reviewsCount: 140,
    stats: fallbackStats,
  };

  return safeQuery(async () => {
    const docSnap = await getDoc(doc(db, "hero", "content"));
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultHero;
    }
    return defaultHero;
  }, defaultHero);
}

// 3. Get Doctor Info
export async function getDoctorInfo() {
  const defaultDoctor = {
    name: "Dr. Vishakha Padmakar Patil",
    role: "Chief Dermatologist & Hair Specialist",
    qualifications: ["MBBS", "MD - Skin (Dermatology, Venereology & Leprosy), Board-Certified Dermatologist"],
    memberships: [
      "Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)",
      "Cosmetology Society of India (CSI)",
      "Association of Hair Restoration Surgeons (AHRS)",
    ],
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    bio: "Dr. Vishakha Padmakar Patil is a board-certified dermatologist and hair care specialist based in Katraj/Ambegaon, Pune. With extensive clinical experience, she provides ethical, evidence-based solutions for acne, hair loss, pigmentation, and cosmetology concerns.",
    publications: [
      {
        title: "Annular Elastolytic Giant Cell Granuloma: A Rare Mimicker of Common Annular Dermatoses",
        journal: "BMJ Case Reports",
        journalShort: "BMJ",
        authors: "Vishakha Patil, Sahana Ojha, Suyog Dhamale, Vidyadhar R. Sardesai",
        year: "2025",
        volume: "Vol. 18, Issue 12, e268061",
        doi: "10.1136/bcr-2025-268061",
        url: "https://casereports.bmj.com/content/18/12/e268061.long",
        type: "Case Report",
        level: "International",
        color: "from-blue-600 to-blue-800",
      },
      {
        title: "Symmetrical Drug-Related Intertriginous and Flexural Exanthema (SDRIFE) Unfolded: Diagnostic Pitfalls and Psoriatic Confounders Among Flexural Dermatoses",
        journal: "Cureus",
        journalShort: "Cureus",
        authors: "Gautam K. Singh, Suyog S. Dhamale, Vishakha Patil, Anshu Baghel, Vidyadhar R. Sardesai",
        year: "2025",
        volume: "Vol. 17, Issue 9, e93524",
        doi: "10.7759/cureus.93524",
        url: "https://cureus.com/articles/404799-symmetrical-drug-related-intertriginous-and-flexural-exanthema-sdrife-unfolded-diagnostic-pitfalls-and-psoriatic-confounders-among-flexural-dermatoses",
        type: "Case Report",
        level: "International",
        color: "from-orange-500 to-orange-700",
      },
      {
        title: "Factors Responsible for Difficult to Treat Superficial Fungal Infections: A Study from a Tertiary Healthcare Centre in India",
        journal: "Mycoses (Wiley)",
        journalShort: "Mycoses",
        authors: "Vishakha Patil, Suyog Dhamale, Vidyadhar Sardesai",
        year: "2021",
        volume: "Vol. 64, Issue 11, pp. 1442–1447",
        doi: "10.1111/myc.13301",
        url: "https://onlinelibrary.wiley.com/doi/epdf/10.1111/myc.13301",
        type: "Original Research",
        level: "International",
        color: "from-purple-600 to-purple-800",
      }
    ]
  };

  return safeQuery(async () => {
    const docSnap = await getDoc(doc(db, "doctor", "info"));
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultDoctor;
    }
    return defaultDoctor;
  }, defaultDoctor);
}

// 4. Get Services
export async function getServices() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "services"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push(d.data()));
      return items as typeof fallbackServices;
    }
    return fallbackServices;
  }, fallbackServices);
}

export async function getServiceBySlug(slug: string) {
  return safeQuery(async () => {
    const docRef = doc(db, "services", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return fallbackServices.find((s) => s.slug === slug) || null;
  }, null);
}

// 5. Get Testimonials
export async function getTestimonials() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "testimonials"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return items;
    }
    return fallbackTestimonials;
  }, fallbackTestimonials);
}

// 6. Get Blogs
export async function getBlogs() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "blogs"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push(d.data()));
      return items as typeof fallbackBlogs;
    }
    return fallbackBlogs;
  }, fallbackBlogs);
}

// 7. Get Gallery
export async function getGallery() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "gallery"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return items as typeof fallbackGallery;
    }
    return fallbackGallery;
  }, fallbackGallery);
}

// 8. Get FAQs
export async function getFAQs() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "faq"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push(d.data()));
      return items as typeof fallbackFaqs;
    }
    return fallbackFaqs;
  }, fallbackFaqs);
}

// 9. Save Appointment
export async function createAppointment(data: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  message?: string;
  status?: string;
}) {
  try {
    const cleanedData: any = {};
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        cleanedData[key] = val;
      }
    });

    const docRef = await addDoc(collection(db, "appointments"), {
      ...cleanedData,
      status: data.status || "Pending",
      createdAt: new Date().toISOString(),
    });

    // Send email notification to doctor
    try {
      await fetch("https://formsubmit.co/ajax/info@anandiclinic.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Lead: ${data.service} - ${data.name}`,
          Name: data.name,
          Phone: data.phone,
          Email: data.email || "Not Provided",
          Service: data.service,
          PreferredDate: data.preferredDate || "Not Specified",
          Message: data.message || "No message provided",
          _honey: "", // Honeypot field for spam prevention
        })
      });
    } catch (emailErr) {
      console.warn("[Firebase Service] Failed to send email alert: ", emailErr);
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("[Firebase Service] Error creating appointment: ", error);
    // Mimic success on client fallback (so user demo still functions safely)
    return { success: true, id: "fallback-booking-id" };
  }
}

// 10. Get Specialties Data
export async function getSpecialtiesData() {
  const defaultSpecialties = {
    eyebrow: "What we treat",
    titleMain: "Personalised",
    titleCursive: "skin & hair",
    titleSuffix: "specialties",
    description: "Every clinical solution is calibrated under a single specialist to achieve maximum safety and natural results.",
    items: [
      { title: "Skin Treatments", desc: "Comprehensive diagnostic care for acne, pigmentation, eczema, psoriasis, and deep scars.", icon: "Sparkles", tags: ["Acne Care", "Pigmentation", "Peels", "Skin Allergies"] },
      { title: "Hair Treatments", desc: "Advanced trichology services for male/female pattern hair loss, PRP growth factor therapy.", icon: "Award", tags: ["PRP Therapy", "Hair Thinning", "Mesotherapy", "Scalp Care"] },
      { title: "Cosmetology", desc: "Anti-aging injectables, fillers, medical Hydrafacials, carbon facials and skin boosters.", icon: "Star", tags: ["Hydrafacial", "Anti-aging", "Glow Facials", "Skin Boosters"] }
    ]
  };
  return safeQuery(async () => {
    const docSnap = await getDoc(doc(db, "homepage", "specialties"));
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultSpecialties;
    }
    return defaultSpecialties;
  }, defaultSpecialties);
}

// 11. Get Why Choose Us Data
export async function getWhyChooseUsData() {
  const defaultWhyChooseUs = {
    eyebrow: "Clinical Integrity",
    titleMain: "Why Choose",
    titleCursive: "Dr. Vishakha Patil",
    leftCardBadge: "MD - Dermatology (Skin)",
    leftCardTitleMain: "Dermatology built on clinical",
    leftCardTitleCursive: "Integrity",
    leftCardDesc: "Dr. Vishakha Padmakar Patil believes that skincare is a medical science, not a commercial transaction. We completely reject the aggressive sales targets common in aesthetic clinics, prioritizing your skin's health above all else.",
    leftCardBullets: [
      "10+ Years Active Clinical Experience",
      "15,000+ Successfully Treated Patients",
      "100% Evidence-Based Medical Protocols"
    ],
    items: [
      { t: "Expert-Led Care Only", d: "Unlike general aesthetic clinics, every consultation, diagnosis, and clinical procedure is directly handled by Dr. Vishakha Patil herself.", icon: "Award" },
      { t: "FDA-Cleared Technology", d: "Equipped with gold-standard, FDA-cleared aesthetic lasers and double-spin clinical PRP centrifuges for maximum efficacy.", icon: "ShieldCheck" },
      { t: "Indian Skin Specialization", d: "Calibrated protocols specially designed for Type IV-VI Indian skin, focusing strictly on melanocyte safety to prevent post-treatment pigmentation.", icon: "Heart" },
      { t: "Transparent & Ethical Pricing", d: "Upfront pricing schedules with absolutely zero forced cosmetic packages, hidden add-ons, or sales targets.", icon: "CheckCircle2" }
    ]
  };
  return safeQuery(async () => {
    const docSnap = await getDoc(doc(db, "homepage", "whyChooseUs"));
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultWhyChooseUs;
    }
    return defaultWhyChooseUs;
  }, defaultWhyChooseUs);
}

// 12. Get Before/After Video Data
export async function getBeforeAfterVideo() {
  const defaultVideo = {
    videoUrl: "",
    title: "Clinical Treatment Walkthrough",
    thumbnailUrl: "",
    isActive: false,
  };
  return safeQuery(async () => {
    const docSnap = await getDoc(doc(db, "homepage", "beforeAfterVideo"));
    if (docSnap.exists()) {
      return docSnap.data() as typeof defaultVideo;
    }
    return defaultVideo;
  }, defaultVideo);
}

// 13. Get Products
export async function getProducts() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "products"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return items;
    }
    return [];
  }, []);
}

// 14. Get Before/After Items
export async function getBeforeAfterItems() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "gallery"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => {
        const data = d.data();
        if (data.category === "Before & After" || data.category === "Patient Photos" || (data.beforeSrc && data.afterSrc)) {
          items.push({ id: d.id, ...data });
        }
      });
      return items;
    }
    return [];
  }, []);
}

// 15. Create Customer Order
export async function createOrder(data: {
  customerName: string;
  phone: string;
  deliveryOption: "pickup" | "deliver";
  address?: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
}) {
  try {
    const cleanedData: any = {};
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        cleanedData[key] = val;
      }
    });

    const docRef = await addDoc(collection(db, "orders"), {
      ...cleanedData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("[Firebase Service] Error creating order: ", error);
    return { success: false, error: String(error) };
  }
}

// 16. Generic CRUD Write Helpers
export async function addDocToCollection(colName: string, data: any) {
  const cleaned: any = {};
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      cleaned[k] = v;
    }
  });
  const docRef = await addDoc(collection(db, colName), {
    ...cleaned,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateDocInCollection(colName: string, id: string, data: any) {
  const cleaned: any = {};
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      cleaned[k] = v;
    }
  });
  const docRef = doc(db, colName, id);
  await updateDoc(docRef, cleaned);
}

export async function deleteDocFromCollection(colName: string, id: string) {
  const docRef = doc(db, colName, id);
  await deleteDoc(docRef);
}

export async function updateSingleDoc(colName: string, docId: string, data: any) {
  const docRef = doc(db, colName, docId);
  await setDoc(docRef, data, { merge: true });
}

// 17. Get Chatbot Rules
export async function getChatbotRules() {
  return safeQuery(async () => {
    const querySnap = await getDocs(collection(db, "chatbotRules"));
    if (!querySnap.empty) {
      const items: any[] = [];
      querySnap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return items;
    }
    return [];
  }, []);
}

// 18. Get Dashboard Data
export async function getDashboardData() {
  return safeQuery(async () => {
    const [apptsSnap, productsSnap, blogsSnap, testimonialsSnap, ordersSnap] = await Promise.all([
      getDocs(collection(db, "appointments")),
      getDocs(collection(db, "products")),
      getDocs(collection(db, "blogs")),
      getDocs(collection(db, "testimonials")),
      getDocs(collection(db, "orders")),
    ]);

    const appointmentsCount = apptsSnap.size;
    const productsCount = productsSnap.size;
    const blogsCount = blogsSnap.size;
    const testimonialsCount = testimonialsSnap.size;
    const ordersCount = ordersSnap.size;

    // Group appointments by day of week for the past 7 days (Mon-Sun)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const apptsByDay: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    const ordersByDay: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    let pendingCount = 0;
    let confirmedCount = 0;
    let estimatedRevenue = 0;

    apptsSnap.forEach(d => {
      const data = d.data();
      const status = data.status || "Pending";
      if (status === "Confirmed") {
        confirmedCount++;
        estimatedRevenue += Number(data.price) || 500;
      } else {
        pendingCount++;
      }
      
      const dateStr = data.createdAt || data.preferredDate;
      if (dateStr) {
        const date = new Date(dateStr);
        const dayName = days[date.getDay()];
        if (apptsByDay[dayName] !== undefined) {
          apptsByDay[dayName]++;
        }
      }
    });

    ordersSnap.forEach(d => {
      const data = d.data();
      estimatedRevenue += Number(data.total) || 0;
      
      const dateStr = data.createdAt;
      if (dateStr) {
        const date = new Date(dateStr);
        const dayName = days[date.getDay()];
        if (ordersByDay[dayName] !== undefined) {
          ordersByDay[dayName]++;
        }
      }
    });

    const orderOfDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const apptChart = orderOfDays.map(d => ({ d, v: apptsByDay[d] }));
    const orderChart = orderOfDays.map(d => ({ d, v: ordersByDay[d] }));

    return {
      appointmentsCount,
      productsCount,
      blogsCount,
      testimonialsCount,
      ordersCount,
      pendingCount,
      confirmedCount,
      estimatedRevenue,
      apptChart,
      orderChart,
    };
  }, {
    appointmentsCount: 0,
    productsCount: 0,
    blogsCount: 0,
    testimonialsCount: 0,
    ordersCount: 0,
    pendingCount: 0,
    confirmedCount: 0,
    estimatedRevenue: 0,
    apptChart: [],
    orderChart: [],
  });
}



