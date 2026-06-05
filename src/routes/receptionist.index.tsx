import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { 
  CalendarCheck, Clock, User, Phone, Mail, CheckCircle2, XCircle, 
  Search, Users, AlertCircle, PhoneCall, History, BookOpen, ShieldCheck, X,
  Volume2, VolumeX
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, getDoc, query, orderBy, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Helper parsing for Date from preferredDate (formatted as "YYYY-MM-DD at HH:MM AM/PM" or similar)
const getApptDateString = (appt: any) => {
  if (!appt.preferredDate) return "";
  return appt.preferredDate.split(" at ")[0] || "";
};

// Parsing helper for Age & Notes from Message
const parsePatientMessage = (messageStr: string) => {
  if (!messageStr) return { age: "N/A", notes: "None provided" };
  
  const ageMatch = messageStr.match(/Age:\s*([^\.]+)/i);
  const descMatch = messageStr.match(/Description:\s*(.+)/i);
  
  const age = ageMatch ? ageMatch[1].trim() : "N/A";
  const notes = descMatch ? descMatch[1].trim() : messageStr;
  
  return { age, notes };
};

export const Route = createFileRoute("/receptionist/")({
  component: ReceptionistDashboard,
});

function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // Audio chime settings
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("receptionist_muted") === "true";
    }
    return false;
  });
  
  // Track counts to find if a new callback request arrived
  const isFirstLoad = useRef(true);
  const lastPendingCallbacksCount = useRef(0);

  // Tab states: callbacks (default!), workspace, patients
  const [activeTab, setActiveTab] = useState<"callbacks" | "workspace" | "patients">("callbacks");
  
  // Workspace Sub-Filters
  const [apptSearch, setApptSearch] = useState("");
  const [apptFilterStatus, setApptFilterStatus] = useState("All");
  const [apptSort, setApptSort] = useState("newest");
  const [workspaceSegment, setWorkspaceSegment] = useState<"todays" | "live" | "previous" | "all">("todays");

  // Patients Sub-Filters
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  // Common Patient Profile State
  const [patientProfile, setPatientProfile] = useState<any | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [skinType, setSkinType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Individual Remarks states
  const [remarksState, setRemarksState] = useState<Record<string, string>>({});
  const [savingRemarkId, setSavingRemarkId] = useState<string | null>(null);

  // Quick resolution remarks for active queue cards
  const [quickRemarks, setQuickRemarks] = useState<Record<string, string>>({});

  const todayStr = new Date().toISOString().split("T")[0];

  // Synth Chime Player using HTML5 Web Audio Context
  const playChime = () => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const playTone = (time: number, freq: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + duration);
      };
      
      const now = ctx.currentTime;
      // High-end pleasant double chime: D5 (587.33Hz) followed by A5 (880.00Hz)
      playTone(now, 587.33, 0.4);
      playTone(now + 0.15, 880.00, 0.6);
    } catch (err) {
      console.warn("Audio chime blocked by browser auto-play policy or not supported:", err);
    }
  };

  // Real-time Firestore Sync
  useEffect(() => {
    const apptsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(apptsQuery, (snapshot) => {
      const apptsList: any[] = [];
      snapshot.forEach((doc) => {
        apptsList.push({ id: doc.id, ...doc.data() });
      });

      // Filter pending callbacks in new snapshot
      const currentPendingCallbacks = apptsList.filter(
        (a) => a.service === "Callback Request" && (a.status || "Pending").toLowerCase() === "pending"
      );
      
      // Real-time Audio alert logic
      if (!isFirstLoad.current) {
        if (currentPendingCallbacks.length > lastPendingCallbacksCount.current) {
          playChime();
          toast("🚨 Urgent Callback Request Received!", {
            description: `New callback requested by ${currentPendingCallbacks[0]?.name || "a user"}!`,
            duration: 8000,
          });
        }
      } else {
        isFirstLoad.current = false;
      }
      
      lastPendingCallbacksCount.current = currentPendingCallbacks.length;
      setAppointments(apptsList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore onSnapshot error: ", error);
      toast.error("Failed to connect to clinic database in real-time.");
      setLoading(false);
    });

    return unsubscribe;
  }, [isMuted]);

  // Flash title visual alert
  useEffect(() => {
    let intervalId: any = null;
    const originalTitle = "Clinic Helpdesk CRM · Dr Jain's Skin Care Clinic";
    
    const pendingCount = appointments.filter(
      (a) => a.service === "Callback Request" && (a.status || "Pending").toLowerCase() === "pending"
    ).length;

    if (pendingCount > 0) {
      let toggle = false;
      intervalId = setInterval(() => {
        document.title = toggle 
          ? `⚠️ (${pendingCount}) Urgent Callback!` 
          : "Clinic Helpdesk CRM";
        toggle = !toggle;
      }, 1500);
    } else {
      document.title = originalTitle;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.title = originalTitle;
    };
  }, [appointments]);

  // Load common patient details when selectedPatient changes
  useEffect(() => {
    if (!selectedPatient) {
      setPatientProfile(null);
      setSkinType("");
      setAllergies("");
      setGeneralNotes("");
      return;
    }

    const phoneKey = selectedPatient.phone.replace(/\s/g, "");
    setLoadingProfile(true);

    const docRef = doc(db, "patients", phoneKey);
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setPatientProfile(data);
        setSkinType(data.skinType || "");
        setAllergies(data.allergies || "");
        setGeneralNotes(data.generalNotes || "");
      } else {
        setPatientProfile(null);
        setSkinType("");
        setAllergies("");
        setGeneralNotes("");
      }
    }).catch((err) => {
      console.error("Error fetching common patient record:", err);
    }).finally(() => {
      setLoadingProfile(false);
    });
  }, [selectedPatient]);

  const handleSavePatientProfile = async () => {
    if (!selectedPatient) return;
    const phoneKey = selectedPatient.phone.replace(/\s/g, "");
    setSavingProfile(true);
    try {
      const docRef = doc(db, "patients", phoneKey);
      const payload = {
        name: selectedPatient.name,
        phone: selectedPatient.phone,
        email: selectedPatient.email,
        skinType,
        allergies,
        generalNotes,
        updatedAt: new Date().toISOString()
      };
      await setDoc(docRef, payload);
      setPatientProfile(payload);
      toast.success("Common Patient Folder details updated successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save common patient folder: " + err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveRemark = async (apptId: string, remarkText: string) => {
    setSavingRemarkId(apptId);
    try {
      const apptDoc = appointments.find((x) => x.id === apptId);
      if (!apptDoc) return;
      
      const updatedDoc = {
        ...apptDoc,
        receptionistRemark: remarkText
      };
      
      await setDoc(doc(db, "appointments", apptId), updatedDoc);
      toast.success("Timeline follow-up remark logged!");
      
      // Update selected patient's timeline details locally in active modal
      if (selectedPatient) {
        setSelectedPatient((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            bookings: prev.bookings.map((b: any) => 
              b.id === apptId ? { ...b, receptionistRemark: remarkText } : b
            )
          };
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save remark: " + err.message);
    } finally {
      setSavingRemarkId(null);
    }
  };

  const handleResolveCallback = async (id: string, remarkText: string) => {
    setUpdatingId(id);
    try {
      const apptDoc = appointments.find((x) => x.id === id);
      if (!apptDoc) return;
      
      const updatedDoc = {
        ...apptDoc,
        status: "Done",
        receptionistRemark: remarkText || "Callback completed & resolved."
      };
      
      await setDoc(doc(db, "appointments", id), updatedDoc);
      toast.success("Callback request resolved & logged!");
      
      setQuickRemarks(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to resolve callback: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancelCallback = async (id: string, remarkText: string) => {
    setUpdatingId(id);
    try {
      const apptDoc = appointments.find((x) => x.id === id);
      if (!apptDoc) return;
      
      const updatedDoc = {
        ...apptDoc,
        status: "Cancelled",
        receptionistRemark: remarkText || "Callback cancelled."
      };
      
      await setDoc(doc(db, "appointments", id), updatedDoc);
      toast.success("Callback request cancelled & logged.");
      
      setQuickRemarks(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to cancel callback: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const apptDoc = appointments.find((x) => x.id === id);
      if (!apptDoc) return;
      
      const updatedDoc = {
        ...apptDoc,
        status: newStatus
      };
      
      await setDoc(doc(db, "appointments", id), updatedDoc);
      toast.success(`Request status updated to ${newStatus}`);
      
      // Update selected patient details modal if it's currently open
      if (selectedPatient) {
        setSelectedPatient((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            bookings: prev.bookings.map((b: any) => b.id === id ? { ...b, status: newStatus } : b)
          };
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Extract unique patients from appointments (including callback requests commonly!)
  const getUniquePatients = () => {
    const patientsMap: Record<string, any> = {};
    
    appointments.forEach((appt) => {
      const phoneKey = (appt.phone || "").replace(/\s/g, "");
      if (!phoneKey) return;
      
      const { age, notes } = parsePatientMessage(appt.message);
      
      if (!patientsMap[phoneKey]) {
        patientsMap[phoneKey] = {
          name: appt.name,
          phone: appt.phone,
          email: appt.email || "No email",
          age: age !== "N/A" ? age : null,
          bookings: []
        };
      }
      
      // If we discover a valid age in another booking, preserve it
      if (age !== "N/A" && !patientsMap[phoneKey].age) {
        patientsMap[phoneKey].age = age;
      }
      
      patientsMap[phoneKey].bookings.push({
        id: appt.id,
        service: appt.service,
        preferredDate: appt.preferredDate,
        createdAt: appt.createdAt,
        status: appt.status || "Pending",
        notes: notes,
        rawMessage: appt.message,
        receptionistRemark: appt.receptionistRemark || ""
      });
    });

    return Object.values(patientsMap).map((patient: any) => {
      // Sort bookings by date newest first
      patient.bookings.sort((a: any, b: any) => {
        return new Date(b.createdAt || b.preferredDate).getTime() - new Date(a.createdAt || a.preferredDate).getTime();
      });
      return patient;
    });
  };

  const patientsList = getUniquePatients();

  // All active incoming inbox queries (Callbacks + Appointments + Contact Form Messages)
  const pendingCallbacks = appointments.filter((a) => {
    const status = (a.status || "Pending").toLowerCase();
    return status === "pending";
  });

  const resolvedCallbacks = appointments.filter((a) => {
    const status = (a.status || "").toLowerCase();
    return status === "done" || status === "cancelled";
  });

  // Filters for Appointments Workspace
  const filteredAppointments = appointments
    .filter((a) => {
      // Skip callback requests in standard appointments view to avoid clutter
      if (a.service === "Callback Request") return false;

      // Segment filter
      const apptDate = getApptDateString(a);
      const status = (a.status || "Pending").toLowerCase();

      if (workspaceSegment === "todays" && apptDate !== todayStr) return false;
      if (workspaceSegment === "live" && status !== "pending" && !(status === "confirmed" && apptDate === todayStr)) return false;
      if (workspaceSegment === "previous" && status !== "done" && status !== "cancelled" && !(apptDate < todayStr && status !== "pending")) return false;

      // Status dropdown filter
      if (apptFilterStatus !== "All" && status !== apptFilterStatus.toLowerCase()) return false;

      // Search filter
      const searchStr = `${a.name || ""} ${a.phone || ""} ${a.service || ""} ${a.preferredDate || ""}`.toLowerCase();
      return searchStr.includes(apptSearch.toLowerCase());
    })
    .sort((a, b) => {
      if (apptSort === "newest") {
        return new Date(b.createdAt || b.preferredDate).getTime() - new Date(a.createdAt || a.preferredDate).getTime();
      }
      if (apptSort === "oldest") {
        return new Date(a.createdAt || a.preferredDate).getTime() - new Date(b.createdAt || b.preferredDate).getTime();
      }
      if (apptSort === "nameAsc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });

  // Filters for Patients
  const filteredPatients = patientsList.filter((p) => {
    const searchStr = `${p.name || ""} ${p.phone || ""} ${p.email || ""}`.toLowerCase();
    return searchStr.includes(patientSearch.toLowerCase());
  });

  // Calculate high-fidelity stats
  const pendingApprovalsCount = appointments.filter((a) => a.service !== "Callback Request" && (a.status || "Pending").toLowerCase() === "pending").length;
  const todaysCount = appointments.filter((a) => a.service !== "Callback Request" && getApptDateString(a) === todayStr).length;

  const stats = [
    { label: "Today's Schedule", value: todaysCount.toString(), icon: Clock, detail: "Direct bookings", color: "bg-blue-500/10 text-blue-600 border-blue-100" },
    { label: "Urgent Call-backs", value: pendingCallbacks.length.toString(), icon: PhoneCall, detail: "Requires dial-back", color: "bg-rose-500/10 text-rose-600 border-rose-100 animate-pulse" },
    { label: "Patient Directory", value: patientsList.length.toString(), icon: Users, detail: "Common folders", color: "bg-teal-500/10 text-teal-600 border-teal-100" },
    { label: "Pending Approvals", value: pendingApprovalsCount.toString(), icon: AlertCircle, detail: "Treatments awaiting", color: "bg-amber-500/10 text-amber-600 border-amber-100" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start flex-wrap gap-4 w-full">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Clinic Helpdesk CRM</h1>
          <p className="text-sm text-muted-foreground font-semibold">Minimal access receptionist panel for real-time front desk coordination.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Mute/Unmute toggle */}
          <button
            onClick={() => {
              const newVal = !isMuted;
              setIsMuted(newVal);
              localStorage.setItem("receptionist_muted", String(newVal));
              toast.success(newVal ? "Audio alerts muted." : "Audio alerts active (chime enabled).");
              if (!newVal) {
                setTimeout(() => {
                  playChime();
                }, 100);
              }
            }}
            className={`inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-extrabold transition-all active:scale-[0.97] shadow-3xs cursor-pointer ${
              isMuted 
                ? "bg-secondary text-muted-foreground border-border hover:bg-secondary/80" 
                : "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
            }`}
            title={isMuted ? "Click to enable chime notification sounds" : "Click to mute chime notification sounds"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span>{isMuted ? "Alerts Muted" : "Alerts Active"}</span>
          </button>

          {/* Urgent Alert Banner */}
          {pendingCallbacks.length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 text-white px-4 py-2 text-xs font-extrabold animate-pulse shadow-md border border-rose-600">
              <PhoneCall className="h-4 w-4 shrink-0" />
              <span>{pendingCallbacks.length} Urgent Call-backs Awaiting!</span>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">{s.label}</span>
              <span className="text-3xl font-extrabold tracking-tight text-foreground block">{s.value}</span>
              <span className="text-[10px] font-semibold text-muted-foreground block">{s.detail}</span>
            </div>
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("callbacks")}
          className={`pb-3.5 px-4 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all relative ${
            activeTab === "callbacks" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <PhoneCall className="h-4 w-4" /> 
          Helpdesk Inbox
          {pendingCallbacks.length > 0 && (
            <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("workspace")}
          className={`pb-3.5 px-4 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "workspace" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" /> Appointments Workspace
        </button>
        <button
          onClick={() => setActiveTab("patients")}
          className={`pb-3.5 px-4 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "patients" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-4 w-4" /> Patients Directory ({patientsList.length})
        </button>
      </div>

      {/* 1. DEDICATED CALLBACK DESK VIEW (DEFAULT LANDING) */}
      {activeTab === "callbacks" && (
        <div className="space-y-6 animate-fade-in">
          {/* Active Queue Section */}
          <div className="rounded-2xl border bg-white p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-extrabold tracking-tight flex items-center gap-1.5 text-primary">
                <Clock className="h-4.5 w-4.5 text-primary animate-pulse" />
                Active Incoming Inbox Queue ({pendingCallbacks.length})
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time incoming callback requests, contact messages, and slot bookings.</p>
            </div>

            {pendingCallbacks.length === 0 ? (
              <div className="py-12 text-center text-sm text-emerald-600 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex flex-col items-center justify-center gap-2 font-semibold animate-fade-in">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <span>All website inquiries resolved! Active queue is clean.</span>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
                {pendingCallbacks.map((cb) => {
                  const { age, notes } = parsePatientMessage(cb.message);
                  
                  const isCallback = cb.service === "Callback Request";
                  const isMessage = cb.service === "General Message Inquiry";
                  
                  // Dynamic styles based on type of form submission
                  let badgeText = isCallback ? "Urgent Callback" : isMessage ? "Contact Inquiry" : `Slot Booking: ${cb.service ? cb.service.replace(/-/g, " ") : "General"}`;
                  let badgeStyle = isCallback 
                    ? "bg-rose-500/10 border-rose-100 text-rose-600" 
                    : isMessage 
                      ? "bg-blue-500/10 border-blue-100 text-blue-600" 
                      : "bg-teal-500/10 border-teal-100 text-teal-600";
                  
                  let cardStyle = isCallback 
                    ? "border-rose-150 bg-rose-50/10 shadow-rose-50/20" 
                    : isMessage 
                      ? "border-blue-150 bg-blue-50/10 shadow-blue-50/20" 
                      : "border-teal-150 bg-teal-50/10 shadow-teal-50/20";
                  
                  let buttonStyle = isCallback 
                    ? "bg-rose-600 hover:bg-rose-700" 
                    : isMessage 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "bg-teal-600 hover:bg-teal-700";

                  let descTitle = isCallback ? "Request Trigger:" : isMessage ? "Message Concerns:" : "Appointment Notes:";
                  let descContent = isCallback ? "Instant Call-Back Request from homepage slide-over popup." : notes;

                  return (
                    <div key={cb.id} className={`rounded-2xl border p-5 space-y-4 shadow-3xs flex flex-col justify-between hover:shadow-xs transition-all duration-300 ${cardStyle}`}>
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-extrabold text-sm text-foreground flex items-center gap-1.5 uppercase tracking-wide">
                              {cb.name}
                              {age !== "N/A" && <span className="text-[10px] text-muted-foreground font-semibold">({age} yrs)</span>}
                            </div>
                            <span className={`inline-block text-[9px] font-bold px-2.5 py-0.5 mt-1 border rounded-full uppercase tracking-wider ${badgeStyle}`}>
                              {badgeText}
                            </span>
                          </div>

                          <button 
                            onClick={() => {
                              const pKey = (cb.phone || "").replace(/\s/g, "");
                              const pProfile = patientsList.find(p => p.phone.replace(/\s/g, "") === pKey);
                              if (pProfile) {
                                setSelectedPatient(pProfile);
                              } else {
                                setSelectedPatient({
                                  name: cb.name,
                                  phone: cb.phone,
                                  email: cb.email || "No email",
                                  age: age !== "N/A" ? age : null,
                                  bookings: [{
                                    id: cb.id,
                                    service: cb.service,
                                    preferredDate: cb.preferredDate,
                                    createdAt: cb.createdAt,
                                    status: cb.status || "Pending",
                                    notes: notes
                                  }]
                                });
                              }
                            }}
                            className="text-[10px] font-extrabold text-primary hover:underline"
                          >
                            Open Folder
                          </button>
                        </div>

                        {!isCallback && !isMessage && (
                          <div className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span>Slot: <strong className="text-primary">{cb.preferredDate}</strong></span>
                          </div>
                        )}

                        <div className="text-[11px] text-muted-foreground bg-white rounded-xl p-3 border leading-relaxed shadow-3xs block">
                          <strong className="text-[9px] text-primary font-bold block mb-1 uppercase tracking-wider">{descTitle}</strong>
                          "{descContent}"
                        </div>
                      </div>

                      {/* Direct Dial CTA */}
                      <div className="space-y-3 pt-2">
                        {/* Quick remark input */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-muted-foreground uppercase block tracking-wider">Quick Remark / Call Log</label>
                          <input 
                            type="text"
                            placeholder="Brief note (e.g. Saturday 10am booked)"
                            value={quickRemarks[cb.id] || ""}
                            onChange={(e) => setQuickRemarks(prev => ({ ...prev, [cb.id]: e.target.value }))}
                            className="w-full rounded-xl border bg-white px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-primary text-foreground font-semibold"
                          />
                        </div>

                        <a 
                          href={`tel:${cb.phone}`}
                          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl hover:shadow text-white transition-all text-xs font-extrabold shadow-sm active:scale-[0.99] cursor-pointer ${buttonStyle}`}
                        >
                          <PhoneCall className="h-4 w-4" />
                          Direct Dial: {cb.phone}
                        </a>

                        <div className="flex gap-2 justify-end">
                          <button
                            disabled={updatingId === cb.id}
                            onClick={() => handleResolveCallback(cb.id, quickRemarks[cb.id] || "")}
                            className="px-3 py-1.5 text-[10px] font-extrabold text-emerald-600 hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-all cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                          <button
                            disabled={updatingId === cb.id}
                            onClick={() => handleCancelCallback(cb.id, quickRemarks[cb.id] || "")}
                            className="px-3 py-1.5 text-[10px] font-extrabold text-destructive hover:bg-destructive/5 border border-destructive/20 rounded-lg transition-all cursor-pointer"
                          >
                            Cancel Request
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resolved Log Section */}
          <div className="rounded-2xl border bg-white p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-tight text-foreground flex items-center gap-1.5">
                <History className="h-4 w-4 text-primary" />
                Resolved Call-Back Log ({resolvedCallbacks.length})
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Historical log of resolved callback inquiries.</p>
            </div>

            {resolvedCallbacks.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                No historical resolved logs recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-muted-foreground uppercase bg-secondary/15 border-b font-extrabold">
                    <tr>
                      <th className="py-2.5 px-4">Patient</th>
                      <th className="py-2.5 px-4">Phone Number</th>
                      <th className="py-2.5 px-4">Resolution Status</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {resolvedCallbacks.map((cb) => {
                      const status = cb.status.toLowerCase();
                      const statusBadge = status === "done" 
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : "bg-gray-100 text-gray-800 border-gray-200";

                      return (
                        <tr key={cb.id} className="hover:bg-secondary/10 transition-colors font-bold text-foreground">
                          <td className="py-2.5 px-4 flex items-center gap-2">{cb.name}</td>
                          <td className="py-2.5 px-4">
                            <a href={`tel:${cb.phone}`} className="text-primary hover:underline flex items-center gap-1">
                              <Phone className="h-3 w-3 shrink-0" />
                              {cb.phone}
                            </a>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 border rounded-full uppercase tracking-wider ${statusBadge}`}>
                              {cb.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <button
                              onClick={() => {
                                const pKey = (cb.phone || "").replace(/\s/g, "");
                                const pProfile = patientsList.find(p => p.phone.replace(/\s/g, "") === pKey);
                                if (pProfile) setSelectedPatient(pProfile);
                              }}
                              className="text-[10px] font-bold text-primary hover:underline"
                            >
                              Open Folder
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. APPOINTMENTS WORKSPACE VIEW */}
      {activeTab === "workspace" && (
        <div className="space-y-4 animate-fade-in">
          {/* Filters Bar */}
          <div className="rounded-2xl border bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1 bg-secondary/35 p-1 rounded-xl">
                {[
                  { id: "todays", label: "Scheduled Today" },
                  { id: "live", label: "Live / Pending" },
                  { id: "previous", label: "Previous History" },
                  { id: "all", label: "All Booked" }
                ].map((seg) => (
                  <button
                    key={seg.id}
                    onClick={() => setWorkspaceSegment(seg.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                      workspaceSegment === seg.id 
                        ? "bg-white text-primary shadow-xs" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {seg.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Filtered Bookings:</span>
                <span className="text-xs font-extrabold text-foreground bg-secondary px-2.5 py-1 rounded-full">{filteredAppointments.length}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search name, phone, service..." 
                  value={apptSearch}
                  onChange={(e) => setApptSearch(e.target.value)}
                  className="w-full rounded-xl border pl-9 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Status */}
              <div>
                <select 
                  value={apptFilterStatus} 
                  onChange={(e) => setApptFilterStatus(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-xs bg-white outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending Only</option>
                  <option value="Confirmed">Confirmed Only</option>
                  <option value="Done">Done Only</option>
                  <option value="Cancelled">Cancelled Only</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <select 
                  value={apptSort} 
                  onChange={(e) => setApptSort(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-xs bg-white outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="newest">Preferred Date: Newest</option>
                  <option value="oldest">Preferred Date: Oldest</option>
                  <option value="nameAsc">Patient Name: A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointments Grid */}
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Fetching desk records...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="rounded-2xl border bg-white py-16 text-center text-sm text-muted-foreground shadow-xs">
              No matching front-desk inquiries found in this segment.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAppointments.map((a) => {
                const status = (a.status || "Pending").toLowerCase();
                let statusBadge = "bg-amber-100 text-amber-800 border-amber-200";
                if (status === "confirmed") statusBadge = "bg-blue-100 text-blue-800 border-blue-200";
                if (status === "done") statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-200";
                if (status === "cancelled") statusBadge = "bg-destructive/10 text-destructive border-destructive/20";

                const { age, notes } = parsePatientMessage(a.message);

                return (
                  <div key={a.id} className="rounded-2xl border bg-white p-5 space-y-3 relative shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                            {a.name}
                            {age !== "N/A" && <span className="text-[10px] text-muted-foreground">({age} yrs)</span>}
                          </div>
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 mt-1 border rounded-full uppercase tracking-wider ${statusBadge}`}>
                            {a.status || "Pending"}
                          </span>
                        </div>
                        
                        {/* Profile Button */}
                        <button 
                          onClick={() => {
                            const pKey = (a.phone || "").replace(/\s/g, "");
                            const pProfile = patientsList.find(p => p.phone.replace(/\s/g, "") === pKey);
                            if (pProfile) {
                              setSelectedPatient(pProfile);
                            } else {
                              setSelectedPatient({
                                name: a.name,
                                phone: a.phone,
                                email: a.email || "No email",
                                age: age !== "N/A" ? age : null,
                                bookings: [{
                                  id: a.id,
                                  service: a.service,
                                  preferredDate: a.preferredDate,
                                  createdAt: a.createdAt,
                                  status: a.status || "Pending",
                                  notes: notes
                                }]
                              });
                            }
                          }}
                          className="text-[10px] font-bold text-primary hover:underline"
                        >
                          View File
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-3">
                        <div>
                          <span className="text-[9px] text-muted-foreground font-bold uppercase block">Treatment</span>
                          <span className="font-semibold text-foreground truncate block uppercase">
                            {a.service ? a.service.replace(/-/g, " ") : "General Consultation"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground font-bold uppercase block">Preferred slot</span>
                          <span className="font-bold text-primary block truncate">{a.preferredDate}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-muted-foreground leading-normal border-t pt-3 mt-3 space-y-1.5">
                        <div className="font-semibold text-foreground flex items-center gap-1.5 flex-wrap">
                          <a 
                            href={`tel:${a.phone}`} 
                            className="inline-flex items-center gap-1 text-primary hover:text-primary-hover font-bold hover:underline"
                            title={`Call patient ${a.name}`}
                          >
                            <PhoneCall className="h-3 w-3" />
                            {a.phone}
                          </a>
                          <span>·</span>
                          <span>{a.email || "No email listed"}</span>
                        </div>
                        <div className="italic text-foreground bg-secondary/15 rounded-xl p-3 border border-secondary/20 block">
                          "{notes}"
                        </div>
                      </div>
                    </div>

                    {/* Status change actions */}
                    <div className="flex gap-1.5 border-t pt-3 mt-3 justify-end">
                      {status === "pending" && (
                        <button 
                          disabled={updatingId === a.id}
                          onClick={() => handleUpdateStatus(a.id, "Confirmed")}
                          className="px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
                        >
                          Confirm slot
                        </button>
                      )}
                      {status === "confirmed" && (
                        <button 
                          disabled={updatingId === a.id}
                          onClick={() => handleUpdateStatus(a.id, "Done")}
                          className="px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all"
                        >
                          Mark Done
                        </button>
                      )}
                      {(status === "pending" || status === "confirmed") && (
                        <button 
                          disabled={updatingId === a.id}
                          onClick={() => handleUpdateStatus(a.id, "Cancelled")}
                          className="px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-white border hover:bg-destructive/10 text-destructive border-gray-200 transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. PATIENTS DIRECTORY VIEW */}
      {activeTab === "patients" && (
        <div className="space-y-4 animate-fade-in">
          {/* Patient search */}
          <div className="rounded-2xl border bg-white p-5 shadow-xs">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search patient by name, phone number, email..." 
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="w-full rounded-xl border pl-9 pr-3 py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="rounded-2xl border bg-white py-16 text-center text-sm text-muted-foreground shadow-xs">
              No matching clinical folders found.
            </div>
          ) : (
            <div className="rounded-2xl border bg-white shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-muted-foreground uppercase bg-secondary/25 border-b font-extrabold">
                    <tr>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Age</th>
                      <th className="py-3 px-4">Phone (Direct Dial)</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4 text-center">Bookings</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredPatients.map((p, idx) => (
                      <tr key={idx} className="hover:bg-secondary/15 transition-colors font-bold text-foreground">
                        <td className="py-3 px-4 flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-extrabold uppercase">
                            {p.name ? p.name.split(" ").map((x: any) => x[0]).join("").slice(0, 2) : "P"}
                          </div>
                          <span>{p.name}</span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{p.age || "N/A"}</td>
                        <td className="py-3 px-4">
                          <a 
                            href={`tel:${p.phone}`} 
                            className="inline-flex items-center gap-1 text-primary hover:underline hover:text-primary-hover"
                            title={`Call patient ${p.name}`}
                          >
                            <PhoneCall className="h-3 w-3 shrink-0" />
                            {p.phone}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground font-semibold truncate max-w-[150px]">{p.email}</td>
                        <td className="py-3 px-4 text-center font-extrabold text-primary">{p.bookings.length}</td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            onClick={() => setSelectedPatient(p)}
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2.5 rounded-lg text-[10px] font-extrabold text-primary hover:bg-primary/10 border"
                          >
                            Open Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. CLINICAL PROFILE DRILLDOWN DRAWER/MODAL */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border max-h-[85vh] flex flex-col animate-slide-up">
            {/* Modal Header */}
            <div className="bg-secondary/20 p-6 border-b flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center text-lg font-extrabold uppercase shadow-sm">
                  {selectedPatient.name ? selectedPatient.name.split(" ").map((x: any) => x[0]).join("").slice(0, 2) : "P"}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                    {selectedPatient.name}
                    {selectedPatient.age && <span className="text-xs text-muted-foreground">({selectedPatient.age} yrs)</span>}
                  </h2>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Clinical Registry File</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-1.5 hover:bg-secondary rounded-full text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Demographics Card */}
              <div className="grid sm:grid-cols-2 gap-4 bg-secondary/10 border rounded-2xl p-4 text-xs font-bold text-foreground">
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground font-extrabold uppercase tracking-wider block">Phone (Click to Dial)</span>
                  <a 
                    href={`tel:${selectedPatient.phone}`} 
                    className="text-primary hover:underline hover:text-primary-hover flex items-center gap-1.5"
                    title={`Dials ${selectedPatient.phone}`}
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-primary animate-pulse" />
                    {selectedPatient.phone}
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-muted-foreground font-extrabold uppercase tracking-wider block">Email Address</span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedPatient.email}
                  </div>
                </div>
              </div>

              {/* Shared Patient Global CRM File */}
              <div className="rounded-2xl border bg-white p-5 space-y-4 shadow-3xs">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary border-b pb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Common Patient Directory Folder
                </h3>
                
                {loadingProfile ? (
                  <div className="py-4 text-center text-xs text-muted-foreground">Loading common patient file...</div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Skin Type & Concerns</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Type V Indian, Active Acne"
                          value={skinType}
                          onChange={(e) => setSkinType(e.target.value)}
                          className="w-full rounded-xl border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary text-foreground font-medium bg-secondary/5"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Known Allergies / Medical Alerts</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Benzoyl Peroxide sensitive"
                          value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                          className="w-full rounded-xl border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary text-foreground font-medium bg-secondary/5"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">General Helpdesk CRM Notes</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Prefers Saturday morning slots. Completed 2 clinical acne sessions."
                        value={generalNotes}
                        onChange={(e) => setGeneralNotes(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2 text-[11px] outline-none resize-none focus:ring-1 focus:ring-primary text-foreground font-medium bg-secondary/5"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-dashed">
                      <span className="text-[8px] text-muted-foreground font-semibold">
                        {patientProfile?.updatedAt ? `Last Sync: ${new Date(patientProfile.updatedAt).toLocaleDateString()}` : "Folder is unsaved"}
                      </span>
                      <button
                        onClick={handleSavePatientProfile}
                        disabled={savingProfile}
                        className="px-3 py-1.5 text-[10px] font-extrabold rounded-lg bg-primary text-white hover:bg-primary/95 transition-all shadow-3xs cursor-pointer disabled:opacity-50"
                      >
                        {savingProfile ? "Saving Folder..." : "Save Patient File"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking History Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5">
                  <History className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-extrabold uppercase tracking-tight text-foreground">Appointment Timeline ({selectedPatient.bookings.length})</h3>
                </div>

                <div className="relative border-l border-gray-200 pl-4 ml-2 space-y-6">
                  {selectedPatient.bookings.map((b: any, index: number) => {
                    const status = b.status.toLowerCase();
                    let dotColor = "bg-amber-400 border-amber-200";
                    let statusColor = "text-amber-600 bg-amber-50 border-amber-100";
                    if (status === "confirmed") {
                      dotColor = "bg-blue-500 border-blue-200";
                      statusColor = "text-blue-600 bg-blue-50 border-blue-100";
                    }
                    if (status === "done") {
                      dotColor = "bg-emerald-500 border-emerald-200";
                      statusColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
                    }
                    if (status === "cancelled") {
                      dotColor = "bg-destructive border-destructive/20";
                      statusColor = "text-destructive bg-destructive/10 border-destructive/20";
                    }

                    return (
                      <div key={b.id || index} className="relative">
                        {/* Timeline Bullet */}
                        <div className={`absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-white flex items-center justify-center`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                        </div>

                        {/* Booking Detail Card */}
                        <div className="rounded-xl border bg-secondary/5 p-4 shadow-3xs space-y-2">
                          <div className="flex justify-between items-start flex-wrap gap-2 text-[11px] font-bold">
                            <div className="space-y-0.5">
                              <div className="text-sm font-extrabold text-foreground uppercase truncate max-w-[250px]">
                                {b.service ? b.service.replace(/-/g, " ") : "General Consultation"}
                              </div>
                              <div className="text-muted-foreground flex items-center gap-1 text-[10px]">
                                <Clock className="h-3 w-3 text-primary shrink-0" />
                                {b.preferredDate}
                              </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${statusColor}`}>
                              {b.status}
                            </span>
                          </div>

                          <p className="text-[11px] italic text-muted-foreground bg-white rounded-lg p-2.5 border leading-relaxed">
                            <strong className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Patient Concern:</strong>
                            "{b.notes || "No concern described."}"
                          </p>

                          {/* Individual Remark / Call log note */}
                          <div className="mt-3 border-t pt-2 space-y-1.5">
                            <label className="text-[9px] font-bold text-muted-foreground uppercase block">Helpdesk Remark / Call Log</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder="Add note (e.g. Spoke to patient, confirmed Saturday)"
                                value={remarksState[b.id] !== undefined ? remarksState[b.id] : (b.receptionistRemark || "")}
                                onChange={(e) => setRemarksState(prev => ({ ...prev, [b.id]: e.target.value }))}
                                className="flex-1 rounded-lg border bg-white px-2.5 py-1.5 text-[11px] outline-none text-foreground font-medium focus:ring-1 focus:ring-primary"
                              />
                              <button
                                disabled={savingRemarkId === b.id}
                                onClick={() => handleSaveRemark(b.id, remarksState[b.id] !== undefined ? remarksState[b.id] : (b.receptionistRemark || ""))}
                                className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-primary text-white hover:bg-primary/95 transition-all shadow-3xs cursor-pointer"
                              >
                                {savingRemarkId === b.id ? "Saving..." : "Save Note"}
                              </button>
                            </div>
                          </div>

                          {/* Quick change inside drilldown */}
                          <div className="flex gap-1 pt-1 justify-end">
                            {status === "pending" && (
                              <button 
                                disabled={updatingId === b.id}
                                onClick={() => handleUpdateStatus(b.id, "Confirmed")}
                                className="px-2.5 py-1 text-[9px] font-extrabold rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            {status === "confirmed" && (
                              <button 
                                disabled={updatingId === b.id}
                                onClick={() => handleUpdateStatus(b.id, "Done")}
                                className="px-2.5 py-1 text-[9px] font-extrabold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                              >
                                Done
                              </button>
                            )}
                            {(status === "pending" || status === "confirmed") && (
                              <button 
                                disabled={updatingId === b.id}
                                onClick={() => handleUpdateStatus(b.id, "Cancelled")}
                                className="px-2.5 py-1 text-[9px] font-extrabold rounded-lg bg-white border border-gray-200 text-destructive hover:bg-destructive/10 animate-fade-in cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-secondary/15 p-4 border-t flex justify-end">
              <Button 
                onClick={() => setSelectedPatient(null)} 
                className="rounded-xl font-bold bg-primary px-5"
              >
                Close Folder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
