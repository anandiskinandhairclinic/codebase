import type { Service } from "./data";

export const rawServices: Service[] = [
  // ─── SKIN TREATMENTS (1-20) ──────────────────────────────────────────────
  {
    slug: "acne-body-acne",
    title: "Acne and Body Acne Treatment",
    short: "Clinical solutions for clear, breakout-free facial and body skin.",
    icon: "Sparkles",
    category: "Skin",
    overview: "Comprehensive treatment targeting the root causes of acne on the face, back, chest, and shoulders. We combine prescription topicals, oral medications, and customized medical peels to control sebum production and eradicate acne-causing bacteria.",
    symptoms: ["Pustules, papules, and cysts", "Oily skin and clogged pores", "Painful lesions on back and chest"],
    causes: ["Excess sebum production", "Bacterial overgrowth (C. acnes)", "Hormonal changes and stress"],
    process: [
      { step: "Skin Grading", detail: "Identifying the acne type and severity index." },
      { step: "Active Therapy", detail: "Customized medical peels and prescription topical plan." },
      { step: "Extraction", detail: "Safe comedone extraction under sterile conditions." }
    ],
    benefits: ["Controls active breakouts", "Minimizes post-inflammatory hyperpigmentation", "Unclogs deep pores"],
    faqs: [
      { q: "How long does it take to see results?", a: "Visible improvement is typically observed within 4 to 6 weeks of starting the treatment." },
      { q: "Can diet trigger body acne?", a: "Yes, high-glycemic foods and dairy can trigger breakouts in acne-prone individuals." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
  },
  {
    slug: "acne-scars-marks",
    title: "Acne Scars and Marks Treatment",
    short: "Dermatological therapies to smooth craters and fade post-acne spots.",
    icon: "Sparkles",
    category: "Skin",
    overview: "Advanced therapies designed to restore skin texture by targeting depressed scars (boxcar, icepick, rolling) and dark spots. We utilize subcision, chemical reconstruction of skin scars (CROSS), and targeted scar-reducing topicals.",
    symptoms: ["Atrophic/depressed scars", "Post-inflammatory hyperpigmentation (PIH)", "Uneven skin texture"],
    causes: ["Severe nodulocystic acne damage", "Delayed treatment of active acne", "Picking or popping pimples"],
    process: [
      { step: "Scar Mapping", detail: "Evaluating the depth and types of scars." },
      { step: "Collagen Induction", detail: "Micro-needling or TCA CROSS on targeted scars." },
      { step: "Pigment Control", detail: "Depigmenting peels to clear red and brown marks." }
    ],
    benefits: ["Smoother, even skin surface", "Increased natural collagen production", "Fades dark post-acne marks"],
    faqs: [
      { q: "Can acne scars be 100% cured?", a: "While complete erasure is difficult, we can achieve up to 70-80% improvement in skin texture." },
      { q: "Does scar treatment hurt?", a: "We apply a strong topical numbing cream beforehand to make the procedure highly comfortable." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
  },
  {
    slug: "anti-aging-pores",
    title: "Anti-Aging and Pores",
    short: "Restore youthfulness and refine large, stretched skin pores.",
    icon: "Sparkles",
    category: "Skin",
    overview: "A targeted regimen to boost elastin and collagen, reversing skin sagging and tightening enlarged pores. We combine retinoid priming, skin firming treatments, and pore-refining chemical peeling.",
    symptoms: ["Fine lines and skin laxity", "Enlarged, visible pores", "Loss of youthful skin bounce"],
    causes: ["Natural depletion of collagen", "UV-induced photoaging", "Excess sebum stretching pore walls"],
    process: [
      { step: "Elasticity Check", detail: "Analyzing skin laxity and pore structure." },
      { step: "Exfoliation", detail: "AHA/BHA peels to clear keratin plugs in pores." },
      { step: "Firming Protocol", detail: "Collagen boosting serums and firming massages." }
    ],
    benefits: ["Smoother skin texture", "Minimized pore size", "Restored firm skin contour"],
    faqs: [
      { q: "When should I start anti-aging treatments?", a: "Preemptive anti-aging care is recommended starting in your mid-20s, when collagen production begins to drop." },
      { q: "Will pore size reduction last?", a: "Yes, with proper sebum control and regular use of retinoids, the refined pore appearance is long-lasting." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
  },
  {
    slug: "pigmentation-tanning",
    title: "Pigmentation, Tanning & Dark Circles",
    short: "Brighten skin and correct dark circles or uneven patches.",
    icon: "Sun",
    category: "Skin",
    overview: "Advanced therapies targeting sun tan, dark circles, and deep skin hyperpigmentation. Using medical-grade brightening agents, protective skin priming, and hydration-boosting facials.",
    symptoms: ["Darkened sun-exposed skin patches", "Under-eye dark circles", "Uneven skin tone"],
    causes: ["Excessive UV rays exposure", "Friction, rubbing, and lack of sleep", "Hormonal shifts or genetic predispositions"],
    process: [
      { step: "Pigment Assessment", detail: "Using diagnostic tools to determine epidermal vs dermal pigment." },
      { step: "Detoxification", detail: "Antioxidant skin infusions to counter free radicals." },
      { step: "Brightening Therapy", detail: "Targeted application of gentle peeling formulations." }
    ],
    benefits: ["Fades persistent sun tan", "Brightens dark under-eye circles", "Creates a uniform skin complexion"],
    faqs: [
      { q: "How do I prevent tanning after treatment?", a: "Strict daily application of a broad-spectrum SPF 50 sunscreen is essential to protect the skin." },
      { q: "Are under-eye dark circles permanent?", a: "Most cases show significant improvement when combined with sleep hygiene and pigment-reducing under-eye creams." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    slug: "melasma",
    title: "Melasma (Wang)",
    short: "Clinical management of stubborn, symmetrical facial patches.",
    icon: "Sun",
    category: "Skin",
    overview: "Melasma is a chronic skin condition presenting as brown-grey patches on the face. Our specialized management combines triple combination topicals, barrier repair creams, and gentle medical peeling to safely control melanocyte activity.",
    symptoms: ["Symmetrical dark brown patches on cheeks and forehead", "Hyperpigmentation triggered by sun/heat", "No itching or physical pain"],
    causes: ["Hormonal fluctuations (pregnancy, thyroid, birth control)", "Ultraviolet and visible blue light exposure", "Genetic predisposition"],
    process: [
      { step: "Hormone & Skin Profiling", detail: "Taking a thorough history of medications and hormonal changes." },
      { step: "Barrier Priming", detail: "Reinforcing the skin barrier to prevent irritation." },
      { step: "Safe Depigmentation", detail: "Applying carefully calibrated non-hydroquinone fading agents." }
    ],
    benefits: ["Significant fading of stubborn patches", "Restores healthy skin barrier", "Prevents hyperpigmentation rebound"],
    faqs: [
      { q: "Can melasma return?", a: "Yes, melasma is a chronic condition that can reactivate with sun exposure or hormonal shifts, requiring long-term maintenance." },
      { q: "Is melasma curable?", a: "It is highly controllable. With proper compliance, patches can fade until they are barely visible." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
  },
  {
    slug: "vitiligo",
    title: "Vitiligo (Safed Daag)",
    short: "Stabilize depigmentation and restore natural skin pigment.",
    icon: "Shield",
    category: "Skin",
    overview: "Vitiligo is an autoimmune condition causing patchy loss of skin color. We prioritize stopping active spread using topical immunomodulators, oral therapy for stabilization, and repigmentation techniques to restore natural color.",
    symptoms: ["Depigmented (milky-white) patches", "Premature graying of hair in active spots", "Loss of color inside oral tissues"],
    causes: ["Autoimmune destruction of pigment cells", "Genetic triggers", "Physical trauma (Koebner phenomenon)"],
    process: [
      { step: "Activity Assessment", detail: "Determining whether the vitiligo is stable or active." },
      { step: "Stabilization Phase", detail: "Medical interventions to stop the spread." },
      { step: "Repigmentation Phase", detail: "Using immunomodulating creams and light-based therapies." }
    ],
    benefits: ["Stops progressive pigment loss", "Induces natural color return from margins", "Improves aesthetic appearance and confidence"],
    faqs: [
      { q: "Is vitiligo contagious?", a: "No, vitiligo is an autoimmune process and is completely non-contagious." },
      { q: "Can vitiligo affect nails?", a: "Occasionally, nail abnormalities or ridges may appear, but vitiligo primarily affects the skin." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  },
  {
    slug: "psoriasis",
    title: "Psoriasis",
    short: "Dermatological control for scaly, itchy plaque conditions.",
    icon: "Shield",
    category: "Skin",
    overview: "Comprehensive medical care for psoriasis. We use topical keratolytics, coal tar formulations, oral systemic medications, and modern biologics for patients with extensive or resistant plaques.",
    symptoms: ["Red plaques covered with silvery scales", "Dry, cracked skin that may bleed", "Itching, burning, or soreness"],
    causes: ["Accelerated skin cell turnover rate", "Immune system dysfunction", "Triggers like stress, throat infection, or dry weather"],
    process: [
      { step: "Diagnostic Scoring", detail: "Evaluating severity via PASI (Psoriasis Area Severity Index)." },
      { step: "Topical Clearance", detail: "Salicylic acid and steroid ointments to peel scales." },
      { step: "Systemic Control", detail: "Prescribing immunomodulators or oral medications for long-term control." }
    ],
    benefits: ["Fast relief from itching and scaling", "Clears scaly red plaques", "Prevents joint pain (psoriatic arthritis)"],
    faqs: [
      { q: "Can psoriasis be cured permanently?", a: "Psoriasis is chronic, but proper medical therapy can clear plaques completely and keep the condition in remission." },
      { q: "Does sunlight help psoriasis?", a: "Mild, controlled sun exposure can improve psoriasis, but sunburn must be avoided as it can trigger flare-ups." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
  },
  {
    slug: "keloid",
    title: "Keloid",
    short: "Advanced management for raised, overgrown scar tissue.",
    icon: "Sparkles",
    category: "Skin",
    overview: "Keloids are thick, raised scars that expand beyond the original wound boundary. Our multi-modal treatment includes intralesional corticosteroid injections, silicone gels, and pressure therapy to flatten the overgrown tissue.",
    symptoms: ["Firm, rubbery raised scar", "Pink, red, or dark discoloration", "Itching or tenderness in the scar"],
    causes: ["Overproduction of collagen during wound healing", "Genetic tendency to develop thick scars", "Minor skin trauma (piercing, surgical cut, acne)"],
    process: [
      { step: "Scar Evaluation", detail: "Differentiating hypertrophic scars from active keloids." },
      { step: "Softening", detail: "Intralesional micro-injections directly into the scar." },
      { step: "Home Care", detail: "Prescribing silicone sheets and localized pressure gels." }
    ],
    benefits: ["Flattens raised, hard scar tissue", "Relieves persistent itching and pain", "Improves cosmetic appearance"],
    faqs: [
      { q: "Why do keloids recur?", a: "Keloids are active scar tissue; surgery alone has high recurrence, which is why we combine it with injections." },
      { q: "How many sessions are needed?", a: "Typically, 4 to 6 injection sessions spaced 4 weeks apart are required to flatten a keloid." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    slug: "lichen-planus",
    title: "Lichen Planus & LPP",
    short: "Clinical care for inflammatory purple bumps and scalp conditions.",
    icon: "Shield",
    category: "Skin",
    overview: "Lichen Planus presents as itchy, flat-topped purple bumps on the skin. Lichen Planopilaris (LPP) affects the scalp, leading to hair loss. We offer potent anti-inflammatory topicals, oral immunomodulators, and follicular protective treatments.",
    symptoms: ["Itchy, flat purple bumps (skin LP)", "Scalp redness and hair follicular plugging (LPP)", "White lacy patches in the mouth"],
    causes: ["T-cell mediated autoimmune reaction", "Medication reactions or hepatitis association (rare)", "Genetic predisposition"],
    process: [
      { step: "Clinical Confirmation", detail: "Inspecting skin lesions or performing scalp dermoscopy." },
      { step: "Inflammation Suppression", detail: "Topical and systemic steroids or immunosuppressants." },
      { step: "Follicle Protection", detail: "Targeted scalp drops to prevent scarring hair loss." }
    ],
    benefits: ["Controls severe skin itching", "Halts progressive hair follicle destruction in LPP", "Clears dark purple bumps"],
    faqs: [
      { q: "Can LPP cause permanent hair loss?", a: "Yes, LPP is a scarring hair loss condition, which is why early stabilization is critical to save hair follicles." },
      { q: "Is Lichen Planus contagious?", a: "No, Lichen Planus is an autoimmune condition and is not contagious." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
  },
  {
    slug: "eczema",
    title: "Eczema",
    short: "Soothe dry, red, and itchy skin with barrier repair protocols.",
    icon: "Shield",
    category: "Skin",
    overview: "Eczema (dermatitis) causes dry, red, inflamed skin with intense itching. Our dermatological care utilizes non-steroidal immunomodulators, ceramide-dominant moisturizers, and mild topical steroids to restore the skin barrier.",
    symptoms: ["Dry, sensitive skin", "Red to brownish-gray patches", "Severe itching, especially at night"],
    causes: ["Genetic skin barrier defect (filaggrin deficiency)", "Immune system overreaction", "Environmental triggers (soaps, pollen, dry air)"],
    process: [
      { step: "Trigger Profiling", detail: "Identifying allergy history and irritant exposure." },
      { step: "Barrier Restoration", detail: "Prescribing high-quality ceramide barrier creams." },
      { step: "Flare Control", detail: "Short courses of topical anti-inflammatory ointments." }
    ],
    benefits: ["Rapidly controls itching and redness", "Heals cracked, weeping skin", "Prevents secondary bacterial infections"],
    faqs: [
      { q: "What is the best daily routine for eczema?", a: "Bathing in lukewarm water, avoiding harsh soaps, and applying moisturizer within 3 minutes of bathing." },
      { q: "Can children grow out of eczema?", a: "Yes, many children with atopic dermatitis see significant improvement or clearance by school age." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80"
  },
  {
    slug: "urticaria-skin-allergy",
    title: "Urticaria and Skin Allergy",
    short: "Rapid relief from hives, swelling, and allergic skin flares.",
    icon: "Shield",
    category: "Skin",
    overview: "Urticaria (hives) causes sudden, itchy raised wheals on the skin, often with lip or eyelid swelling. We prioritize identifying allergic triggers, utilizing non-sedative antihistamines, and offering emergency management plans.",
    symptoms: ["Itchy red or skin-colored raised wheals", "Wheals that move around or fade within 24 hours", "Deep swelling of lips or eyes (angioedema)"],
    causes: ["Mast cell histamine release", "Allergies to foods, medications, or insect bites", "Physical triggers like heat, cold, or friction"],
    process: [
      { step: "Allergy Workup", detail: "Detailed history mapping of sudden triggers." },
      { step: "Histamine Block", detail: "Prescribing highly effective, non-sedating antihistamines." },
      { step: "Emergency Guidance", detail: "Providing plans for severe swelling flares." }
    ],
    benefits: ["Stops intense itching and wheal formation", "Reduces allergic skin reactivity", "Restores normal sleep and daily function"],
    faqs: [
      { q: "How long does chronic urticaria last?", a: "Chronic urticaria (lasting over 6 weeks) can persist for months or years but is highly manageable with daily medication." },
      { q: "Are antihistamines safe long-term?", a: "Modern, second-generation antihistamines are exceptionally safe and non-habit forming." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
  },
  {
    slug: "fungal-infection",
    title: "Fungal Infection (Ringworm)",
    short: "Eradicate persistent ringworm and yeast infections.",
    icon: "Shield",
    category: "Skin",
    overview: "Fungal infections (tinea/ringworm) cause circular, scaly, itchy rashes. Due to rising drug resistance, we avoid steroid abuse and utilize targeted oral and topical antifungals alongside strict hygiene counseling.",
    symptoms: ["Itchy, ring-shaped red rashes with raised edges", "Scaling, peeling, or cracking skin", "Fungal patches in body folds (groin, underarms)"],
    causes: ["Dermatophyte fungal overgrowth", "Warm, humid weather", "Sharing personal items or steroid-containing creams"],
    process: [
      { step: "Visual Diagnostics", detail: "KOH mount microscopy to confirm fungal hyphae." },
      { step: "Steroid Withdrawal", detail: "Soothe skin damaged by over-the-counter steroid creams." },
      { step: "Targeted Antifungals", detail: "Prescribing oral and topical antifungals for a defined duration." }
    ],
    benefits: ["Complete clearance of scaly patches", "Eradicates deep fungal spores", "Prevents frequent recurrence and spread"],
    faqs: [
      { q: "Why does my fungal rash keep returning?", a: "Using steroid-antifungal combination creams temporarily suppresses inflammation but feeds the fungus, leading to chronic rebound." },
      { q: "Is ringworm contagious?", a: "Yes, it spreads easily through direct skin contact, shared towels, and clothing." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
  },
  {
    slug: "chickenpox-herpes",
    title: "Chicken Pox and Herpes Zoster",
    short: "Urgent antiviral therapy for vesicular blister rashes and nerve pain.",
    icon: "Shield",
    category: "Skin",
    overview: "Chickenpox and shingles (Herpes Zoster) are viral infections causing painful fluid-filled blisters. We provide early antiviral therapy, nerve pain management, and specialized wound care to minimize scarring and post-herpetic neuralgia.",
    symptoms: ["Painful, fluid-filled blisters in a line or band (shingles)", "Itchy fluid blisters all over the body (chickenpox)", "Burning, tingling, or stabbing nerve pain"],
    causes: ["Varicella-Zoster Virus (VZV)", "Reactivation of VZV due to low immunity or stress"],
    process: [
      { step: "Early Diagnostics", detail: "Confirming the viral dermatome pattern." },
      { step: "Antiviral Rush", detail: "Initiating high-dose antivirals within the first 72 hours." },
      { step: "Pain Management", detail: "Nerve soothing medications and dry-dressing lotion." }
    ],
    benefits: ["Speeds up blister healing and crusting", "Prevents long-term chronic nerve pain", "Reduces risk of permanent skin scarring"],
    faqs: [
      { q: "Can shingles spread to others?", a: "A person with active shingles blisters can spread the virus to someone who hasn't had chickenpox, causing chickenpox." },
      { q: "What is post-herpetic neuralgia?", a: "It is chronic nerve pain that persists after shingles blisters heal. Early antiviral treatment reduces its risk." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    slug: "burn-treatment",
    title: "Burn Treatment",
    short: "Clinical wound management for healing and minimizing scars.",
    icon: "Shield",
    category: "Skin",
    overview: "Medical care for superficial and partial-thickness burns. We prioritize sterile dressing, pain control, moisture-retentive healing, and early scar mitigation therapies to prevent contractures and dark marks.",
    symptoms: ["Redness, swelling, and severe pain", "Blistering and raw skin surfaces", "Peeling skin"],
    causes: ["Thermal exposure (hot liquids, steam, fire)", "Chemical or electrical contact", "Severe sunburn"],
    process: [
      { step: "Burn Grading", detail: "Evaluating depth (first-degree vs second-degree)." },
      { step: "Debridement & Cleaning", detail: "Sterile removal of dead skin and blister debris." },
      { step: "Dressing", detail: "Applying antimicrobial and paraffin-impregnated dressings." }
    ],
    benefits: ["Promotes rapid, infection-free healing", "Minimizes thick scar formation", "Reduces raw burn pain"],
    faqs: [
      { q: "Should I pop a burn blister?", a: "No, keeping the blister roof intact acts as a sterile natural barrier against infection." },
      { q: "How do I prevent dark marks from a burn?", a: "Apply sunscreen and silicone gels as soon as the skin heals to prevent post-inflammatory hyperpigmentation." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80"
  },
  {
    slug: "rosacea",
    title: "Rosacea",
    short: "Calm facial redness, flushing, and sensitive acne-like bumps.",
    icon: "Shield",
    category: "Skin",
    overview: "Rosacea causes persistent facial redness, flushing, visible blood vessels, and inflammatory bumps. We focus on gentle barrier protection, vascular soothing agents, and anti-inflammatory topicals.",
    symptoms: ["Facial flushing and persistent redness", "Small, red, pus-filled bumps (acne rosacea)", "Visible tiny blood vessels (telangiectasia)"],
    causes: ["Vascular hyperactivity and dysregulation", "Demodex mite hypersensitivity", "Triggers like spicy food, heat, alcohol, or sun"],
    process: [
      { step: "Subtype Identification", detail: "Determining whether it is vascular or papulopustular rosacea." },
      { step: "Soothing Priming", detail: "Applying barrier repair agents to lower skin sensitivity." },
      { step: "Anti-Redness Medicals", detail: "Prescribing topical metronidazole or oral anti-inflammatories." }
    ],
    benefits: ["Reduces facial flushing and heat", "Clears inflammatory acne-like bumps", "Calms skin sensitivity and stinging"],
    faqs: [
      { q: "Is rosacea the same as adult acne?", a: "No, rosacea is a vascular condition. Using harsh acne washes can dry out and worsen rosacea." },
      { q: "What are common rosacea triggers?", a: "Spicy foods, hot beverages, sunlight, extreme temperatures, and alcohol." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
  },
  {
    slug: "leprosy",
    title: "Leprosy (Hansen's Disease)",
    short: "Ethical diagnosis and multi-drug therapy for patches.",
    icon: "Shield",
    category: "Skin",
    overview: "Leprosy is a curable bacterial infection affecting the skin and nerves. We provide early, confidential diagnosis by testing for loss of sensation in pale patches, followed by standard Multi-Drug Therapy (MDT) to cure the infection completely.",
    symptoms: ["Pale or reddish skin patches with loss of sensation", "Numbness or tingling in hands and feet", "Weakness in facial or extremity muscles"],
    causes: ["Mycobacterium leprae infection", "Prolonged close contact with untreated active cases"],
    process: [
      { step: "Sensory Mapping", detail: "Testing touch, pain, and temperature sensation on skin patches." },
      { step: "Nerve Palpation", detail: "Checking peripheral nerves for thickening or tenderness." },
      { step: "MDT Protocol", detail: "Initiating standard WHO Multi-Drug Therapy." }
    ],
    benefits: ["100% cure of the bacterial infection", "Prevents permanent nerve damage and disability", "Clears pale anesthetic skin patches"],
    faqs: [
      { q: "Is leprosy highly contagious?", a: "No, leprosy is very mildly contagious and becomes non-infectious within a few doses of MDT." },
      { q: "Is leprosy curable?", a: "Yes, leprosy is completely curable with standard Multi-Drug Therapy." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
  },
  {
    slug: "furuncle-infections",
    title: "Furuncle & Bacterial/Viral Skin Infections",
    short: "Treatment for painful boils, cellulitis, warts, and shingles.",
    icon: "Shield",
    category: "Skin",
    overview: "Medical care for bacterial boils (furuncles/carbuncles) and viral skin eruptions. We provide targeted antibiotics, sterile drainage, and viral clearance treatments to resolve infections cleanly without scarring.",
    symptoms: ["Painful, pus-filled red boils under the skin", "Spreading skin redness and warmth (cellulitis)", "Clusters of small painful blisters"],
    causes: ["Staphylococcus bacterial or viral entry (herpes simplex, papillomavirus)", "Poor hygiene, cuts, or low immunity"],
    process: [
      { step: "Diagnostic Culture", detail: "Checking target lesions for bacterial/viral profiling." },
      { step: "Sterile Drainage", detail: "Aseptic evacuation of mature boil pus if needed." },
      { step: "Targeted Antiseptics", detail: "Prescribing appropriate oral and topical antibiotics/antivirals." }
    ],
    benefits: ["Rapidly relieves throbbing boil pain", "Clears spreading skin infection", "Reduces risk of bacterial abscesses"],
    faqs: [
      { q: "Should I squeeze a boil at home?", a: "No, squeezing a boil can push the bacterial infection deeper into the bloodstream, causing complications." },
      { q: "Are skin boils recurring?", a: "Boils can recur if the bacteria colonize the nose or skin folds. We offer decolonization washes to prevent this." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80"
  },
  {
    slug: "pediatric-skin-diseases",
    title: "Skin Diseases in Children",
    short: "Gentle, specialized dermatological care for pediatric skin.",
    icon: "Heart",
    category: "Skin",
    overview: "Pediatric skin is delicate and requires specialized care. We offer diagnosis and safe treatment for childhood eczema, diaper rash, impetigo, head lice, warts, and viral exanthems with safe pediatric dosing.",
    symptoms: ["Red, itchy patches on infant cheeks and folds (eczema)", "Crusted golden-yellow sores (impetigo)", "Itchy diaper area rash"],
    causes: ["Delicate, thin skin barrier easily irritated", "Immune system responses in growing children", "Contagious contact in nurseries (lice, impetigo)"],
    process: [
      { step: "Child-friendly Check", detail: "Gentle, non-intimidating visual skin examination." },
      { step: "Safe Formulation Choice", detail: "Selecting mild, steroid-free or low-potency pediatric topical drops." },
      { step: "Parent Counseling", detail: "Detailed instruction on bathing and skin barrier maintenance." }
    ],
    benefits: ["Soothes red, raw, and itchy infant skin", "Clears childhood infections safely", "Restores peaceful sleep for children and parents"],
    faqs: [
      { q: "Is diaper rash always fungal?", a: "No, it is often contact irritant dermatitis. However, if red spots appear in the creases, a yeast infection may be present." },
      { q: "Are topical steroids safe for babies?", a: "Only under strict dermatologist supervision. We prefer steroid-sparing creams whenever possible." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "sle-scleroderma",
    title: "SLE, Morphea & Scleroderma",
    short: "Specialized care for autoimmune connective tissue skin diseases.",
    icon: "Shield",
    category: "Skin",
    overview: "Autoimmune conditions like Systemic Lupus Erythematosus (SLE), Morphea, and Scleroderma present with unique skin signs like butterfly rashes or localized skin hardening. We provide systematic immunosuppressive therapy, barrier defense, and close systemic monitoring.",
    symptoms: ["Butterfly rash across cheeks (SLE)", "Hard, waxy white patches with purple borders (Morphea)", "Tight, shiny skin on fingers (Scleroderma)"],
    causes: ["Autoimmune response attacking connective tissue/collagen", "Genetic factors combined with environmental triggers"],
    process: [
      { step: "Laboratory Panel", detail: "Ordering ANA titers and skin biopsies to confirm diagnosis." },
      { step: "Inflammation Control", detail: "Prescribing systemic steroids, antimalarials, or methotrexate." },
      { step: "Barrier Protection", detail: "Strict sun protection protocols and skin emollients." }
    ],
    benefits: ["Controls active skin hardening and thickening", "Fades active inflammatory butterfly rashes", "Prevents systemic progression of lupus lesions"],
    faqs: [
      { q: "Is Morphea the same as systemic scleroderma?", a: "No, Morphea is localized scleroderma, meaning it only affects the skin and underlying tissues, not internal organs." },
      { q: "Why is sun protection critical in SLE?", a: "UV rays trigger lupus flares, causing both skin rash and systemic lupus activity." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "connective-tissue-autoimmune",
    title: "Connective Tissue & Autoimmune Disease",
    short: "Comprehensive management of dermatomyositis and blistering disorders.",
    icon: "Shield",
    category: "Skin",
    overview: "Expert management of autoimmune skin disorders including Dermatomyositis and blistering diseases like Pemphigus Vulgaris. We focus on stabilizing antibodies, wound healing, and steroid-sparing systemic immunomodulators.",
    symptoms: ["Skin blistering and raw, painful erosions", "Red-purple eyelids (heliotrope rash)", "Muscle weakness with skin rash"],
    causes: ["Antibodies attacking skin cells and desmosomes", "Autoimmune collagen tissue breakdown"],
    process: [
      { step: "Immunofluorescence Biopsy", detail: "Taking a skin biopsy to identify antibody deposits." },
      { step: "Antibody Stabilization", detail: "Initiating targeted oral immunomodulators." },
      { step: "Erosion Care", detail: "Applying sterile, non-adherent dressings to raw skin." }
    ],
    benefits: ["Heals raw skin blisters and erosions", "Reduces painful skin burning and stinging", "Stabilizes autoimmune activity"],
    faqs: [
      { q: "Are autoimmune blistering diseases curable?", a: "They require long-term treatment to achieve complete remission, allowing patients to live a normal life." },
      { q: "Does stress trigger autoimmune flares?", a: "Yes, emotional and physical stress are well-documented triggers for autoimmune skin flares." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
  },

  // ─── NAIL TREATMENTS (21-24) ──────────────────────────────────────────────
  {
    slug: "ingrown-nail",
    title: "Ingrown Nail",
    short: "Clinical management for painful, curved, or piercing nails.",
    icon: "Clock",
    category: "Nail",
    overview: "An ingrown nail curves into the surrounding skin, causing severe pain, redness, and infection. We offer conservative management, nail bracing, and permanent surgical wedge resection (matricectomy) under local anesthesia.",
    symptoms: ["Pain and tenderness along one or both sides of the nail", "Redness and swelling around the nail border", "Pus drainage and skin overgrowth (granulation)"],
    causes: ["Trimming nails too short or rounding the edges", "Wearing tight, narrow-toed footwear", "Nail shape genetics or trauma"],
    process: [
      { step: "Infection Clearance", detail: "Antibiotic course to resolve acute swelling." },
      { step: "Nail Elevation", detail: "Inserting cotton or gutter splints to guide growth." },
      { step: "Matricectomy", detail: "Minor procedure to permanently narrow the nail path." }
    ],
    benefits: ["Immediate relief from throbbing nail pain", "Clears localized nail fold infection", "Prevents recurrence of the ingrown border"],
    faqs: [
      { q: "Is ingrown nail surgery painful?", a: "No, we use a local anesthetic block, making the procedure entirely pain-free." },
      { q: "How do I cut nails to prevent this?", a: "Always cut nails straight across; do not curve or dig into the corners." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "nail-fungal-infection",
    title: "Nail Fungal Infection (Onychomycosis)",
    short: "Restore thick, yellow, or crumbling nails to health.",
    icon: "Clock",
    category: "Nail",
    overview: "Nail fungal infections (onychomycosis) cause nails to turn thick, yellow, brittle, and crumbly. We provide targeted oral antifungals, medicated nail lacquers, and chemical nail thinning for complete clearance.",
    symptoms: ["Yellow, brown, or white nail discoloration", "Thickened, distorted nail shape", "Brittle, crumbling nail edges"],
    causes: ["Fungal dermatophyte colonization under the nail bed", "Prolonged exposure to moisture and sweaty shoes", "Diabetes or poor blood circulation"],
    process: [
      { step: "Clipping Diagnostics", detail: "Confirming fungal spores in nail clippings." },
      { step: "Topical Painting", detail: "Applying professional antifungal nail lacquers." },
      { step: "Oral Antifungals", detail: "Prescribing oral antifungal tablets for systemic clearance." }
    ],
    benefits: ["Promotes clear, healthy nail regrowth", "Eliminates deep-seated fungal spores", "Reduces nail thickness and pain"],
    faqs: [
      { q: "Why does nail fungus take so long to clear?", a: "Nails grow slowly; a fingernail takes 6 months and a toenail takes 12-18 months to fully grow out clean." },
      { q: "Can I wear nail polish during treatment?", a: "It is best to avoid standard nail polish as it traps moisture, encouraging fungal growth. Medicated lacquers should be used instead." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "nail-psoriasis",
    title: "Nail Psoriasis",
    short: "Clinical therapy for pitted, discolored, and lifting nails.",
    icon: "Clock",
    category: "Nail",
    overview: "Psoriasis can affect nail beds and matrices, causing pitting, discoloration, and separation of the nail from its bed (onycholysis). We offer targeted steroid injections, topical treatments, and systemic immunomodulating therapies.",
    symptoms: ["Tiny dents or pits on nail surface", "Yellow-red discoloration (salmon patches)", "Nail crumbling and lifting"],
    causes: ["Autoimmune psoriasis flare-up in the nail matrix"],
    process: [
      { step: "Diagnostic Scoring", detail: "Calculating NAPSI (Nail Psoriasis Severity Index)." },
      { step: "In-matrix Injections", detail: "Administering micro-steroid drops into the nail fold." },
      { step: "Systemic Check", detail: "Checking for joint pain (psoriatic arthritis)." }
    ],
    benefits: ["Smooths out nail surface pitting", "Stops nail bed separation", "Reduces scaling under the nail"],
    faqs: [
      { q: "Is nail psoriasis contagious?", a: "No, nail psoriasis is an autoimmune condition and is completely non-infectious." },
      { q: "Will nail matrix injections hurt?", a: "There is brief discomfort, but we use ice packs or local anesthetic spray to minimize pain." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "all-nail-diseases",
    title: "All Nail Diseases (Ridges & Brittle Nails)",
    short: "Diagnosis and care for ridges, splitting, and nail infections.",
    icon: "Clock",
    category: "Nail",
    overview: "Specialized clinical diagnosis for all nail conditions. We treat nail ridges, splitting, paronychia (painful nail fold infections), and nail dystrophy caused by systemic diseases or vitamin deficiencies.",
    symptoms: ["Horizontal or vertical ridges", "Brittle, splitting nail plates", "Swollen, painful nail folds (paronychia)"],
    causes: ["Bacterial/viral entry in nail folds", "Vitamin and mineral deficiencies (iron, biotin)", "Frequent contact with chemicals or water"],
    process: [
      { step: "Nail Examination", detail: "Inspecting nail shape, color, and surrounding folds." },
      { step: "Lab Analysis", detail: "Checking iron, thyroid, and vitamin levels." },
      { step: "Targeted Therapy", detail: "Applying topical barrier creams and systemic supplements." }
    ],
    benefits: ["Resolves painful nail fold swelling", "Promotes strong, ridge-free nail growth", "Corrects underlying nutritional deficiencies"],
    faqs: [
      { q: "What do vertical nail ridges indicate?", a: "They are often a sign of aging or mild nutrient deficiencies, whereas horizontal ridges (Beau's lines) indicate past severe illness." },
      { q: "How do I prevent recurring paronychia?", a: "Avoid biting hangnails, keep hands dry, and wear gloves when washing dishes." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "skin-cancer",
    title: "Skin Cancer (BCC, SCC)",
    short: "Early screening, biopsy, and referral for skin lesions.",
    icon: "Shield",
    category: "Skin",
    overview: "Early identification and clinical diagnostic biopsies for Basal Cell Carcinoma (BCC), Squamous Cell Carcinoma (SCC), and other skin growths. We offer dermoscopic evaluation and surgical diagnostic excisions.",
    symptoms: ["Pearly, dome-like skin nodules", "Non-healing ulcers or bleeding sores", "Rapidly changing dark moles"],
    causes: ["Chronic UV sun damage", "Fair skin types or immune suppression", "Arsenic or chronic wound exposures"],
    process: [
      { step: "Dermoscopy", detail: "Inspecting pigment networks under polarized light." },
      { step: "Punch Biopsy", detail: "Sampling tissue under local anesthesia." },
      { step: "Histopathology", detail: "Laboratory analysis to confirm cell malignancy." }
    ],
    benefits: ["Enables early, life-saving detection", "Clear diagnosis of suspicious moles", "Guides surgical excision margins"],
    faqs: [
      { q: "Is BCC life-threatening?", a: "BCC rarely metastasizes but can damage local tissue if left untreated, making early removal crucial." },
      { q: "What skin changes should I look for?", a: "Follow the ABCDE rule: Asymmetry, Border irregularity, Color changes, Diameter >6mm, and Evolving shape." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80"
  },
  {
    slug: "sexually-transmitted-diseases",
    title: "Sexually Transmitted Diseases (STDs)",
    short: "Confidential diagnostic checks and treatment for infections.",
    icon: "Shield",
    category: "Skin",
    overview: "Discreet and confidential medical consultation, screening, and treatment for STDs, including Syphilis, Gonorrhea, Herpes Simplex, Chlamydia, and genital warts. We focus on ethical, non-judgmental patient counseling.",
    symptoms: ["Painless ulcers or painful sores in the genital area", "Unusual discharge or painful urination", "Genital skin bumps or warts"],
    causes: ["Bacterial, viral, or parasitic transmission during contact"],
    process: [
      { step: "Private Consultation", detail: "Non-judgmental, confidential discussion of history." },
      { step: "Testing Panel", detail: "Taking blood samples or swabs for analysis." },
      { step: "Targeted Cure", detail: "Prescribing single-dose or short-course antibiotics/antivirals." }
    ],
    benefits: ["Complete eradication of bacterial infections", "Reduces risk of pelvic inflammatory complications", "Discreet, compassionate medical care"],
    faqs: [
      { q: "Are STD consults confidential?", a: "Yes, patient privacy is legally protected. All records and tests are strictly confidential." },
      { q: "Can partner treatment prevent reinfection?", a: "Absolutely. Both partners must be treated simultaneously to stop cross-transmission." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80"
  },

  // ─── HAIR TREATMENTS (27-39) ──────────────────────────────────────────────
  {
    slug: "hairfall-thinning",
    title: "Hairfall and Hair Thinning",
    short: "Diagnose and halt excessive shedding with root-cause therapy.",
    icon: "Scissors",
    category: "Hair",
    overview: "Excessive hair shedding (telogen effluvium) or early thinning can be triggered by nutritional deficiencies, stress, or thyroid imbalances. We analyze the scalp using high-magnification trichoscopy and prescribe customized lotion and nutritional plans.",
    symptoms: ["Over 100 hair strands lost daily", "Visible widening of the hair parting", "Thin, weak hair shaft texture"],
    causes: ["Nutritional deficiencies (iron, ferritin, vitamin D3, B12)", "Physical or emotional stress (illness, surgery)", "Thyroid disorders or hormonal shifts"],
    process: [
      { step: "Scalp Trichoscopy", detail: "Analyzing hair follicle density and shaft diameter." },
      { step: "Blood Panel", detail: "Identifying iron, vitamin, and hormone deficiencies." },
      { step: "Targeted Lotions", detail: "Prescribing evidence-based hair growth promoters." }
    ],
    benefits: ["Halts excessive hair shedding in 6-8 weeks", "Improves hair shaft diameter and volume", "Corrects underlying metabolic deficiencies"],
    faqs: [
      { q: "Does stress trigger hair loss?", a: "Yes, telogen effluvium typically occurs 2 to 3 months after a highly stressful event or severe illness." },
      { q: "Are hair vitamins effective?", a: "Yes, when they address verified deficiencies like iron, zinc, or biotin." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80"
  },
  {
    slug: "male-pattern-hairfall",
    title: "Male Pattern Hairfall (Androgenetic Alopecia)",
    short: "Halt receding hairlines and restore density in bald zones.",
    icon: "Scissors",
    category: "Hair",
    overview: "Male pattern baldness causes hair follicles to shrink over time, starting at the temples and crown. We combat this using DHT blockers, minoxidil formulations, and follicular stimulation therapies.",
    symptoms: ["Receding hairline at the temples (M-shaped)", "Thinning hair at the crown (vertex)", "Progressive miniaturization of hair shafts"],
    causes: ["Genetic sensitivity to DHT (dihydrotestosterone)", "Age-related hair follicle changes"],
    process: [
      { step: "Pattern Grading", detail: "Determining Norwood scale classification." },
      { step: "DHT Blocking", detail: "Prescribing oral and topical DHT blockers." },
      { step: "Stimulation", detail: "Custom topical solutions to keep follicles active." }
    ],
    benefits: ["Halts progressive hairline recession", "Thickens thin hair shafts", "Prevents premature hair follicle death"],
    faqs: [
      { q: "Is male pattern baldness curable?", a: "It is progressive but highly manageable; early treatment can stop recession and regrow hair in thinning areas." },
      { q: "Do I have to use minoxidil forever?", a: "To maintain the regrown hair, consistent long-term use is required." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "female-pattern-hairfall",
    title: "Female Pattern Hairfall",
    short: "Targeted therapy to restore volume along the central part.",
    icon: "Scissors",
    category: "Hair",
    overview: "Female pattern hair loss presents as diffuse thinning across the top of the scalp, widening the central part. We address this using safe topical agents, anti-androgen therapy, and nutrient support.",
    symptoms: ["Widening of the central hair parting (Christmas tree pattern)", "Diffuse hair thinning across the crown", "Fringe remains unaffected"],
    causes: ["Genetic factors and hormonal imbalances (PCOS, menopause)", "Iron and thyroid deficiencies"],
    process: [
      { step: "Hormonal Workup", detail: "Checking for PCOS, thyroid levels, and iron stores." },
      { step: "Scalp Scan", detail: "Measuring percentage of miniaturized hair follicles." },
      { step: "Safe Topical Plan", detail: "Prescribing custom scalp drops and density serums." }
    ],
    benefits: ["Narrows the visible scalp parting line", "Restores diffuse hair density", "Halts progressive thinning"],
    faqs: [
      { q: "Can PCOS cause hair loss in women?", a: "Yes, elevated androgen levels in PCOS can shrink scalp hair follicles, leading to thinning." },
      { q: "Is minoxidil safe for women?", a: "Yes, lower-dose topical formulations are highly safe and effective for female pattern hair loss." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80"
  },
  {
    slug: "dandruff",
    title: "Dandruff (Pityriasis Capitis)",
    short: "Soothe scalp itching and eliminate persistent white flakes.",
    icon: "Scissors",
    category: "Hair",
    overview: "Dandruff is caused by Malassezia yeast overgrowth on the scalp. We provide clinical-strength antifungal shampoos, keratolytic scalp lotions, and anti-inflammatory drops to resolve severe flaking and itching.",
    symptoms: ["White or yellowish greasy flakes on scalp and clothes", "Itchy, dry, or red scalp skin", "Temporary hair shedding due to scalp itching"],
    causes: ["Malassezia yeast sensitivity", "Excess scalp sebum production", "Stress and irregular hair washing"],
    process: [
      { step: "Scalp Grading", detail: "Checking for underlying seborrheic dermatitis or psoriasis." },
      { step: "Flake Clearing", detail: "Prescribing salicylic acid or ketoconazole shampoos." },
      { step: "Soothing Lotions", detail: "Applying anti-inflammatory scalp drops to relieve itching." }
    ],
    benefits: ["Eliminates persistent white flakes", "Soothes scalp itching and redness", "Promotes a healthy scalp environment"],
    faqs: [
      { q: "Is dandruff a fungal infection?", a: "It is linked to a natural yeast called Malassezia. An overgrowth triggers inflammatory flaking in sensitive individuals." },
      { q: "How often should I wash my hair?", a: "Washing 3 times a week with a medicated shampoo helps control excess oil and yeast buildup." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80"
  },
  {
    slug: "ingrown-hair",
    title: "Ingrown Hair",
    short: "Calm painful bumps caused by trapped hair shafts.",
    icon: "Scissors",
    category: "Hair",
    overview: "Ingrown hairs occur when shaved or plucked hair curls back into the skin, causing red, painful bumps. We offer topical keratolytics, soothing anti-inflammatory lotions, and laser hair reduction suggestions for a permanent cure.",
    symptoms: ["Painful, red bumps (pseudofolliculitis)", "Small pus-filled pimples around hair follicles", "Visible dark hair trapped under the skin"],
    causes: ["Shaving, plucking, or waxing curly hair", "Tight clothing chafing shaved areas", "Dead skin cells blocking hair exit paths"],
    process: [
      { step: "Bump Evaluation", detail: "Checking for active infection or scarring." },
      { step: "Dead Skin Clearing", detail: "Applying salicylic or glycolic acid to free trapped hairs." },
      { step: "Smooth Healing", detail: "Prescribing mild anti-inflammatory creams." }
    ],
    benefits: ["Clears painful shaving bumps", "Prevents dark marks (PIH) and scarring", "Provides smooth skin texture"],
    faqs: [
      { q: "How do I prevent ingrown hairs when shaving?", a: "Shave in the direction of hair growth, use a sharp single-blade razor, and hydrate the skin beforehand." },
      { q: "Is laser hair removal helpful for this?", a: "Yes, it is the gold-standard treatment, as destroying the hair follicle prevents ingrown hair formation completely." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "alopecia-areata",
    title: "Alopecia Areata",
    short: "Restore hair in sudden, coin-sized bald patches.",
    icon: "Scissors",
    category: "Hair",
    overview: "Alopecia Areata is an autoimmune condition causing sudden, round bald patches. We use localized micro-injections (intralesional steroids) and topical immunotherapy to restart hair growth safely.",
    symptoms: ["Sudden, smooth, round bald patches", "Short 'exclamation mark' hairs at patch borders", "Nail pitting may be present"],
    causes: ["Immune system mistakenly attacking hair follicles", "Genetic links triggered by viral illness or stress"],
    process: [
      { step: "Patch Mapping", detail: "Checking the number of patches and active margins." },
      { step: "Micro-Targeting", detail: "Administering intralesional steroids into the patches." },
      { step: "Growth Induction", detail: "Prescribing topical minoxidil or immunomodulators." }
    ],
    benefits: ["Induces hair regrowth in bald patches", "Stops autoantibodies from attacking hair roots", "Restores normal hair density"],
    faqs: [
      { q: "Can hair grow back on its own?", a: "Yes, mild cases may show spontaneous regrowth, but medical intervention speeds up the process and prevents spreading." },
      { q: "Is Alopecia Areata contagious?", a: "No, it is an autoimmune condition and is not contagious." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "scalp-psoriasis",
    title: "Scalp Psoriasis",
    short: "Medical care for thick, scaly, and itchy scalp plaques.",
    icon: "Scissors",
    category: "Hair",
    overview: "Scalp psoriasis causes thick, red plaques covered with silvery scales, often extending beyond the hairline. We prescribe coal tar shampoos, salicylic acid descalers, and anti-inflammatory scalp applications.",
    symptoms: ["Silvery-white scales on a red scalp base", "Itching, soreness, and burning sensations", "Dry flakes that look like severe dandruff"],
    causes: ["Autoimmune condition causing accelerated scalp cell turnover"],
    process: [
      { step: "Plaque Analysis", detail: "Differentiating scalp psoriasis from seborrheic dermatitis." },
      { step: "Scale Softening", detail: "Applying salicylic acid oils to loosen thick scales." },
      { step: "Clearance Therapy", detail: "Medicated coal tar washes and targeted topical steroids." }
    ],
    benefits: ["Removes thick scaly plaques", "Relieves scalp itching and soreness", "Protects hair follicles from inflammation"],
    faqs: [
      { q: "Can scalp psoriasis cause hair loss?", a: "Yes, severe itching and rough scale removal can temporarily pull out hair, but it grows back once inflammation is controlled." },
      { q: "How is it different from dandruff?", a: "Psoriasis scales are dry, thick, and silvery, while dandruff flakes are loose, greasy, and yellow-white." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80"
  },
  {
    slug: "scarring-alopecia",
    title: "Scarring Alopecia",
    short: "Early clinical stabilization to prevent permanent hair loss.",
    icon: "Scissors",
    category: "Hair",
    overview: "Scarring alopecia (cicatricial alopecia) is a medical emergency where inflammation destroys hair follicles, replacing them with scar tissue. We focus on early, aggressive anti-inflammatory therapy to save remaining hair.",
    symptoms: ["Bald patches with smooth, shiny skin (no visible pores)", "Scalp redness, scales, or pustules around hair edges", "Severe scalp itching or burning in bald zones"],
    causes: ["Inflammatory cells (lymphocytes/neutrophils) destroying the hair bulge", "Conditions like Lichen Planopilaris (LPP) or Frontal Fibrosing Alopecia"],
    process: [
      { step: "Biopsy & Trichoscopy", detail: "Performing a scalp biopsy to identify the inflammatory cell type." },
      { step: "Aggressive Suppression", detail: "Prescribing oral anti-inflammatories or targeted injections." },
      { step: "Follicle Shielding", detail: "Topical medications to protect surrounding active follicles." }
    ],
    benefits: ["Halts permanent hair root destruction", "Soothes scalp pain and itching", "Preserves remaining hair density"],
    faqs: [
      { q: "Can hair grow back in scarred areas?", a: "No, once a follicle is replaced by scar tissue, it cannot grow hair again, which is why early treatment is vital." },
      { q: "What is the primary treatment goal?", a: "To stop the progression of inflammation and save all remaining active hair follicles." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "folliculitis",
    title: "Folliculitis",
    short: "Clear painful, red, pus-filled bumps around hair roots.",
    icon: "Scissors",
    category: "Hair",
    overview: "Folliculitis is the inflammation or bacterial/fungal infection of hair follicles, resembling tiny pus pimples on the scalp or body. We provide targeted antiseptic washes and specific antibiotic drops.",
    symptoms: ["Clusters of small red bumps with a hair in the center", "Pus-filled blisters that break open and crust over", "Itching, burning, or skin tenderness"],
    causes: ["Staphylococcus bacterial or Malassezia fungal entry", "Friction from shaving, tight hats, or sweaty clothing"],
    process: [
      { step: "Pathogen Check", detail: "Determining if the folliculitis is bacterial or fungal." },
      { step: "Antiseptic Wash", detail: "Prescribing clinical-grade benzoyl peroxide or antifungal washes." },
      { step: "Targeted Topicals", detail: "Applying localized antibiotic lotions." }
    ],
    benefits: ["Clears painful pus-filled bumps", "Relieves scalp/body itching and soreness", "Prevents hair follicle scarring"],
    faqs: [
      { q: "Is folliculitis contagious?", a: "Usually no, but sharing razor blades or towels can spread the causative bacteria." },
      { q: "Can hot tubs cause folliculitis?", a: "Yes, poorly chlorinated hot tubs can harbor Pseudomonas bacteria, causing a specific flare-up." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "lichen-sclerosus",
    title: "Lichen Sclerosus",
    short: "Clinical care for fragile, thinning, and white skin patches.",
    icon: "Shield",
    category: "Skin",
    overview: "Lichen Sclerosus is an inflammatory skin condition causing thin, white, fragile patches, most commonly in the genital region. We focus on high-potency topical anti-inflammatories to prevent scarring and structural changes.",
    symptoms: ["Shiny, smooth, white patches on the skin", "Fragile skin that tears easily, causing bruising", "Severe itching, burning, or painful intercourse"],
    causes: ["Autoimmune inflammatory process", "Hormonal influences and genetic predisposition"],
    process: [
      { step: "Visual Grading", detail: "Carefully inspecting patch boundaries and skin thickness." },
      { step: "Anti-Inflammatory Plan", detail: "Prescribing high-potency steroid or calcineurin inhibitor creams." },
      { step: "Home Guidance", detail: "Discussing gentle washing routines and barrier ointments." }
    ],
    benefits: ["Soothes severe itching and burning", "Prevents skin scarring and narrowing", "Restores skin elasticity"],
    faqs: [
      { q: "Is Lichen Sclerosus an STD?", a: "No, Lichen Sclerosus is an autoimmune skin condition and is not sexually transmitted." },
      { q: "Can it affect non-genital skin?", a: "Yes, it can occasionally appear on the neck, shoulders, or upper body as flat white spots." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
  },
  {
    slug: "tinea-capitis",
    title: "Tinea Capitis (Scalp Ringworm)",
    short: "Targeted pediatric antifungal care for scaly bald patches.",
    icon: "Scissors",
    category: "Hair",
    overview: "Tinea capitis is a fungal infection of the scalp and hair shafts, primarily seen in children. It causes scaly, red bald patches with black dots (broken hairs). We treat this using oral antifungal liquids and medicated shampoos.",
    symptoms: ["One or more round patches of scaly, red skin on the scalp", "Hair broken off close to the scalp surface (black dots)", "Severe scalp itching and tender, swollen lymph nodes"],
    causes: ["Dermatophyte fungal infection", "Sharing hats, combs, or direct contact with infected pets/playmates"],
    process: [
      { step: "KOH Examination", detail: "Scraping scales to identify fungal elements under a microscope." },
      { step: "Oral Antifungals", detail: "Prescribing pediatric-safe oral griseofulvin or terbinafine." },
      { step: "Antiseptic Wash", detail: "Using ketoconazole shampoo to prevent spore spread." }
    ],
    benefits: ["Clears scaly scalp ringworm completely", "Promotes healthy hair regrowth in bald areas", "Prevents kerion (painful, pus-oozing swellings)"],
    faqs: [
      { q: "Can scalp ringworm cause permanent baldness?", a: "Typically no, hair grows back once treated. However, if left untreated, it can form a severe inflammatory swelling (kerion) that causes permanent scarring and hair loss." },
      { q: "Should family members be checked?", a: "Yes, siblings and pets should be screened as they can carry the fungus without showing symptoms." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80"
  },
  {
    slug: "granuloma-pyogenicum-hair",
    title: "Granuloma Pyogenicum in Hair",
    short: "Safe management for bleeding red vascular scalp nodules.",
    icon: "Scissors",
    category: "Hair",
    overview: "Pyogenic granulomas on the scalp are bright red, vascular nodules that bleed easily at the slightest touch. We offer clinical diagnosis, electrocautery, or surgical excision under local anesthesia to remove the growth cleanly.",
    symptoms: ["Small, red, raised nodule that looks like raw meat", "Frequent bleeding with combing or minor friction", "Rapid growth over a few weeks"],
    causes: ["Localized blood vessel proliferation", "Minor skin trauma or hormonal fluctuations"],
    process: [
      { step: "Dermoscopic Check", detail: "Analyzing the vascular structure to rule out other lesions." },
      { step: "Minor Procedure", detail: "Removing the nodule under local anesthesia." },
      { step: "Wound Dressing", detail: "Applying antibiotic dressing to ensure clean healing." }
    ],
    benefits: ["Stops frequent, messy scalp bleeding", "Permanently removes the vascular nodule", "Heals the scalp with minimal scarring"],
    faqs: [
      { q: "Why does it bleed so easily?", a: "It is composed entirely of capillary blood vessels, making it highly fragile." },
      { q: "Is pyogenic granuloma cancerous?", a: "No, it is a completely benign vascular growth, though its rapid growth can be alarming." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "seborrheic-dermatitis",
    title: "Seborrheic Dermatitis",
    short: "Calm greasy, yellow scaling and redness on the scalp and face.",
    icon: "Scissors",
    category: "Hair",
    overview: "Seborrheic dermatitis causes oily, yellowish flakes on a red, itchy scalp, eyebrows, and nose creases. We target this with antifungal shampoos, mild keratolytic creams, and soothing anti-inflammatory drops.",
    symptoms: ["Greasy, yellowish flakes on scalp, ears, or eyebrows", "Red, itchy skin patches in oily areas", "Burning or stinging sensation on the scalp"],
    causes: ["Inflammatory reaction to Malassezia yeast in oily zones", "Stress, cold weather, and genetic factors"],
    process: [
      { step: "Scalp and Face Check", detail: "Differentiating from eczema or psoriasis." },
      { step: "Antifungal Wash", detail: "Prescribing ketoconazole or selenium sulfide shampoo." },
      { step: "Facial Care", detail: "Applying low-potency antifungal creams to clear red patches." }
    ],
    benefits: ["Eliminates greasy yellow flakes", "Reduces facial redness and scalp itching", "Prevents flares in high-sebum zones"],
    faqs: [
      { q: "Is there a permanent cure for seborrheic dermatitis?", a: "It is a chronic condition that tends to flare with stress or weather changes. Regular maintenance shampooing keeps it completely controlled." },
      { q: "Can I oil my hair if I have this?", a: "No, hair oiling feeds the Malassezia yeast, worsening the greasy flakes and itching." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1527799851257-ef403a7830c1?w=800&q=80"
  },

  // ─── LASERS (40-50) ──────────────────────────────────────────────────────
  {
    slug: "diode-laser-hair-reduction",
    title: "Diode Laser Hair Reduction",
    short: "Gold-standard laser for smooth, permanent body hair reduction.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "We utilize advanced 808nm/810nm Diode laser technology to target hair follicles in their active growth phase. This safe, globally trusted system reduces unwanted body hair permanently with built-in cooling tips for comfort.",
    symptoms: ["Unwanted facial or body hair", "Frequent shaving cuts, bumps, or ingrown hairs", "Thick coarse hair growth"],
    causes: ["Genetic hair growth patterns", "Hormonal influences like PCOS (hirsutism)"],
    process: [
      { step: "Skin Grading", detail: "Evaluating skin type and hair thickness." },
      { step: "Chilled Gel & Grid", detail: "Applying cooling gel and marking the treatment area." },
      { step: "Laser Swipes", detail: "Delivering comfortable, high-frequency diode pulses." }
    ],
    benefits: ["Up to 80-90% permanent hair reduction", "Eliminates ingrown hairs and razor bumps", "Leaves skin soft and smooth"],
    faqs: [
      { q: "Is diode laser safe for dark Indian skin?", a: "Yes, diode lasers have long wavelengths that bypass skin melanin, making them exceptionally safe for Indian skin types." },
      { q: "How many sessions are required?", a: "Typically, 6 to 8 sessions spaced 4 to 6 weeks apart are needed for optimal results." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  },
  {
    slug: "laser-for-scars",
    title: "Laser for Scars",
    short: "Resurface uneven skin and flatten old, visible scar tissue.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "Non-invasive laser resurfacing to remodel thick, uneven scar tissue. The laser creates microscopic treatment columns, stimulating new collagen production to smooth out scars from accidents, surgeries, or injuries.",
    symptoms: ["Raised or uneven surgical/accidental scars", "Discolored scar tissue", "Loss of skin elasticity in scarred areas"],
    causes: ["Deep skin injury breaching the dermal layer", "Disorganized collagen deposition during healing"],
    process: [
      { step: "Numbing Cream", detail: "Applying topical anesthetic for 45 minutes." },
      { step: "Laser Targeting", detail: "Delivering micro-pulses over the scar tissue." },
      { step: "Post-care Emollient", detail: "Applying soothing antibiotic creams." }
    ],
    benefits: ["Flattens raised, uneven scar tissue", "Smooth skin texture and blends margins", "Improves local skin flexibility"],
    faqs: [
      { q: "How does the skin look immediately after?", a: "The treated area will look pink/red and swollen, like mild sunburn, resolving in 3-5 days." },
      { q: "Will old scars respond to laser?", a: "Yes, even older scars show significant improvement in texture and blending, though early treatment is preferred." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    slug: "mnrf-acne-scars",
    title: "MNRF for Acne Scars",
    short: "Microneedling RF to rebuild deep pitted acne scars.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "Microneedling Radiofrequency (MNRF) is the gold standard for treating deep pitted acne scars. Sterile microneedles deliver radiofrequency energy directly into the dermis, triggering rapid collagen remodeling with minimal downtime.",
    symptoms: ["Rolling, boxcar, and deep pitted acne scars", "Uneven skin texture and open pores", "Mild facial skin laxity"],
    causes: ["Destruction of skin support tissue by severe acne cysts"],
    process: [
      { step: "Skin Numbing", detail: "Applying a thick layer of topical anesthetic cream." },
      { step: "MNRF Treatment", detail: "Stamping the sterile needle grid across scar zones." },
      { step: "Soothe Mask", detail: "Applying a cooling, skin-repairing growth factor serum." }
    ],
    benefits: ["Significantly lifts depressed acne scars", "Tightens pores and firms skin", "Safer for Indian skin than aggressive lasers"],
    faqs: [
      { q: "Is there downtime after MNRF?", a: "Expect redness and tiny grid marks for 24-48 hours. You can return to work using sunscreen and moisturizer." },
      { q: "How many MNRF sessions do I need?", a: "Most patients require 3 to 5 sessions spaced 4 weeks apart for significant scar lifting." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
  },
  {
    slug: "q-switch-laser-pigmentation",
    title: "Q-Switch Laser for Pigmentation",
    short: "Targeted laser to shatter deep pigmentation and spots.",
    icon: "Sun",
    category: "Lasers",
    overview: "Q-Switched laser technology delivers rapid nanosecond pulses of light to shatter deep dermal pigment (melanin) without damaging the surrounding skin. The body naturally clears the shattered particles, fading dark spots.",
    symptoms: ["Stubborn spots, freckles, and age spots", "Deep dermal pigmentation (nevus of Ota, Becker's nevus)", "Uneven skin tone"],
    causes: ["Localized excess melanin deposits", "UV sun damage and genetic birthmarks"],
    process: [
      { step: "Eye Shielding", detail: "Placing protective laser goggles on the patient." },
      { step: "Laser Zaps", detail: "Applying targeted laser snaps over pigmented spots." },
      { step: "Cool Pack", detail: "Applying cold compresses to soothe the skin." }
    ],
    benefits: ["Fades dark spots and sun patches", "Brightens overall complexion", "Non-invasive with zero peeling downtime"],
    faqs: [
      { q: "Does Q-switch laser hurt?", a: "It feels like the snap of a warm rubber band on the skin. Most patients find it very tolerable without numbing." },
      { q: "Will the pigmentation return?", a: "Faded sunspots will not return if you maintain strict sun protection using SPF daily." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    slug: "laser-treatment-lpp",
    title: "Laser Treatment for LPP",
    short: "Low-fluence laser targeting to reduce LPP scalp inflammation.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "We use low-fluence Q-switched or photomodulation lasers to reduce active follicular inflammation in Lichen Planopilaris (LPP). This soothing therapy helps preserve hair roots by reducing scalp inflammation.",
    symptoms: ["Follicular scale, redness, and itching in LPP", "Progressive hair thinning in active zones", "Scalp burning sensations"],
    causes: ["Follicular lymphocytic inflammation in Lichen Planopilaris"],
    process: [
      { step: "Inflammation Check", detail: "Evaluating active scalp zones under a trichoscope." },
      { step: "Laser Delivery", detail: "Applying low-fluence laser sweeps over the scalp." },
      { step: "Scalp Soothing", detail: "Applying anti-inflammatory lotions after the session." }
    ],
    benefits: ["Calms intense scalp itching and burning", "Helper therapy to slow down LPP scarring", "Reduces follicular redness and scaling"],
    faqs: [
      { q: "Can laser cure LPP?", a: "LPP is a chronic autoimmune condition. Laser therapy is an adjuvant treatment to reduce active inflammation and preserve hair." },
      { q: "Is it hot or painful?", a: "No, it is a warm, comfortable treatment with no downtime." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "carbon-facial-laser",
    title: "Carbon Facial Laser",
    short: "Hollywood peel for instant glow, oil control, and pore tightening.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "The Carbon Laser Peel (Hollywood Peel) involves applying liquid carbon to the face. The carbon binds to oil and dirt inside pores. A Q-Switched laser then vaporizes the carbon, instantly clearing pores and shedding dead skin.",
    symptoms: ["Dull, tired-looking skin", "Excessive oiliness and blackheads", "Congested skin pores"],
    causes: ["Environmental pollution buildup", "Excessive sebum production and dead skin accumulation"],
    process: [
      { step: "Carbon Prep", detail: "Applying a thin layer of natural carbon paste." },
      { step: "Laser Vaporization", detail: "Passing the Q-Switch laser to blast away the carbon." },
      { step: "Hydration Boost", detail: "Applying a soothing antioxidant serum and sunscreen." }
    ],
    benefits: ["Instant skin radiance and glow", "Reduces active oiliness and blackheads", "Tightens and refines open pores"],
    faqs: [
      { q: "Is there any peeling or downtime?", a: "No, there is zero peeling or downtime. Your skin looks instantly refreshed, making it perfect for events." },
      { q: "How often can I get a Carbon Peel?", a: "It can be safely repeated once every 3 to 4 weeks for continuous oil control and glow." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
  },
  {
    slug: "tattoo-removal",
    title: "Tattoo Removal",
    short: "Shatter tattoo ink particles safely with Q-Switch technology.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "Clinical tattoo removal using high-intensity Q-Switched laser pulses. The laser targets the tattoo pigment, shattering it into microscopic particles that your body's immune system clears away naturally over time.",
    symptoms: ["Unwanted cosmetic or decorative body tattoos", "Faded or unevenly colored tattoo ink"],
    causes: ["Introduction of exogenous ink pigments into the dermis"],
    process: [
      { step: "Numbing Area", detail: "Applying a strong topical anesthetic cream." },
      { step: "Laser Targeting", detail: "Sweeping the laser over the ink outline (causing temporary frosting)." },
      { step: "Healing Cream", detail: "Applying a sterile antibiotic ointment and bandage." }
    ],
    benefits: ["Fades and clears dark tattoo inks", "Minimal risk of thermal scarring", "Precision treatment targeting only ink zones"],
    faqs: [
      { q: "Why does it take multiple sessions?", a: "Tattoo ink is layered deep in the skin; each session shatters the topmost layer of ink for the body to clear." },
      { q: "Can multi-colored tattoos be removed?", a: "Black and dark blue inks respond best. Green and red inks require specific laser wavelengths." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
  },
  {
    slug: "birthmark-removal",
    title: "Birth Mark Removal",
    short: "Fade congenital dark or vascular skin patches.",
    icon: "Sun",
    category: "Lasers",
    overview: "Targeted laser therapies to fade pigmented birthmarks (like Café-au-lait spots, Becker's nevus) or vascular markings. The laser targets specific pigments to break them down with minimal skin irritation.",
    symptoms: ["Congenital brown, black, or red patches", "Irregularly shaped skin pigmentation present from birth"],
    causes: ["Local excess of melanin or blood vessel clustering during birth development"],
    process: [
      { step: "Diagnostic Grading", detail: "Classifying birthmark type and depth." },
      { step: "Laser Treatment", detail: "Flashes of pigment-specific wavelengths." },
      { step: "Soothing Dressing", detail: "Applying cooling gels to support recovery." }
    ],
    benefits: ["Fades dark or red congenital marks", "Balances surrounding skin tone", "Non-surgical, precise treatment"],
    faqs: [
      { q: "Are birthmarks fully removable?", a: "Many fade significantly (up to 70-90%), while some vascular marks may require multiple sessions to remain light." },
      { q: "Is it safe for children?", a: "Yes, under expert dermatological guidance, birthmark lasers are highly safe." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  },
  {
    slug: "bindi-tattoo-removal",
    title: "Bindi Tattoo Removal",
    short: "Gently clear dark forehead bindi tattoos using laser.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "Forehead bindi tattoos require extra care. We use precise Q-Switched laser targeting to break down dark ink pigments on the forehead skin without causing damage to the hair follicles or skin tissue.",
    symptoms: ["Unwanted black or dark green bindi tattoos on the forehead"],
    causes: ["Decorative cosmetic tattooing in the glabella region"],
    process: [
      { step: "Precision Numbing", detail: "Applying target numbing cream for comfort." },
      { step: "Spot Laser", detail: "Delivering short, precise laser shots to break down ink." },
      { step: "Sooth & Heal", detail: "Applying antibiotic ointment to ensure clean healing." }
    ],
    benefits: ["Fades bindi ink outline cleanly", "No scar residue on the forehead", "Safe, quick 10-minute sessions"],
    faqs: [
      { q: "How many sessions are needed?", a: "Typically 3 to 5 sessions, depending on the depth and age of the tattoo ink." },
      { q: "Will it leave a white spot?", a: "We calibrate the laser parameters carefully to avoid destroying your natural skin pigment (hypopigmentation)." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
  },
  {
    slug: "permanent-makeup-removal",
    title: "Permanent Makeup Removal",
    short: "Correct or clear old, faded microblading or lip liner ink.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "Lasers can safely remove faded eyebrow microblading, lip liners, or cosmetic tattoos. We use low-fluence laser passes to shatter pigment particles, allowing the body to naturally clear them.",
    symptoms: ["Faded, blue-gray eyebrow tattoos or lip liner outlines", "Asymmetric permanent makeup mistakes"],
    causes: ["Cosmetic microblading or permanent makeup pigment oxidation"],
    process: [
      { step: "Shielding", detail: "Using specific metal shields to protect the eyes." },
      { step: "Laser Pass", detail: "Carefully sweeping the laser over eyebrow or lip borders." },
      { step: "Post-care Gel", detail: "Applying soothing healing ointment." }
    ],
    benefits: ["Fades outdated microblading pigments", "Prepares skin for fresh cosmetic touch-ups", "Safe and precise around delicate facial features"],
    faqs: [
      { q: "Does lip liner removal cause lip swelling?", a: "Mild swelling is normal for 24-48 hours. Cold compresses help resolve this quickly." },
      { q: "Will my eyebrow hairs fall out?", a: "The laser targets pigment, not hair roots. Hair may turn temporarily white but will regrow normally." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  },
  {
    slug: "hifu-laser-antiaging",
    title: "HIFU Laser for Wrinkles and Anti-Aging",
    short: "High-Intensity Focused Ultrasound for non-surgical face lift.",
    icon: "Sparkles",
    category: "Lasers",
    overview: "High-Intensity Focused Ultrasound (HIFU) delivers focused ultrasound energy deep into the skin's structural layers (SMAS). This triggers natural collagen synthesis, tightening and lifting sagging jawlines and cheeks.",
    symptoms: ["Jowls and sagging jawlines", "Fine lines, wrinkles, and double chin", "Loss of skin tightness"],
    causes: ["Gravity and loss of deep dermal support tissue over time"],
    process: [
      { step: "Mapping", detail: "Marking treatment zones on the face and neck." },
      { step: "Ultrasound Gel", detail: "Applying conductive gel to the skin." },
      { step: "HIFU Delivery", detail: "Delivering targeted ultrasound energy sweeps." }
    ],
    benefits: ["Lifts and refines jawlines (non-surgical lift)", "Smooths out fine lines and neck wrinkles", "Stimulates long-term natural collagen production"],
    faqs: [
      { q: "Is HIFU painful?", a: "You may feel a warm, prickly sensation along the jawline. We adjust the energy levels to ensure your comfort." },
      { q: "When are results visible?", a: "You will notice an immediate tightening, with peak lifting results appearing 2 to 3 months later as new collagen builds." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
  },

  // ─── PROCEDURES (51-62) ──────────────────────────────────────────────────
  {
    slug: "keloid-treatment-procedure",
    title: "Keloid Treatment",
    short: "Targeted steroid injections and flattening for thick scars.",
    icon: "Clock",
    category: "Procedure",
    overview: "For active keloids, we provide direct intralesional injections of triamcinolone acetonide. This breaks down excess collagen fibers, flattening the scar and stopping persistent itching and pain.",
    symptoms: ["Raised, hard, overgrown scar tissue", "Itching, stinging, or painful scars"],
    causes: ["Abnormal wound healing response producing excess collagen"],
    process: [
      { step: "Sterile Clean", detail: "Aseptic prep of the scar area." },
      { step: "Micro-injection", detail: "Carefully injecting steroid solution into the core of the keloid." },
      { step: "Pressure Advice", detail: "Applying silicone sheets to support flattening." }
    ],
    benefits: ["Flattens raised keloid scars", "Relieves chronic itching and pain", "Improves range of motion in scar joints"],
    faqs: [
      { q: "How many injections will I need?", a: "Most keloids require 3 to 6 sessions spaced 4 weeks apart to achieve significant flattening." },
      { q: "Will the keloid disappear completely?", a: "It will flatten and match the surrounding skin level, though the base texture may feel slightly different." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    slug: "mole-removal",
    title: "Mole Removal",
    short: "Safe, sterile cosmetic removal of raised or dark moles.",
    icon: "Clock",
    category: "Procedure",
    overview: "We perform safe cosmetic mole removal using radiofrequency cautery or punch excision under local anesthesia. This resolves raised, dark, or rubbing moles cleanly with minimal scarring.",
    symptoms: ["Raised, dark, or brown skin moles", "Moles that rub against clothing or jewelry"],
    causes: ["Localized cluster of pigment-producing cells (melanocytes)"],
    process: [
      { step: "Local Numbing", detail: "Micro-injection of local anesthetic for a pain-free session." },
      { step: "RF Excision", detail: "Gently shaving or excise the mole tissue." },
      { step: "Wound Dressing", detail: "Applying healing cream and a small bandage." }
    ],
    benefits: ["Quick in-office procedure", "Improves cosmetic appearance", "Removes rubbing or snagging moles"],
    faqs: [
      { q: "Will mole removal leave a scar?", a: "We use precision radiofrequency shaving, which heals into a faint, flat mark that blends with the skin over time." },
      { q: "Is mole removal painful?", a: "The local anesthetic injection numbs the area completely, so you won't feel any pain during the procedure." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
  },
  {
    slug: "skintag-wart-removal",
    title: "Skin Tag and Wart Removal",
    short: "Instant clearing of skin tags and viral warts.",
    icon: "Clock",
    category: "Procedure",
    overview: "Fast removal of skin tags and viral warts using radiofrequency (RF) ablation. RF cautery instantly vaporizes the target tissue with minimal bleeding and rapid healing.",
    symptoms: ["Fleshy skin tags on the neck or underarms", "Rough, bumpy viral warts on hands or feet"],
    causes: ["Skin friction (tags) or Human Papillomavirus infection (warts)"],
    process: [
      { step: "Aseptic Prep", detail: "Cleaning the target growths." },
      { step: "RF Ablation", detail: "Vaporizing the tags or warts using a radiofrequency tip." },
      { step: "Post-care Spray", detail: "Applying antibiotic powder or healing cream." }
    ],
    benefits: ["Instant removal of growths in one session", "Minimal downtime and rapid skin healing", "Prevents viral warts from spreading"],
    faqs: [
      { q: "Do warts return after removal?", a: "Warts are viral; if the virus remains dormant in the surrounding skin, new ones can occasionally form, requiring a touch-up." },
      { q: "How long does the skin take to heal?", a: "Tiny scabs form and shed off naturally within 5 to 7 days, leaving clear skin underneath." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80"
  },
  {
    slug: "mucoid-cyst-cautery",
    title: "Mucoid Cyst Treatment - Chemical Cautery",
    short: "Treat painful lip or nail cysts with chemical cauterization.",
    icon: "Clock",
    category: "Procedure",
    overview: "Mucoid cysts are fluid-filled sacs that commonly occur on the inner lip or near nail folds. We treat them using chemical cauterization or local cyst expression followed by localized cautery to prevent recurrence.",
    symptoms: ["Translucent, fluid-filled bump on lip or finger", "Cyst swells and drains clear jelly-like fluid"],
    causes: ["Minor salivary gland block (lip) or joint fluid leakage (finger)"],
    process: [
      { step: "Drainage", detail: "Safe evacuation of the mucoid fluid." },
      { step: "Chemical Cautery", detail: "Applying medical cauterizing agent inside the cyst pocket." },
      { step: "Soothe", detail: "Applying healing ointment." }
    ],
    benefits: ["Clears the persistent fluid bump", "Lowers the rate of cyst recurrence", "Quick, outpatient procedure"],
    faqs: [
      { q: "Is chemical cautery painful?", a: "We apply topical numbing gel or inject local anesthetic to make the procedure highly comfortable." },
      { q: "How long does a lip cyst take to heal?", a: "Oral mucosal tissues heal exceptionally fast, typically within 4-5 days." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    slug: "ingrown-nail-removal",
    title: "Ingrown Nail Removal",
    short: "Surgical resection for permanent relief from painful nails.",
    icon: "Clock",
    category: "Procedure",
    overview: "For severe or recurring ingrown nails, we perform a partial nail avulsion combined with chemical matricectomy. This narrows the nail plate permanently so it no longer digs into the skin.",
    symptoms: ["Pain, swelling, and pus along the nail edge", "Overgrown skin covering the nail border"],
    causes: ["Improper nail cutting or tight shoe friction"],
    process: [
      { step: "Digital Block", detail: "Injecting local anesthetic at the base of the toe for complete numbness." },
      { step: "Wedge Resection", detail: "Removing the narrow ingrown sliver of nail." },
      { step: "Matrix Destruction", detail: "Applying chemical phenol to prevent the edge from growing back." }
    ],
    benefits: ["Resolves throbbing nail pain permanently", "Eliminates chronic nail fold infections", "Allows you to wear normal shoes again"],
    faqs: [
      { q: "How long is the recovery?", a: "The toe heals within 1 to 2 weeks. You can walk comfortably the day after the procedure." },
      { q: "Will the whole nail be removed?", a: "No, we only remove the narrow ingrown border (about 10-15% of the nail), leaving the rest of the nail intact." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1604654894610-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "sebaceous-cyst-removal",
    title: "Sebaceous Cyst Removal",
    short: "Sterile excision of under-skin fluid sacs.",
    icon: "Clock",
    category: "Procedure",
    overview: "Sebaceous cysts are closed sacs under the skin containing cheesy keratin material. We perform complete surgical excision, removing the entire cyst wall (capsule) under local anesthesia to prevent recurrence.",
    symptoms: ["Firm, movable lump under the skin", "Small dark pore at the center of the lump", "Redness or swelling if infected"],
    causes: ["Blocked sebaceous glands or hair follicles"],
    process: [
      { step: "Numbing", detail: "Injecting local anesthetic around the cyst." },
      { step: "Excision", detail: "Making a small incision and removing the cyst intact with its capsule." },
      { step: "Suturing", detail: "Closing the skin with fine sutures for minimal scarring." }
    ],
    benefits: ["Permanently removes the under-skin lump", "Prevents painful cyst infections and rupture", "Leaves a neat, minimal scar line"],
    faqs: [
      { q: "What happens if a cyst ruptures?", a: "A ruptured cyst becomes inflamed, red, and painful, resembling an abscess. It is best to excise it before it ruptures." },
      { q: "When are the stitches removed?", a: "Face stitches are removed in 5-7 days; body stitches are removed in 10-14 days." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80"
  },
  {
    slug: "lipoma-removal",
    title: "Lipoma Removal",
    short: "Surgical removal of benign, soft fat lumps under the skin.",
    icon: "Clock",
    category: "Procedure",
    overview: "Lipomas are soft, doughy fat lumps under the skin. While benign, they can grow large or cause discomfort. We perform surgical excision under local anesthesia to remove them cleanly.",
    symptoms: ["Soft, movable fat lump under the skin", "Feels doughy and doesn't cause pain unless pressing on a nerve", "Grows very slowly over years"],
    causes: ["Local overgrowth of fat cells (genetic tendency)"],
    process: [
      { step: "Local Anesthesia", detail: "Numbing the skin over the lump." },
      { step: "Excision", detail: "Making a clean incision to pop out the fat nodule." },
      { step: "Closure", detail: "Closing the skin with fine cosmetic sutures." }
    ],
    benefits: ["Permanently removes the under-skin fat lump", "Eliminates local pressure or rubbing discomfort", "Improves body contour appearance"],
    faqs: [
      { q: "Is a lipoma cancerous?", a: "No, lipomas are completely benign fat tissue growths and are not cancerous." },
      { q: "Can multiple lipomas be removed in one session?", a: "Yes, we can safely remove multiple small lipomas under local anesthesia in a single visit." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    slug: "biopsy",
    title: "Biopsy (Skin & Nail)",
    short: "Punch or shave biopsy for accurate laboratory diagnosis.",
    icon: "Clock",
    category: "Procedure",
    overview: "When a skin or nail condition is complex, a biopsy is performed. We take a tiny skin tissue sample (typically 3-4mm punch) under local anesthesia and send it to histopathology for diagnostic confirmation.",
    symptoms: ["Chronic, non-healing skin rashes", "Suspicious pigmented moles", "Thickened skin growths of unknown cause"],
    causes: ["Need for microscopic analysis of skin cells"],
    process: [
      { step: "Numbing Block", detail: "Ensuring the biopsy area is completely numb." },
      { step: "Punch Sample", detail: "Taking a small, circular tissue cylinder." },
      { step: "Stitch & Patch", detail: "Placing a single stitch and dressing the area." }
    ],
    benefits: ["Provides a clear diagnostic report", "Differentiates similar-looking skin conditions", "Guides target treatment plans"],
    faqs: [
      { q: "Will the biopsy leave a scar?", a: "A 3mm punch biopsy leaves a tiny, flat, dot-like mark that fades over time." },
      { q: "How long do biopsy results take?", a: "Histopathology reports are typically ready within 5 to 7 working days." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    slug: "vitiligo-surgery",
    title: "Vitiligo Surgery",
    short: "Skin grafting for stable, non-spreading white patches.",
    icon: "Clock",
    category: "Procedure",
    overview: "For vitiligo patches that have been stable (not spreading) for at least one year, we offer advanced surgical option: punch grafting or epidermal melanocyte transfer to restore natural skin color.",
    symptoms: ["Stable white patches that do not respond to creams", "No new white patches appearing on the body"],
    causes: ["Stable localized absence of active melanocytes"],
    process: [
      { step: "Donor Prep", detail: "Taking small skin grafts from a hidden donor site (e.g. thigh)." },
      { step: "Graft Placement", detail: "Placing the donor skin grafts onto the prepared white patch." },
      { step: "Dressing", detail: "Applying a sterile compression bandage for 7 days." }
    ],
    benefits: ["Restores pigment to stable white patches", "High success rate in stable cases", "Blends the treated patch with surrounding skin"],
    faqs: [
      { q: "What is the key prerequisite for surgery?", a: "The vitiligo patch must be stable, meaning it hasn't expanded or changed for at least 12 months." },
      { q: "How long does color blending take?", a: "Pigment spreads from the grafts, blending with the surrounding skin over 2 to 6 months." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
  },
  {
    slug: "lobuloplasty",
    title: "Lobuloplasty (Ear Lobe Repair)",
    short: "Repair split, torn, or stretched earlobe holes.",
    icon: "Clock",
    category: "Procedure",
    overview: "We repair split, torn, or elongated earlobe holes caused by heavy earrings. The procedure is performed under local anesthesia, refreshing the split edges and suturing them for clean healing.",
    symptoms: ["Split or completely torn earlobe", "Elongated earring holes that can no longer hold studs"],
    causes: ["Wear of heavy jewelry or sudden earring tug trauma"],
    process: [
      { step: "Numbing Block", detail: "Making the earlobe completely numb." },
      { step: "Edge Refreshing", detail: "Removing thin skin along the split to ensure clean bonding." },
      { step: "Suturing", detail: "Joining the borders with fine surgical sutures." }
    ],
    benefits: ["Restores natural earlobe shape", "Quick 20-minute outpatient repair", "Allows you to pierce and wear earrings again later"],
    faqs: [
      { q: "When can I pierce my ear again?", a: "You can re-pierce the earlobe 6 to 8 weeks after the repair, avoiding the scar line." },
      { q: "Is the scar visible?", a: "The suture line heals into a very faint, thin line that is barely visible." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80"
  },
  {
    slug: "corn-removal",
    title: "Corn Removal",
    short: "Relieve walking pain by removing hard, pressing foot corns.",
    icon: "Clock",
    category: "Procedure",
    overview: "Foot corns are painful, thick cones of skin that press into the tissue, making walking painful. We offer clinical keratolytics, focal paring, and surgical corn excision to remove the hard core.",
    symptoms: ["Thick, hard, rough skin bump on toes or soles", "Sharp, pressing pain when walking or standing"],
    causes: ["Friction and pressure from ill-fitting or tight shoes"],
    process: [
      { step: "Softening Check", detail: "Inspecting the depth and core of the corn." },
      { step: "Local Numbing", detail: "Numbing the surrounding skin for comfort." },
      { step: "Excision & Paring", detail: "Carefully excising the hard keratin core." }
    ],
    benefits: ["Provides immediate relief from walking pain", "Removes the deep pressing core", "Heals with soft, normal skin"],
    faqs: [
      { q: "Will a foot corn return?", a: "Corns are pressure-induced. If you continue to wear tight shoes, the friction will rebuild the corn. Wearing comfortable footwear is essential." },
      { q: "How is it different from a wart?", a: "Corns are non-infectious skin buildup caused by pressure, whereas warts are viral infections with tiny black dots (blood vessels)." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&q=80"
  },
  {
    slug: "granuloma-pyogenicum-removal",
    title: "Granuloma Pyogenicum Removal",
    short: "Surgical clearance for fragile, bleeding vascular bumps.",
    icon: "Clock",
    category: "Procedure",
    overview: "Surgical removal of pyogenic granuloma nodules on the skin. We perform surgical excision or curettage followed by electrocautery base ablation under local anesthesia to prevent bleeding and recurrence.",
    symptoms: ["Rapidly growing red nodule", "Bleeds easily with minor touch or friction"],
    causes: ["Local vascular proliferation, often after a minor scratch or insect bite"],
    process: [
      { step: "Numbing", detail: "Injecting local anesthetic under the nodule." },
      { step: "Excision/Curettage", detail: "Removing the vascular nodule cleanly." },
      { step: "Base Ablation", detail: "Cauterizing the base to stop bleeding and prevent recurrence." }
    ],
    benefits: ["Stops frequent bleeding instantly", "Removes the vascular growth completely", "Heals with clean skin borders"],
    faqs: [
      { q: "How long does healing take?", a: "The area forms a scab and heals completely in 7 to 10 days." },
      { q: "Can it be treated with creams?", a: "Usually no, as it is a vascular nodule. Cautery or excision is the most effective treatment." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },

  // ─── AESTHETIC PROCEDURES (63-73) ─────────────────────────────────────────
  {
    slug: "prp-face",
    title: "PRP for Face (Vampire Facial)",
    short: "Platelet-Rich Plasma micro-needling for youthful skin glow.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "PRP for the face utilizes growth factors from your own blood. We draw a small sample, spin it to concentrate the platelets, and microneedle this liquid gold into the skin to boost collagen and repair scars.",
    symptoms: ["Dull, uneven skin tone", "Fine lines and early aging creases", "Faint acne marks and texture irregularities"],
    causes: ["Aging-related drop in collagen synthesis", "Environmental skin damage"],
    process: [
      { step: "Blood Draw", detail: "Taking 10ml of blood from your arm." },
      { step: "Centrifugation", detail: "Spinning the blood to separate growth-factor rich plasma." },
      { step: "Microneedling", detail: "Infusing the PRP into the face after applying numbing cream." }
    ],
    benefits: ["Stimulates natural collagen production", "Creates a radiant, youthful skin glow", "Improves fine lines and acne marks"],
    faqs: [
      { q: "Is a Vampire Facial safe?", a: "Yes, it uses your own blood, eliminating any risk of allergic reactions." },
      { q: "How long is the downtime?", a: "Expect mild redness and swelling for 24-48 hours. The skin returns to normal quickly with a fresh glow." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "prp-hair",
    title: "PRP for Hair",
    short: "Platelet-Rich Plasma injections to stimulate hair roots.",
    icon: "Scissors",
    category: "Aesthetic Procedure",
    overview: "Platelet-Rich Plasma (PRP) therapy for hair loss. Growth factors from your blood are spun and injected into thinning scalp areas to stimulate dormant hair follicles and thicken hair shafts.",
    symptoms: ["Thinning hair and visible scalp patches", "Excessive hair shedding on the comb", "Miniaturized hair roots"],
    causes: ["Genetic hair follicle shrinkage (DHT activity)", "Poor blood supply to hair roots"],
    process: [
      { step: "Plasma Prep", detail: "Drawing and spinning blood to isolate concentrated platelets." },
      { step: "Scalp Numbing", detail: "Applying local anesthetic or ice packs to the scalp." },
      { step: "Micro-injections", detail: "Injecting PRP directly into thinning scalp areas." }
    ],
    benefits: ["Halts excessive hair shedding", "Thickens thin, weak hair shafts", "Wakes up dormant scalp hair follicles"],
    faqs: [
      { q: "When do I see hair density improve?", a: "Most patients notice reduced shedding after 2 sessions and visible density improvement after 4 sessions." },
      { q: "Is PRP painful?", a: "There is minor pinching, but scalp cooling and local blocks make it very comfortable." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "gfc-hair",
    title: "GFC for Hair",
    short: "Growth Factor Concentrate for advanced hair density.",
    icon: "Scissors",
    category: "Aesthetic Procedure",
    overview: "Growth Factor Concentrate (GFC) is an advanced, acellular hair therapy. Activated growth factors are extracted directly from your platelets in specialized tubes, offering a highly consistent and comfortable density treatment.",
    symptoms: ["Pattern baldness and hair thinning", "Fragile hair prone to breaking", "Widening parting line"],
    causes: ["Reduced follicular nutrition and genetic shrinkage"],
    process: [
      { step: "Blood Draw", detail: "Collecting blood in specialized GFC activation tubes." },
      { step: "Incubation & Spin", detail: "Releasing growth factors from platelets." },
      { step: "Infusion", detail: "Injecting the growth factor liquid into the thinning scalp." }
    ],
    benefits: ["Delivers consistent growth factor doses", "Pure, cell-free formula with minimal scalp swelling", "Promotes thick hair growth"],
    faqs: [
      { q: "How is GFC different from PRP?", a: "GFC is a cell-free concentrate where platelets are pre-activated to release growth factors, resulting in less inflammation and higher consistency." },
      { q: "How many GFC sessions are recommended?", a: "We recommend a baseline of 3 to 4 sessions spaced 30 days apart." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&q=80"
  },
  {
    slug: "medifacial",
    title: "Medifacial",
    short: "Dermatologist-formulated skin glow and hydration therapy.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "Medifacials are customized, clinically formulated facial treatments. Unlike salon facials, they use medical-grade vitamins, mild peeling acids, and deep hydration serums to nourish the skin barrier.",
    symptoms: ["Dull, dehydrated skin", "Uneven skin tone and texture", "Stressed, congested skin"],
    causes: ["Accumulated environmental pollution", "Poor skin hydration and slow cell turnover"],
    process: [
      { step: "Exfoliation", detail: "Gently clearing dead skin with mild lactic or glycolic formulations." },
      { step: "Antioxidant Infusion", detail: "Applying Vitamin C or Hyaluronic Acid packs." },
      { step: "Soothing Massage", detail: "Clinical massage to boost lymphatic drainage and skin glow." }
    ],
    benefits: ["Deeply hydrates and plumps the skin", "Restores a bright, radiant skin glow", "Calms skin redness and stress"],
    faqs: [
      { q: "Are medifacials safe for sensitive skin?", a: "Yes, we customize the ingredients for your specific skin type, avoiding harsh scrubs or irritants." },
      { q: "How long does the facial glow last?", a: "The hydration glow is visible immediately and lasts for 2 to 3 weeks." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "hydrafacial",
    title: "Hydrafacial",
    short: "Deep skin exfoliation, blackhead extraction, and hydration.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "Hydrafacial uses a specialized vortex-suction tip to exfoliate, extract blackheads, and infuse customized skin serums. This deeply cleanses pores and plumps the skin with hydration.",
    symptoms: ["Congested skin pores and blackheads", "Dry, dehydrated, or flaky skin patches", "Dull skin tone"],
    causes: ["Sebum buildup clogging pores", "Lack of deep skin hydration"],
    process: [
      { step: "Exfoliation", detail: "Shedding dead cells using vortex-exfoliation." },
      { step: "Extraction", detail: "Vortex-suction to extract blackheads painlessly." },
      { step: "Infusion", detail: "Saturating skin with rich hyaluronic and peptide serums." }
    ],
    benefits: ["Instantly clears blackheads and clogged pores", "Provides deep, plumping hydration", "Improves skin tone and texture"],
    faqs: [
      { q: "Is Hydrafacial painful?", a: "No, the vortex tip feels like a cool paintbrush moving across your skin. The extraction is completely painless." },
      { q: "Can I get a Hydrafacial before an event?", a: "Yes, it is the perfect treatment for pre-event skin prep as it leaves your skin glowing with zero redness." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "chemical-peeling",
    title: "Chemical Peeling",
    short: "Apply organic fruit acids to peel away dullness and marks.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "Chemical peeling involves applying clinical-grade organic fruit acids (like salicylic, glycolic, or mandelic acid) to gently peel away dead outer skin layers, fading dark spots and clearing acne.",
    symptoms: ["Active acne and oily skin", "Post-acne dark marks and sunspots", "Dull, uneven skin complexion"],
    causes: ["Dead skin buildup blocking pores", "Localized excess pigment production"],
    process: [
      { step: "Skin Prep", detail: "Cleansing and degreasing facial skin." },
      { step: "Peel Application", detail: "Applying the customized peeling acid for a timed duration." },
      { step: "Neutralization", detail: "Applying a neutralizing wash followed by sun protection." }
    ],
    benefits: ["Accelerates clearing of acne marks", "Controls excess skin oil and active acne", "Smoothes and brightens skin texture"],
    faqs: [
      { q: "Will my skin peel off aggressively?", a: "Modern superficial peels cause micro-flaking that is barely visible, rather than aggressive skin shedding." },
      { q: "Is chemical peeling safe?", a: "Yes, when performed by a qualified dermatologist who selects the correct peel concentration for your skin type." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
  },
  {
    slug: "dermaroller-dermapen",
    title: "Dermaroller and Dermapen",
    short: "Microneedling therapies to stimulate skin collagen.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "Microneedling with Dermaroller or automated Dermapen creates micro-channels in the skin. This triggers a natural healing response that boosts collagen, smoothing out scars and open pores.",
    symptoms: ["Atrophic/depressed acne scars", "Enlarged open skin pores", "Faint stretch marks or fine lines"],
    causes: ["Loss of dermal collagen support"],
    process: [
      { step: "Numbing", detail: "Applying topical anesthetic cream for 45 minutes." },
      { step: "Microneedling", detail: "Passing the Dermapen/Dermaroller over scar zones." },
      { step: "Soothe Mask", detail: "Applying a cooling, skin-repairing serum." }
    ],
    benefits: ["Improves acne scar depth", "Refines open pores and skin texture", "Stimulates natural collagen production"],
    faqs: [
      { q: "Is it painful?", a: "The numbing cream ensures you only feel a mild vibrating sensation during the session." },
      { q: "How long does redness last?", a: "Redness typically fades within 24 to 36 hours. Sunscreen application is essential during recovery." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
  },
  {
    slug: "dark-circle-lips-pigmentation",
    title: "Dark Circle and Dark Lips Pigmentation Treatment",
    short: "Targeted peeling and hydration to lighten lips and eye areas.",
    icon: "Sun",
    category: "Aesthetic Procedure",
    overview: "Under-eye dark circles and dark lip pigmentation are treated with gentle chemical peels, hydrating hyaluronic acid infusions, and home-use brightening creams to safely lighten these sensitive zones.",
    symptoms: ["Dark under-eye circles and hollow appearance", "Dark, pigmented, or discolored lips"],
    causes: ["Sun exposure, rubbing, lip licking, and genetic factors"],
    process: [
      { step: "Prep", detail: "Cleansing sensitive lip and under-eye skin." },
      { step: "Gentle Peeling", detail: "Applying mild, specific peeling acids designed for sensitive skin." },
      { step: "Hydration Infusion", detail: "Applying rich moisturizing lip and eye creams." }
    ],
    benefits: ["Lightens dark lip boundaries", "Reduces under-eye darkness", "Restores plump, hydrated lip and eye skin"],
    faqs: [
      { q: "Can lip licking cause dark lips?", a: "Yes, saliva enzymes dry out lip skin, causing inflammation that leads to hyperpigmentation (lick eczema)." },
      { q: "How many sessions are needed?", a: "Usually 4 to 6 sessions are recommended for visible lightening results." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80"
  },
  {
    slug: "iv-glutathione-brightening",
    title: "IV Glutathione Skin Brightening Treatment",
    short: "Antioxidant IV therapy to brighten skin and boost health.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "Intravenous (IV) Glutathione delivers powerful antioxidants and Vitamin C directly into the bloodstream. This neutralizes free radicals and slows down melanin synthesis for overall skin brightening and health.",
    symptoms: ["Dull, uneven skin tone all over the body", "Signs of systemic oxidative stress and fatigue"],
    causes: ["Free radical damage from pollution, sun, and lifestyle"],
    process: [
      { step: "Health Screen", detail: "Checking liver function tests (LFT) and medical history." },
      { step: "IV Infusion", detail: "Administering the sterile Glutathione drip over 30 minutes." },
      { step: "Hydration", detail: "Resting briefly and drinking water after the session." }
    ],
    benefits: ["Brightens skin tone all over the body", "Fades general dark spots and blemishes", "Boosts overall energy and antioxidant defense"],
    faqs: [
      { q: "Are IV Glutathione drips safe?", a: "Yes, when administered under strict medical supervision with proper dosing and high-quality sterile formulations." },
      { q: "How many sessions are needed?", a: "An initial course of 6 to 10 sessions is typical to see visible skin skin brightening." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  },
  {
    slug: "microneedling-subcision-scars",
    title: "Microneedling and Subcision for Scars",
    short: "Release deep bound scars to restore a smooth skin surface.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "For deep, bound rolling acne scars, we combine microneedling with subcision. Subcision involves inserting a specialized needle under the scar to break the fibrous bands pulling the skin down, allowing the scar to lift.",
    symptoms: ["Deep rolling scars that dip when you smile", "Bound, depressed skin craters"],
    causes: ["Fibrous anchors formed in the deep dermis from severe acne"],
    process: [
      { step: "Numbing", detail: "Applying thick topical anesthetic and local infiltration." },
      { step: "Subcision", detail: "Inserting the needle horizontally to release anchoring scar fibers." },
      { step: "Microneedling", detail: "Running the pen over the surface to stimulate collagen." }
    ],
    benefits: ["Lifts deep rolling acne scars significantly", "Restores a smooth, even skin surface", "Stimulates collagen to fill skin craters"],
    faqs: [
      { q: "Will there be bruising after subcision?", a: "Yes, mild bruising is normal and expected. It is actually beneficial, as the blood pooling releases growth factors that help fill the scar." },
      { q: "Is the scar release permanent?", a: "Yes, once the anchoring fibrous bands are released, they do not pull the skin down again." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
  },
  {
    slug: "botox",
    title: "Botox Cosmetic",
    short: "Relax facial muscles to smooth wrinkles and fine lines.",
    icon: "Sparkles",
    category: "Aesthetic Procedure",
    overview: "Botox cosmetic injections temporarily relax the tiny facial muscles that cause expression lines. This smooths out forehead wrinkles, crow's feet, and frown lines for a refreshed, youthful look.",
    symptoms: ["Forehead lines and frown lines between the brows", "Crow's feet around the outer eyes", "Gummy smile or jaw muscle bulk"],
    causes: ["Repetitive facial muscle expressions over time"],
    process: [
      { step: "Expression Analysis", detail: "Marking injection points while you make facial expressions." },
      { step: "Micro-injections", detail: "Delivering precise units of Botox using a tiny needle." },
      { step: "Cool Soothe", detail: "Applying ice packs with zero recovery downtime." }
    ],
    benefits: ["Smooths out forehead wrinkles and crow's feet", "Prevents deep lines from forming", "Refined, youthful, and rested look"],
    faqs: [
      { q: "How long does Botox last?", a: "Results are visible in 5 to 7 days and typically last for 4 to 6 months." },
      { q: "Will my face look frozen?", a: "No. When performed by a qualified dermatologist, Botox relaxes wrinkles while preserving natural expressions." }
    ],
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
  }
];
