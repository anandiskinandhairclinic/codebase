import { db } from "./firebase";
import { collection, getDocs, setDoc, doc, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import { services as fallbackServices, productList as fallbackProducts } from "./data";

export async function seedClinicDatabase() {
  try {
    const settingsSnap = await getDocs(collection(db, "settings"));
    if (!settingsSnap.empty) {
      console.log("[Firebase Seeding] Firestore is already seeded.");
      
      // Self-healing check: check if we have all services in the services collection
      try {
        const servicesSnap = await getDocs(collection(db, "services"));
        if (servicesSnap.empty) {
          console.log("[Firebase Seeding] Services collection is empty. Seeding services...");
          for (const service of fallbackServices) {
            await setDoc(doc(db, "services", service.slug), service);
          }
          console.log("[Firebase Seeding] Successfully seeded default services details!");
        } else {
          // Check if any fallback services are missing in Firestore and add only those.
          // Never wipe the collection or overwrite existing service data/images.
          const existingSlugs = new Set(servicesSnap.docs.map(d => d.id));
          let seededMissingCount = 0;
          for (const service of fallbackServices) {
            if (!existingSlugs.has(service.slug)) {
              await setDoc(doc(db, "services", service.slug), service);
              seededMissingCount++;
            }
          }
          if (seededMissingCount > 0) {
            console.log(`[Firebase Seeding] Seeded ${seededMissingCount} missing services.`);
          }
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed missing services:", err);
      }

      // Self-healing check: check if products are in the products collection
      try {
        const productsSnap = await getDocs(collection(db, "products"));
        if (productsSnap.empty) {
          console.log("[Firebase Seeding] Products collection is empty. Seeding products...");
          for (const product of fallbackProducts) {
            await setDoc(doc(db, "products", product.id), product);
          }
          console.log("[Firebase Seeding] Successfully seeded default products!");
        } else {
          // Check if any default products are missing in Firestore and add them.
          // Never delete or overwrite existing products or custom edits.
          const existingProductIds = new Set(productsSnap.docs.map(d => d.id));
          let seededMissingProductsCount = 0;
          for (const product of fallbackProducts) {
            if (!existingProductIds.has(product.id)) {
              await setDoc(doc(db, "products", product.id), product);
              seededMissingProductsCount++;
            }
          }
          if (seededMissingProductsCount > 0) {
            console.log(`[Firebase Seeding] Seeded ${seededMissingProductsCount} missing default products.`);
          }
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed products:", err);
      }

      // Self-healing check: check if clinic images are present in the gallery
      try {
        const gallerySnap = await getDocs(collection(db, "gallery"));
        let hasClinicPics = false;
        gallerySnap.forEach((doc) => {
          if (doc.data().category === "Clinic") {
            hasClinicPics = true;
          }
        });
        if (!hasClinicPics) {
          console.log("[Firebase Seeding] No 'Clinic' images found in Firestore. Seeding default clinic images...");
          const clinicPics = [
            { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=70", imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=70", category: "Clinic", caption: "Reception" },
            { src: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1000&q=70", imageUrl: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1000&q=70", category: "Clinic", caption: "Consultation Room" }
          ];
          for (const item of clinicPics) {
            await addDoc(collection(db, "gallery"), item);
          }
          console.log("[Firebase Seeding] Successfully seeded default clinic images!");
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed clinic gallery images:", err);
      }

      // Self-healing check: check if specialties & whyChooseUs are present in homepage collection
      try {
        const specialtiesSnap = await getDoc(doc(db, "homepage", "specialties"));
        if (!specialtiesSnap.exists()) {
          console.log("[Firebase Seeding] specialties missing. Seeding specialties...");
          await setDoc(doc(db, "homepage", "specialties"), {
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
          });
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed specialties:", err);
      }

      try {
        const whyChooseUsSnap = await getDoc(doc(db, "homepage", "whyChooseUs"));
        if (!whyChooseUsSnap.exists()) {
          console.log("[Firebase Seeding] whyChooseUs missing. Seeding whyChooseUs...");
          await setDoc(doc(db, "homepage", "whyChooseUs"), {
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
          });
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed whyChooseUs:", err);
      }
      
      // Self-healing check: check if Before & After items are present in the gallery collection
      try {
        const gallerySnap = await getDocs(collection(db, "gallery"));
        let hasBeforeAfter = false;
        gallerySnap.forEach((doc) => {
          const data = doc.data();
          if (data.category === "Before & After" || data.category === "Patient Photos" || (data.beforeSrc && data.afterSrc)) {
            hasBeforeAfter = true;
          }
        });

        if (!hasBeforeAfter) {
          console.log("[Firebase Seeding] No 'Patient Photos' items found in Firestore. Seeding mock transformations...");
          const beforeAfterItems = [
            {
              beforeSrc: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=70",
              afterSrc: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=900&q=70",
              category: "Patient Photos",
              caption: "Acne Control Therapy"
            },
            {
              beforeSrc: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=70",
              afterSrc: "https://images.unsplash.com/photo-1614109800763-7b46d0a9ad44?w=900&q=70",
              category: "Patient Photos",
              caption: "Pigmentation & Tone Laser"
            },
            {
              beforeSrc: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=70",
              afterSrc: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=70",
              category: "Patient Photos",
              caption: "PRP Hair Density Therapy"
            }
          ];
          for (const item of beforeAfterItems) {
            await addDoc(collection(db, "gallery"), item);
          }
          console.log("[Firebase Seeding] Successfully injected mock Patient Photos transformations!");
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed gallery items:", err);
      }

      // Self-healing check: check if chatbot rules are present in the collection
      try {
        const rulesSnap = await getDocs(collection(db, "chatbotRules"));
        if (rulesSnap.empty) {
          console.log("[Firebase Seeding] No chatbot rules found in Firestore. Seeding default rules...");
          for (const rule of defaultChatbotRules) {
            await addDoc(collection(db, "chatbotRules"), rule);
          }
          console.log("[Firebase Seeding] Successfully seeded default chatbot rules!");
        }
      } catch (err) {
        console.warn("[Firebase Seeding] Could not auto-seed chatbot rules:", err);
      }
      return;
    }

    console.log("[Firebase Seeding] Beginning database seeding...");

    // 1. Settings Collection
    await setDoc(doc(db, "settings", "clinic"), {
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
      mapEmbed: "https://www.google.com/maps?q=Anandi+Skin+&+Hair+Clinic+Ambegaon+Pune&output=embed",
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
      rating: 5.0,
      reviewsCount: 17,
      stats: [
        { value: "10+", label: "Years of Experience" },
        { value: "15,000+", label: "Happy Patients" },
        { value: "5.0★", label: "Google Rating" },
        { value: "20+", label: "Treatments Offered" },
      ],
    });

    // 3. Doctor Bio
    await setDoc(doc(db, "doctor", "info"), {
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
    });

    // 4. Services Collection
    for (const service of fallbackServices) {
      await setDoc(doc(db, "services", service.slug), service);
    }

    // 5. Testimonials Collection
    const testimonialsList = [
      {
        name: "Nikhil Bare",
        rating: 5,
        date: "5 months ago",
        text: "Skin problem ke liye aaya tha, doctor ne properly explain kiya. Treatment se improvement dikh raha hai. Staff bhi helpful aahe.",
        treatment: "Skin Treatment",
        sub: "Local Guide · 3 reviews · 41 photos",
        ownerReply: "Thank you for your feedback"
      },
      {
        name: "Abhay Yadav",
        rating: 5,
        date: "4 months ago",
        text: "Mujhe skin problem thi long time se, Aandi clinic me treatment liya. Ab skin thodi glow kar rahi hai. Perfect nahi but improvement hai. Thank you doctor",
        treatment: "Skin Treatment",
        sub: "1 review"
      },
      {
        name: "Reshma",
        rating: 5,
        date: "5 months ago",
        text: "Clinic thoda crowded asto, but waiting ke baad proper consultation milta hai. Doctor patiently sunte hai.",
        treatment: "Consultation",
        sub: "1 review",
        ownerReply: "Thank you Reshma for your review. Sorry for the waiting time."
      },
      {
        name: "Sakshi Patil",
        rating: 5,
        date: "a year ago",
        text: "I had been struggling with acne for years and tried several remedies with little success. A friend recommended Anandi Skin & Hair Clinic, and I’m so glad I went! The dermatologist was very thorough and explained everything in detail.",
        treatment: "Acne Care",
        sub: "1 review",
        ownerReply: "Thank you so much Sakshi for your feedback"
      },
      {
        name: "Kaushal Patil",
        rating: 5,
        date: "a year ago",
        text: "I recently visited Anandi Skin & Hair Clinic for a skin and hair consultation, and I couldn't be more satisfied with the experience. The staff was incredibly welcoming, and the clinic maintained top-notch hygiene standards.",
        treatment: "Skin & Hair Consultation",
        sub: "1 review",
        ownerReply: "Thank you for your valuable feedback"
      },
      {
        name: "Shubham Pawar",
        rating: 5,
        date: "5 months ago",
        text: "I had severe allergy on whole body . Got great results instantly. Dr explained everything well",
        treatment: "Skin Allergy",
        sub: "1 review",
        ownerReply: "Thank you for your feedback"
      },
      {
        name: "Yashwant More",
        rating: 5,
        date: "a year ago",
        text: "I've visited the clinic i went for acne scars and oily skin dr vishakha properly checked my skin and started the procedure then explained everything that how I'm going to get rid of it",
        treatment: "Acne Scars & Oily Skin",
        sub: "2 reviews",
        ownerReply: "Thank you for your valuable feedback"
      },
      {
        name: "Sneha Patil",
        rating: 5,
        date: "a year ago",
        text: "I recently visited Anandi Skin & Hair Clinic for a skin and hair consultation, and I couldn't be more satisfied with the experience. The staff was incredibly welcoming, and the clinic maintained top-notch hygiene standards",
        treatment: "Skin & Hair Consultation",
        sub: "1 review",
        ownerReply: "Thank you Sneha for you valuable feedback. Do visit again for your quaterly hydrafacial"
      },
      {
        name: "Dr. Suleman Mulla",
        rating: 5,
        date: "a year ago",
        text: "Best and well experienced Dermatologist in Area.. must visit 😊👍🏻",
        treatment: "Consultation",
        sub: "11 reviews · 2 photos",
        ownerReply: "Thank you for your valuable feedback"
      },
      {
        name: "Sagar Sasane",
        rating: 5,
        date: "a month ago",
        text: "Good treatment for skin related",
        treatment: "Skin Care",
        sub: "9 reviews · 8 photos"
      },
      {
        name: "Sohel Shaikh",
        rating: 5,
        date: "4 months ago",
        text: "Aandi hair and skin clinic khup chan ahe. Me hair fall sathi gelo hoto, 2 mahinyat farak disla. Doctor calm aahet ani proper explain kartat",
        treatment: "Hair Fall Treatment",
        sub: "3 reviews",
        ownerReply: "Thank you for your valuable feedback"
      },
      {
        name: "Vishal Kusale",
        rating: 5,
        date: "4 months ago",
        text: "Aandi clinic cha experience changla hota. Doctor khup friendly aahet. Hindi aur Marathi dono me samjha dete hai, isliye tension nahi hota.",
        treatment: "Consultation",
        sub: "3 reviews",
        ownerReply: "Thank you for the feedback"
      },
      {
        name: "Shrutika Dhone",
        rating: 5,
        date: "4 months ago",
        text: "Best clinic for hair treatment. I have dandruff problem, please consult me. Medicine is regular and results are good. It takes patience but it is worth it.",
        treatment: "Dandruff Treatment",
        sub: "3 reviews",
        ownerReply: "Thanks Shrutika for your valuable feedback"
      },
      {
        name: "KRISHNA DABHADE",
        rating: 5,
        date: "4 months ago",
        text: "Doctor khup patiently sagla explain kartat. Majha acne problem khup kami zala aahe ata. Thank you Anandi clinic.",
        treatment: "Acne Care",
        sub: "Local Guide · 7 reviews · 9 photos",
        ownerReply: "Thank you Krishna for your feedback"
      },
      {
        name: "veeresh birajdar",
        rating: 5,
        date: "5 months ago",
        text: "Mala skin allergy sathi treatmnt ghetla, itching khup kami zali. Overall satisfied aahe",
        treatment: "Skin Allergy",
        sub: "2 reviews · 7 photos",
        ownerReply: "Thanks for your valuable feedback"
      },
      {
        name: "Pratik Jadhav",
        rating: 5,
        date: "a year ago",
        text: "My hair was thick and thin, I used to lose my hair constantly, I went to the clinic and I am getting my treatment as per the information given by Dr. Vishakha. Now my hair loss has completely disappeared, the fear of baldness that I had is gone.",
        treatment: "Hair Loss Treatment",
        sub: "2 reviews",
        ownerReply: "feedback dilya baddal Thank you pratik"
      },
      {
        name: "Rushikesh Ragde",
        rating: 5,
        date: "5 months ago",
        text: "Very professional clinic. Great experience with the staff and dermatologist.",
        treatment: "Skin Care",
        sub: "1 review · 1 photo"
      }
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
        category: "Patient Photos",
        caption: "Acne Control Therapy"
      },
      {
        beforeSrc: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=70",
        afterSrc: "https://images.unsplash.com/photo-1614109800763-7b46d0a9ad44?w=900&q=70",
        category: "Patient Photos",
        caption: "Pigmentation & Tone Laser"
      },
      {
        beforeSrc: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=70",
        afterSrc: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=70",
        category: "Patient Photos",
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
      title: "Anandi Skin & Hair Clinic | Dermatologist in Ambegaon, Pune",
      description: "Advanced skin, hair and cosmetology care in Ambegaon/Katraj, Pune by Dr. Vishakha Patil (MBBS, MD). 5.0★ rated. Book an appointment today.",
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
      copyright: `© ${new Date().getFullYear()} Anandi Skin & Hair Clinic. All Rights Reserved.`,
      disclaimer: "Disclaimer: Medical information presented on this website is for educational purposes only. Please consult a qualified doctor for clinical diagnosis and treatments.",
    });

    // 12. Products Collection
    for (const p of fallbackProducts) {
      await setDoc(doc(db, "products", p.id), p);
    }

    // 13. Chatbot Rules Collection
    for (const rule of defaultChatbotRules) {
      await addDoc(collection(db, "chatbotRules"), rule);
    }

    // 14. Appointments Seeding (Mock Data for Dashboard)
    const appointmentsSnap = await getDocs(collection(db, "appointments"));
    if (appointmentsSnap.empty) {
      console.log("[Firebase Seeding] Seeding mock appointments...");
      const mockAppointments = [
        {
          name: "Rahul Sharma",
          phone: "9876543210",
          email: "rahul@example.com",
          service: "Acne Treatment",
          preferredDate: "2026-07-06",
          message: "Would like to consult for severe acne scars.",
          createdAt: "2026-07-01T10:00:00.000Z",
          status: "Confirmed",
          price: 1500
        },
        {
          name: "Neha Gupta",
          phone: "9812345678",
          email: "neha@example.com",
          service: "Hydra Facial",
          preferredDate: "2026-07-07",
          message: "Routine facial treatment.",
          createdAt: "2026-07-01T14:30:00.000Z",
          status: "Pending",
          price: 2500
        },
        {
          name: "Anil Patel",
          phone: "9765432109",
          email: "anil@example.com",
          service: "Hair Fall Treatment",
          preferredDate: "2026-07-08",
          message: "Consultation for thinning hair.",
          createdAt: "2026-07-02T09:15:00.000Z",
          status: "Confirmed",
          price: 500
        },
        {
          name: "Snehal Shinde",
          phone: "9543210987",
          email: "snehal@example.com",
          service: "Chemical Peel",
          preferredDate: "2026-07-06",
          message: "Pigmentation issues.",
          createdAt: "2026-06-30T11:00:00.000Z",
          status: "Confirmed",
          price: 2000
        },
        {
          name: "Pratik Deshmukh",
          phone: "9123456789",
          email: "pratik@example.com",
          service: "PRP Therapy",
          preferredDate: "2026-07-09",
          message: "Third session of PRP.",
          createdAt: "2026-06-29T16:20:00.000Z",
          status: "Confirmed",
          price: 3500
        },
        {
          name: "Pooja Joshi",
          phone: "9871234560",
          email: "pooja@example.com",
          service: "Laser Hair Removal",
          preferredDate: "2026-07-10",
          message: "Underarm session.",
          createdAt: "2026-07-02T12:00:00.000Z",
          status: "Pending",
          price: 4000
        },
        {
          name: "Aditya Kulkarni",
          phone: "9988776655",
          email: "aditya@example.com",
          service: "Vitiligo",
          preferredDate: "2026-07-11",
          message: "White patches consulting.",
          createdAt: "2026-06-28T10:40:00.000Z",
          status: "Confirmed",
          price: 1000
        },
        {
          name: "Komal More",
          phone: "9001122334",
          email: "komal@example.com",
          service: "Melasma",
          preferredDate: "2026-07-08",
          message: "Severe pigmentation on cheeks.",
          createdAt: "2026-06-30T15:00:00.000Z",
          status: "Pending",
          price: 1800
        }
      ];
      for (const app of mockAppointments) {
        await addDoc(collection(db, "appointments"), app);
      }
    }

    console.log("[Firebase Seeding] All collections successfully seeded to Firestore!");
  } catch (error) {
    console.error("[Firebase Seeding] Error during database seeding: ", error);
  }
}

const defaultChatbotRules = [
  { track: "skin", if: ["Acne", "Oily Skin"], then: ["Soft Foam Oil Wash", "Clear Skin Spot Serum", "Acne Treatment Consultation"] },
  { track: "skin", if: ["Acne", "Sensitive Skin"], then: ["Gentle Calm Cleanser", "Clear Skin Spot Serum", "Acne Treatment Consultation"] },
  { track: "skin", if: ["Pigmentation"], then: ["Glow Renew Serum", "Velvet Veil SPF 50", "Pigmentation Reset Session"] },
  { track: "skin", if: ["Dark Spots"], then: ["Glow Renew Serum", "Velvet Veil SPF 50", "Pigmentation Reset Session"] },
  { track: "skin", if: ["Dry Skin", "Fine Lines"], then: ["Ceramide Cloud Cream", "Timeless Retinol", "Anti Aging Lift"] },
  { track: "skin", if: ["Sensitive Skin"], then: ["Gentle Calm Cleanser", "Hydra Mist"] },
  { track: "skin", if: ["Fine Lines"], then: ["Timeless Retinol", "Bright Eye Elixir"] },
  { track: "skin", if: ["Oily Skin"], then: ["Soft Foam Oil Wash", "Velvet Veil SPF 50"] },
  { track: "skin", if: ["Open Pores"], then: ["Soft Foam Oil Wash", "Glow Renew Serum"] },
  { track: "skin", if: ["Sunburn & Tan"], then: ["Velvet Veil SPF 50", "Hydra Mist"] },
  { track: "skin", if: ["Under-Eye Circles"], then: ["Bright Eye Elixir"] },
  { track: "skin", if: ["Uneven Texture"], then: ["Glow Renew Serum", "Timeless Retinol"] },
  { track: "skin", if: ["Acne Scars"], then: ["Glow Renew Serum", "Acne Treatment Consultation"] },
  { track: "hair", if: ["Hair Fall", "Oily Scalp"], then: ["Clarifying Scalp Tonic", "Root Revive Serum", "PRP Hair Consultation"] },
  { track: "hair", if: ["Hair Fall", "Dry Scalp"], then: ["Silken Hair Mask", "Root Revive Serum"] },
  { track: "hair", if: ["Bald Patches"], then: ["PRP Hair Therapy", "Hair Transplant Consultation"] },
  { track: "hair", if: ["Dandruff"], then: ["Clarifying Scalp Tonic"] },
  { track: "hair", if: ["Split Ends"], then: ["Silken Hair Mask"] },
  { track: "hair", if: ["Premature Graying"], then: ["Root Revive Serum", "Free Hair Analysis"] },
  { track: "hair", if: ["Itchy Scalp"], then: ["Clarifying Scalp Tonic"] },
  { track: "hair", if: ["Thin Hair"], then: ["Root Revive Serum", "PRP Hair Consultation"] }
];

