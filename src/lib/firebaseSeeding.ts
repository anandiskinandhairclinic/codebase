import { db } from "./firebase";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";

export async function seedClinicDatabase() {
  try {
    const settingsSnap = await getDocs(collection(db, "settings"));
    if (!settingsSnap.empty) {
      console.log("[Firebase Seeding] Firestore is already seeded.");
      
      // Self-healing check: check if Before & After items are present in the gallery collection
      try {
        const gallerySnap = await getDocs(collection(db, "gallery"));
        let hasBeforeAfter = false;
        gallerySnap.forEach((doc) => {
          const data = doc.data();
          if (data.category === "Before & After" || (data.beforeSrc && data.afterSrc)) {
            hasBeforeAfter = true;
          }
        });

        if (!hasBeforeAfter) {
          console.log("[Firebase Seeding] No 'Before & After' items found in Firestore. Seeding mock transformations...");
          const beforeAfterItems = [
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
          for (const item of beforeAfterItems) {
            await addDoc(collection(db, "gallery"), item);
          }
          console.log("[Firebase Seeding] Successfully injected mock Before & After transformations!");
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed gallery items:", err);
      }
      return;
    }

    console.log("[Firebase Seeding] Beginning database seeding...");

    // 1. Settings Collection
    await setDoc(doc(db, "settings", "clinic"), {
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
      mapEmbed: "https://www.google.com/maps?q=Olive+Shopping+Complex+Katraj+Pune&output=embed",
      socials: {
        instagram: "#",
        facebook: "#",
        youtube: "#",
      },
    });

    // 2. Hero Collection
    await setDoc(doc(db, "hero", "content"), {
      title: "Beautiful, healthy skin starts with expert clinical care",
      subtitle: "Advanced dermatology, cosmetology, and laser solutions customized for Indian skin.",
      imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=70",
      ctaText: "Book Appointment",
      rating: 4.8,
      reviewsCount: 140,
      stats: [
        { value: "10+", label: "Years of Experience" },
        { value: "15,000+", label: "Happy Patients" },
        { value: "4.8★", label: "Google Rating" },
        { value: "20+", label: "Treatments Offered" },
      ],
    });

    // 3. Doctor Bio
    await setDoc(doc(db, "doctor", "info"), {
      name: "Dr. Amit Jain",
      role: "Chief Dermatologist & Hair Transplant Specialist",
      qualifications: ["MBBS from prestigious university", "MD - Skin (Dermatology, Venereology & Leprosy)"],
      memberships: [
        "Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)",
        "Cosmetology Society of India (CSI)",
        "Association of Hair Restoration Surgeons (AHRS)",
      ],
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=70",
      bio: "Dr. Amit Jain is a highly experienced skin specialist based in Katraj, Pune. Over the last 10+ years, he has successfully delivered clinical and aesthetic solutions for thousands of patients with a patient-first ethos.",
    });

    // 4. Services Collection
    const servicesList = [
      {
        slug: "acne-treatment",
        title: "Acne Treatment",
        short: "Clear, calm skin with dermatologist-led acne protocols.",
        icon: "Sparkles",
        overview: "Personalised, evidence-based acne care combining medical-grade topicals, oral therapy when needed, and in-clinic procedures like comedone extraction and chemical peels for lasting clarity.",
        symptoms: [
          "Whiteheads, blackheads, papules and pustules",
          "Painful cystic or nodular acne",
          "Oily skin with enlarged pores",
          "Post-acne marks and scarring",
        ],
        causes: [
          "Hormonal fluctuations (PCOS, puberty, stress)",
          "Excess sebum and clogged follicles",
          "C. acnes bacterial overgrowth",
          "Diet, lifestyle and skincare triggers",
        ],
        process: [
          { step: "Skin Analysis", detail: "Detailed grading and trigger mapping." },
          { step: "Custom Plan", detail: "Topical + oral + procedure combination tailored to you." },
          { step: "In-clinic Care", detail: "Peels, extractions, LED therapy as indicated." },
          { step: "Maintenance", detail: "Long-term routine to prevent relapse and marks." },
        ],
        benefits: [
          "Visibly clearer skin in 4–8 weeks",
          "Controlled oil and reduced breakouts",
          "Minimised marks and scarring risk",
          "Confidence-restoring results",
        ],
        faqs: [
          { q: "How long does acne treatment take?", a: "Most patients see clear improvement within 6–8 weeks with consistent care." },
          { q: "Will my acne come back?", a: "A tailored maintenance plan dramatically lowers recurrence." },
        ],
      },
      {
        slug: "pigmentation-treatment",
        title: "Pigmentation Treatment",
        short: "Even-toned, luminous skin — melasma, dark spots and tan.",
        icon: "Sun",
        overview: "Targeted treatments for melasma, post-inflammatory pigmentation and uneven skin tone using medical peels, depigmenting serums and advanced light-based therapies.",
        symptoms: ["Dark patches on cheeks and forehead", "Sun-tan and uneven tone", "Dark circles and spots"],
        causes: ["UV exposure", "Hormonal shifts", "Inflammation post-acne", "Improper skincare"],
        process: [
          { step: "Pigment Mapping", detail: "Wood's lamp & clinical assessment." },
          { step: "Layered Plan", detail: "SPF, depigmenting actives, peels." },
          { step: "Boosters", detail: "Glutathione / mesotherapy as needed." },
        ],
        benefits: ["Brighter, even tone", "Reduced melasma & spots", "Glowing finish"],
        faqs: [
          { q: "Are the treatments safe for Indian skin?", a: "Yes — protocols are tuned for melanin-rich skin tones." },
        ],
      },
      {
        slug: "prp-therapy",
        title: "PRP Therapy",
        short: "Regrow, thicken and strengthen with your own growth factors.",
        icon: "Droplet",
        overview: "Platelet Rich Plasma therapy uses growth factors from your own blood to stimulate dormant follicles, improve hair density and accelerate skin repair.",
        symptoms: ["Diffuse hair thinning", "Receding hairline", "Post-pregnancy hair fall"],
        causes: ["Genetic alopecia", "Nutritional deficiencies", "Stress, post-illness"],
        process: [
          { step: "Blood Draw", detail: "Small sample, processed in-clinic." },
          { step: "PRP Extraction", detail: "Double-spin centrifuge for high platelet yield." },
          { step: "Scalp Injection", detail: "Microinjections into affected zones." },
        ],
        benefits: ["Thicker, denser hair", "Reduced shedding", "Safe, autologous"],
        faqs: [
          { q: "How many sessions are needed?", a: "Typically 4–6 sessions spaced 4 weeks apart." },
        ],
      },
      {
        slug: "hair-fall-treatment",
        title: "Hair Fall Treatment",
        short: "Stop hair loss with root-cause diagnostics and modern therapy.",
        icon: "Scissors",
        overview: "From trichoscopy to advanced therapies — minoxidil, oral protocols, mesotherapy and PRP — designed around your hair loss pattern.",
        symptoms: ["Excess hair on pillow / comb", "Visible scalp", "Widening parting"],
        causes: ["Androgenetic alopecia", "Thyroid / iron deficiency", "Telogen effluvium"],
        process: [
          { step: "Trichoscopy", detail: "High-magnification scalp analysis." },
          { step: "Lab Panel", detail: "Identify deficiencies & hormonal causes." },
          { step: "Treatment", detail: "Topicals + procedures + nutrition plan." },
        ],
        benefits: ["Reduced shedding in 8–12 weeks", "Regrowth in dormant zones"],
        faqs: [{ q: "Is treatment lifelong?", a: "Maintenance varies by cause; many patients reduce therapy over time." }],
      },
      {
        slug: "chemical-peel",
        title: "Chemical Peel",
        short: "Renew dull, congested skin with safe medical peels.",
        icon: "Layers",
        overview: "Customised glycolic, salicylic, mandelic and combination peels to brighten, smoothen and treat acne, pigmentation and ageing.",
        symptoms: ["Dull, congested skin", "Acne marks", "Open pores"],
        causes: ["Sun damage", "Dead-cell buildup", "Ageing"],
        process: [
          { step: "Prep", detail: "2-week priming routine." },
          { step: "Peel Session", detail: "Calibrated to skin type." },
          { step: "Recovery", detail: "Post-peel care to lock results." },
        ],
        benefits: ["Instant glow", "Smoother texture", "Reduced pigmentation"],
        faqs: [{ q: "How many sessions?", a: "A series of 4–6 sessions every 2–3 weeks works best." }],
      },
      {
        slug: "anti-aging-treatment",
        title: "Anti-aging Treatment",
        short: "Lift, firm and restore — naturally and elegantly.",
        icon: "Star",
        overview: "Botox, dermal fillers, skin boosters, microneedling RF and medical-grade skincare to slow visible signs of ageing.",
        symptoms: ["Fine lines & wrinkles", "Loss of firmness", "Dull skin"],
        causes: ["Collagen loss", "Sun damage", "Lifestyle"],
        process: [
          { step: "Consult", detail: "Facial assessment & goal mapping." },
          { step: "Procedure", detail: "Tox, fillers or energy-based devices." },
          { step: "Maintenance", detail: "Skincare & periodic touch-ups." },
        ],
        benefits: ["Natural-looking refresh", "Firmer skin", "Long-lasting glow"],
        faqs: [{ q: "Will I look frozen?", a: "Our approach prioritises natural movement and balance." }],
      },
    ];

    for (const service of servicesList) {
      await setDoc(doc(db, "services", service.slug), service);
    }

    // 5. Testimonials Collection
    const testimonialsList = [
      {
        name: "Rohan S.",
        initials: "RS",
        rating: 5,
        date: "3 weeks ago",
        text: "Great clinic. Dedicated staff and doctor has excellent communication and soft skills.",
        concern: "Acne",
      },
      {
        name: "Priya M.",
        initials: "PM",
        rating: 5,
        date: "1 month ago",
        text: "Very accurate diagnosis, clear explanation and effective treatment. Highly satisfied.",
        concern: "Pigmentation",
      },
      {
        name: "Aditya K.",
        initials: "AK",
        rating: 5,
        date: "2 months ago",
        text: "Highly recommended place for skin problems. Saw real improvement within weeks.",
        concern: "Hair Fall",
      },
      {
        name: "Sneha P.",
        initials: "SP",
        rating: 5,
        date: "2 months ago",
        text: "Dr. Jain is patient, thorough and never pushes unnecessary procedures. Felt safe and informed.",
        concern: "Melasma",
      },
    ];

    for (const t of testimonialsList) {
      await addDoc(collection(db, "testimonials"), t);
    }

    // 6. Blogs Collection
    const blogsList = [
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
    ];

    for (const blog of blogsList) {
      await setDoc(doc(db, "blogs", blog.slug), blog);
    }

    // 7. Gallery Collection
    const galleryList = [
      { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=70", category: "Clinic", caption: "Reception" },
      { src: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1000&q=70", category: "Clinic", caption: "Consultation Room" },
      { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1000&q=70", category: "Treatments", caption: "Procedure Suite" },
      { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1000&q=70", category: "Treatments", caption: "Hydrafacial" },
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

    for (const item of galleryList) {
      await addDoc(collection(db, "gallery"), item);
    }

    // 8. FAQ Collection
    const faqList = [
      { q: "Do I need an appointment to visit?", a: "Yes, appointments help us serve you on time. You can book online or via WhatsApp.", category: "General" },
      { q: "Are treatments safe for sensitive Indian skin?", a: "Absolutely. All protocols are evidence-based and calibrated for darker skin tones.", category: "Safety" },
      { q: "What is the consultation fee?", a: "Please contact the clinic for current fees. Transparent pricing, no hidden costs.", category: "Fees" },
    ];

    for (const f of faqList) {
      await addDoc(collection(db, "faq"), f);
    }

    // 9. SEO Collection
    await setDoc(doc(db, "seo", "home"), {
      title: "Dr Jain's Skin Care Clinic | Dermatologist in Katraj, Pune",
      description: "Advanced skin, hair and cosmetology care in Katraj, Pune by Dr. Amit Jain (MBBS, MD). 4.8★ rated. Book an appointment today.",
      canonicalUrl: "/",
    });

    // 10. Navbar Collection
    const navbarList = [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Gallery", to: "/gallery" },
      { label: "Reviews", to: "/testimonials" },
      { label: "Contact", to: "/contact" },
    ];
    await setDoc(doc(db, "settings", "navbar"), { items: navbarList });

    // 11. Footer Collection
    await setDoc(doc(db, "settings", "footer"), {
      copyright: `© ${new Date().getFullYear()} Dr Jain's Skin Care Clinic. All Rights Reserved.`,
      disclaimer: "Disclaimer: Medical information presented on this website is for educational purposes only. Please consult a qualified doctor for clinical diagnosis and treatments.",
    });

    console.log("[Firebase Seeding] All collections successfully seeded to Firestore!");
  } catch (error) {
    console.error("[Firebase Seeding] Error during database seeding: ", error);
  }
}
