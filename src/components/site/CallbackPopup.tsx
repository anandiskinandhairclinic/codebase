import { useState, useEffect } from "react";
import { Phone, ShieldCheck, Star, MessageSquare, User, X, Lock, Check } from "lucide-react";
import { createAppointment, whatsappLink } from "@/lib/firebaseDataAdapter";

export function CallbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Check if user already submitted the callback form previously
    const submitted = localStorage.getItem("callback_submitted") === "true";
    if (submitted) {
      setIsSubmitted(true);
      return;
    }

    // Trigger initial popup after 2 seconds
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(initialTimer);
  }, []);

  // Make screen scroll unresponsive underneath the popup when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Set up repeating timer: if closed, reopen after 60 seconds unless submitted
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const submitted = localStorage.getItem("callback_submitted") === "true";
    
    if (!isOpen && !isSubmitted && !submitted) {
      timer = setInterval(() => {
        setIsOpen(true);
      }, 60000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      await createAppointment({
        name: name.trim(),
        phone: cleanPhone,
        service: "Callback Request",
        preferredDate: new Date().toISOString().split("T")[0],
        message: "Requested a callback from the website landing popup.",
        status: "Pending"
      });

      localStorage.setItem("callback_submitted", "true");
      setIsSubmitted(true);
      setSuccessMsg("Thank you! We will call you back within 24 hours.");
      
      // Auto close success screen after 2.5 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err: any) {
      console.error("Callback submission failed:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="relative bg-[#fdfaf6] w-full max-w-md rounded-[2rem] border border-[#ecdcc9]/70 shadow-2xl overflow-hidden p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        {!isSubmitted && (
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 border border-[#ecdcc9]/40 hover:bg-white text-muted-foreground hover:text-[#5c4a37] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        )}

        {isSubmitted ? (
          /* Success State Screen */
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
              <Check className="size-8 stroke-[3]" />
            </div>
            <h3 className="font-display text-2xl text-[#5c4a37]">Callback Requested!</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {successMsg || "Your request has been successfully registered. Dr. Vishakha Patil's helpdesk will contact you shortly."}
            </p>
          </div>
        ) : (
          /* Form Content */
          <div className="space-y-5 text-center">
            
            {/* Header Icon */}
            <div className="size-12 rounded-full bg-[#f5e6d3] text-[#8a7560] flex items-center justify-center mx-auto shadow-inner">
              <Phone className="size-5 fill-current animate-pulse" />
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#5c4a37] leading-tight">
                Get Call Back in 24 Hours
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Connect directly with Dr. Vishakha Patil's clinical helpdesk for guidance.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-[#faf6f0] border border-[#ecdcc9]/50 rounded-2xl">
              <div className="flex flex-col items-center justify-center border-r border-[#ecdcc9]/50 last:border-r-0">
                <ShieldCheck className="size-4 text-[#8a7560] mb-1" />
                <span className="text-[8px] font-bold text-[#5c4a37] uppercase tracking-wider">Verified Specialist</span>
              </div>
              <div className="flex flex-col items-center justify-center border-r border-[#ecdcc9]/50 last:border-r-0">
                <Star className="size-4 text-amber-500 fill-amber-500 mb-1" />
                <span className="text-[8px] font-bold text-[#5c4a37] uppercase tracking-wider">5.0★ Google Rated</span>
              </div>
              <a 
                href={whatsappLink("Hello Anandi Clinic, I'd like to request a callback/inquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center cursor-pointer hover:opacity-85 transition-opacity"
              >
                <MessageSquare className="size-4 text-emerald-600 mb-1" />
                <span className="text-[8px] font-bold text-[#5c4a37] uppercase tracking-wider">Msg on WhatsApp</span>
              </a>
            </div>

            {/* Callback Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              {errorMsg && (
                <div className="text-xs font-medium text-red-500 bg-red-50 border border-red-200/50 rounded-lg p-2.5 text-center">
                  {errorMsg}
                </div>
              )}

              {/* Full Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8a7560] uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground/70">
                    <User className="size-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-white border border-[#ecdcc9] focus:border-[#8a7560] focus:ring-1 focus:ring-[#8a7560] rounded-xl text-sm placeholder:text-muted-foreground/60 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#8a7560] uppercase tracking-wider ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-semibold text-[#5c4a37] border-r border-[#ecdcc9]/60 pr-2">
                    <span className="mr-1">🇮🇳</span> +91
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter 10-Digit Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full h-11 pl-20 pr-4 bg-white border border-[#ecdcc9] focus:border-[#8a7560] focus:ring-1 focus:ring-[#8a7560] rounded-xl text-sm placeholder:text-muted-foreground/60 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#8a7560] hover:bg-[#5c4a37] disabled:bg-[#8a7560]/60 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-5"
              >
                {loading ? (
                  <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Phone className="size-4 fill-current" />
                    <span>CALL ME BACK</span>
                  </>
                )}
              </button>
            </form>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-muted-foreground/85">
              <Lock className="size-3 flex-shrink-0 text-muted-foreground/60" />
              <span>Strictly Confidential. Your data is protected by privacy protocols.</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
