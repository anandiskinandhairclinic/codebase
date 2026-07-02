# Backend Wiring Details & Rebranding Summary

This document describes the backend integration and rebranding changes made to replace the front-end with the new Lumina-based template, wired fully to the Firebase Firestore database.

---

## 1. Firebase Data Adapter Layer
We created a new adapter module:
* **File:** [firebaseDataAdapter.ts](file:///Users/rushipowar/Desktop/Rushikesh/Clients/AnandiClinic/codebase/src/lib/firebaseDataAdapter.ts)
* **Purpose:** Bridges the new front-end TypeScript types (`Treatment`, `Testimonial`, `BlogPost`, `Doctor`, `FAQ`, `Stat`, `Product`) with the existing Firebase backend functions defined in `firebaseServices.ts`.
* **Fallback Strategy:** For collections that do not exist yet in Firestore (e.g. Products, Before/After), it yields local template data gracefully to maintain visual page content while utilizing the real database for primary assets.

---

## 2. Front-End Pages Integration
All page routes under `src/routes/` have been updated to replace imports of the hardcoded `mock-data.ts` with asynchronous database fetching via `firebaseDataAdapter.ts`:

* **Home Page (`index.tsx`):** Displays live treatments, testimonials, FAQ lists, and stats from the Firebase collections.
* **Services Page (`services.tsx`):** Automatically maps services from the Firebase `services` collection into the new layout.
* **Appointment Page (`appointment.tsx`):** 
  * Queries live services from Firestore to populate the booking dropdown.
  * Connects the booking form directly to `createAppointment()` from the Firebase backend, saving data to Firestore and triggering email notifications.
* **Testimonials (`testimonials.tsx`) & Blog (`blog.tsx`):** Asynchronously pull live patient testimonials and posts from the Firestore database.
* **About (`about.tsx`) & Doctors (`doctors.tsx`):** Pull real qualification, experience, publication, and profile details for **Dr. Vishakha Padmakar Patil** from the `doctorInfo` collection.
* **Contact (`contact.tsx`):** Shows Pune-specific phone/whatsapp/email links and embedded clinic location maps from `clinic.ts`.

---

## 3. Admin Panel CMS Integration
The administrative dashboard pages have been fully wired to Firebase Firestore collections to display real data instead of hardcoded placeholders:

* **Appointments (`admin.appointments.tsx`):** Reads the list of booked patient appointments ordered by date.
* **Services (`admin.services.tsx`):** Fetches and lists the active clinic treatments.
* **Products (`admin.products.tsx`):** Wired to the data adapter.
* **Testimonials (`admin.testimonials.tsx`):** Loads and shows client testimonials.
* **Blog CMS (`admin.blog.tsx`):** Pulls blog posts dynamically.
* **Gallery (`admin.gallery.tsx`):** Configured to fetch and preview the uploaded media assets.
* **Before / After (`admin.before-after.tsx`):** Automatically brands preview image watermarks/logos with the real clinic name dynamically.
* **CMS Layout (`admin.tsx`):** Updated branding to **Anandi Clinic CMS**.

---

## 4. Re-Branding
* **Header & Footer:** Replaced all generic "Lumière" and fake Mumbai addresses with **Anandi Skin & Hair Clinic** (located in Katraj, Pune) and real contact credentials.
* **Concierge Chatbot (`Chatbot.tsx`):** Re-branded the interactive virtual helper to **Anandi Skin & Hair Guide**.
* **Global Meta Layout (`__root.tsx`):** Re-branded titles, descriptions, and Open Graph tags.

---

## 5. Build System & Platform Support
* **File:** [postbuild.js](file:///Users/rushipowar/Desktop/Rushikesh/Clients/AnandiClinic/codebase/postbuild.js)
* **Change:** Replaced the shell-specific Unix `cp` command inside `package.json` with a cross-platform Node.js utility, enabling clean, error-free production builds (`npm run build`) on all OS environments.
