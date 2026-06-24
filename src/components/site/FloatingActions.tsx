import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { whatsappLink, telLink } from "@/lib/firebaseDataAdapter";

export function FloatingActions() {
  return (
    <div className="fixed bottom-[92px] right-[28px] z-50 flex flex-col gap-3 pointer-events-auto">
      {/* Phone Call Bubble - Warm Champagne / Gold */}
      <a
        href={telLink}
        className="size-12 rounded-full shadow-card bg-[#ecdcc9] hover:bg-[#dfcbb3] hover:scale-105 transition-all duration-300 flex items-center justify-center text-[#5c4a37] border border-[#dcbba2]/30 relative group cursor-pointer"
        aria-label="Call Clinic"
      >
        <Phone className="size-5 fill-current" />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-[#5c4a37] text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
          Call Clinic
        </span>
      </a>

      {/* WhatsApp Chat Bubble - Emerald Green */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="size-12 rounded-full shadow-card bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all duration-300 flex items-center justify-center text-white relative group cursor-pointer animate-bounce"
        aria-label="Chat on WhatsApp"
        style={{ animationDuration: '4s' }}
      >
        <MessageCircle className="size-5 fill-current" />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
          WhatsApp Chat
        </span>
      </a>
    </div>
  );
}
