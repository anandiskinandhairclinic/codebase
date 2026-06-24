import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, MapPin, Truck, Store, ArrowRight, ArrowLeft, CheckCircle2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { createOrder } from "@/lib/firebaseDataAdapter";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = "cart" | "details" | "payment" | "otp" | "success";

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, addToCart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("cart");

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "deliver">("pickup");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi">("cod");


  // OTP states
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (deliveryOption === "deliver" && !address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }
    setStep("payment");
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate random 4 digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtp("");

    // Trigger simulated SMS toast
    toast(`[SMS Gateway] Your OTP verification code is ${code}`, {
      duration: 15000,
      icon: "💬",
      description: `Sent to +91 ${phone}`,
    });

    setStep("otp");
  };

  const handleVerifyAndPlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      toast.error("Invalid verification code. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const orderItems = cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const res = await createOrder({
        customerName: name,
        phone,
        deliveryOption,
        address: deliveryOption === "deliver" ? address : undefined,
        paymentMethod,
        items: orderItems,
        total: cartTotal,
      });

      if (res.success && res.id) {
        setOrderId(res.id);
        clearCart();
        setStep("success");
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep("cart");
    setName("");
    setPhone("");
    setDeliveryOption("pickup");
    setAddress("");
    setPaymentMethod("cod");
    setOtp("");
    setGeneratedOtp("");
    setOrderId("");
  };

  const handleClose = () => {
    if (step === "success") {
      resetFlow();
    }
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#fdfaf6] border-l border-[#ecdcc9] p-0">
        {/* Header Block with Back Button */}
        <div className="p-6 border-b border-[#ecdcc9]/60 bg-[#faf6f0] flex items-center gap-3">
          {step !== "success" && (
            <button
              onClick={() => {
                if (step === "cart") onClose();
                else if (step === "details") setStep("cart");
                else if (step === "payment") setStep("details");
                else if (step === "otp") setStep("payment");
              }}
              className="p-2 rounded-full hover:bg-[#ecdcc9]/30 text-[#5c4a37] transition-colors cursor-pointer flex-shrink-0"
              title={step === "cart" ? "Close Cart" : "Go Back"}
            >
              <ArrowLeft className="size-5" />
            </button>
          )}
          <SheetHeader className="text-left flex-1">
            <SheetTitle className="font-display text-2xl text-[#5c4a37] flex items-center gap-2">
              <ShoppingBag className="size-5 text-primary" />
              {step === "cart" && "Your Cart"}
              {step === "details" && "Checkout Details"}
              {step === "payment" && "Choose Payment"}
              {step === "otp" && "Verify Mobile"}
              {step === "success" && "Order Success"}
            </SheetTitle>
            <SheetDescription className="text-xs text-[#8a7560]">
              {step === "cart" && "Review your clinic-recommended selections"}
              {step === "details" && "Tell us where to prepare your order"}
              {step === "payment" && "Select payment options to complete"}
              {step === "otp" && `We've sent a code to +91 ${phone}`}
              {step === "success" && "Your order has been recorded"}
            </SheetDescription>
          </SheetHeader>
        </div>


        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === "cart" && (
            <>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="size-16 rounded-full bg-[#f4ece1] grid place-items-center text-[#8a7560]">
                    <ShoppingBag className="size-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#5c4a37] font-semibold">Your cart is empty</h3>
                    <p className="text-sm text-[#8a7560] mt-1 max-w-[200px]">Browse our shop and add formulations recommended for your skin & hair.</p>
                  </div>
                  <Button onClick={onClose} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/95 text-xs px-6 py-2 mt-2">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#ecdcc9]/50 hover:shadow-sm transition-shadow">
                      <div className="size-16 bg-[#faf6f0] rounded-xl overflow-hidden border border-[#ecdcc9]/30 flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img src={item.product.imageUrl} alt="" className="size-full object-cover" />
                        ) : (
                          <div className="size-full bg-primary/5 grid place-items-center text-primary/45 font-display text-xs">
                            {item.product.category.substring(0, 3)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium text-sm text-[#5c4a37] truncate">{item.product.name}</h4>
                          <p className="text-xs text-[#8a7560] mt-0.5">{item.product.category}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#ecdcc9] rounded-full px-1 py-0.5 bg-[#faf6f0]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="size-5 rounded-full hover:bg-[#ecdcc9]/40 grid place-items-center text-[#5c4a37]"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-medium text-[#5c4a37]">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item.product, 1)}
                              className="size-5 rounded-full hover:bg-[#ecdcc9]/40 grid place-items-center text-[#5c4a37]"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="font-semibold text-sm text-[#5c4a37]">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 self-start p-1 cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === "details" && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cust-name" className="text-[#5c4a37]">Your Name</Label>
                <Input
                  id="cust-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ritesh Patil"
                  className="rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cust-phone" className="text-[#5c4a37]">Mobile Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8a7560] font-medium">+91</span>
                  <Input
                    id="cust-phone"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit number"
                    className="pl-12 rounded-xl border-[#ecdcc9] bg-white focus-visible:ring-primary focus-visible:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[#5c4a37]">Delivery Option</Label>
                <RadioGroup
                  value={deliveryOption}
                  onValueChange={(val) => setDeliveryOption(val as "pickup" | "deliver")}
                  className="grid grid-cols-2 gap-3"
                >
                  <label
                    className={`flex flex-col items-center justify-between rounded-xl border p-4 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${
                      deliveryOption === "pickup" ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "border-[#ecdcc9]"
                    }`}
                  >
                    <RadioGroupItem value="pickup" id="opt-pickup" className="sr-only" />
                    <Store className={`size-5 mb-2 ${deliveryOption === "pickup" ? "text-primary" : "text-[#8a7560]"}`} />
                    <span className="text-xs font-semibold text-[#5c4a37]">Clinic Pickup</span>
                    <span className="text-[10px] text-[#8a7560] mt-1 text-center">Ready in 2 hours</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-between rounded-xl border p-4 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${
                      deliveryOption === "deliver" ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "border-[#ecdcc9]"
                    }`}
                  >
                    <RadioGroupItem value="deliver" id="opt-deliver" className="sr-only" />
                    <Truck className={`size-5 mb-2 ${deliveryOption === "deliver" ? "text-primary" : "text-[#8a7560]"}`} />
                    <span className="text-xs font-semibold text-[#5c4a37]">Home Delivery</span>
                    <span className="text-[10px] text-[#8a7560] mt-1 text-center">Delivered in 1-2 days</span>
                  </label>
                </RadioGroup>
              </div>

              {deliveryOption === "deliver" ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <Label htmlFor="cust-addr" className="text-[#5c4a37]">Delivery Address</Label>
                  <textarea
                    id="cust-addr"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter house no, street name, landmark, city, and pincode"
                    className="w-full text-sm rounded-xl border border-[#ecdcc9] bg-white p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                    required
                  />
                </div>
              ) : (
                <div className="p-3 bg-[#f4ece1] rounded-xl flex gap-2.5 items-start text-xs text-[#6e563d] animate-in fade-in duration-200">
                  <MapPin className="size-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">Pickup Location:</span>
                    <span className="leading-relaxed">Anandi Skin & Hair Clinic, Sai Nagar, Dattanagar, Ambegaon Budruk, Pune. (Timing: 6 PM - 9 PM)</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground py-6 mt-4">
                Continue to Payment <ArrowRight className="size-4 ml-2" />
              </Button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handleSendOtp} className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <Label className="text-[#5c4a37] text-sm font-semibold">Select Payment Method</Label>
                <div className="grid gap-3">
                  <label
                    className={`flex items-center gap-4 rounded-xl border p-4 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${
                      paymentMethod === "cod" ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "border-[#ecdcc9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div className="size-10 rounded-full bg-[#f4ece1] grid place-items-center text-primary flex-shrink-0">
                      <Store className="size-5" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-semibold text-sm text-[#5c4a37] block">
                        {deliveryOption === "pickup" ? "Pay at Clinic" : "Cash on Delivery (COD)"}
                      </span>
                      <span className="text-[10px] text-[#8a7560] block mt-0.5">
                        {deliveryOption === "pickup" ? "Pay via cash/card at reception" : "Pay cash/UPI to delivery agent"}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 rounded-xl border p-4 bg-white hover:bg-[#faf6f0] cursor-pointer transition-colors ${
                      paymentMethod === "upi" ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "border-[#ecdcc9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="sr-only"
                    />
                    <div className="size-10 rounded-full bg-[#fbbc05]/10 grid place-items-center text-[#fbbc05] flex-shrink-0">
                      <QrCode className="size-5" />
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-semibold text-sm text-[#5c4a37] block">Scan UPI QR Code</span>
                      <span className="text-[10px] text-[#8a7560] block mt-0.5">Pay online using GPay, PhonePe, or any UPI app</span>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === "upi" && (
                <div className="p-5 bg-white border border-[#ecdcc9] rounded-2xl flex flex-col items-center justify-center space-y-4 animate-in fade-in slide-in-from-top-1 duration-200 shadow-xs">
                  <div className="p-3 bg-[#faf6f0] rounded-2xl border border-[#ecdcc9]/60 relative">
                    <div className="size-40 border-8 border-white bg-slate-900 flex items-center justify-center text-white text-[10px] rounded-lg">
                      <svg className="size-full text-white" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M10 10h20v20H10zm5 5v10h10V15zm55-5h20v20H70zm5 5v10h10V15zM10 70h20v20H10zm5 5v10h10V75zm35-30h10v10H50zm10 10h10v10H60zm-10 10h10v10H50zm20-20h10v10H70zm10 10h10v10H80zm0 10h10v10H80zm-45-5h10v10H35zm0-20h10v10H35zm15 0h10v10H50zm0-15h10v10H50zM45 80h10v10H45zm25 0h10v10H70zm10-10h10v10H80zm-10-10h10v10H70zm20 20h10v10H90zm-10-10h10v10H80zm-20 0h10v10H60z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 m-auto size-8 rounded-full bg-white border border-[#ecdcc9]/30 shadow-md flex items-center justify-center">
                      <span className="font-bold text-[10px] text-primary">UPI</span>
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs font-semibold text-[#5c4a37]">UPI ID: anandiclinic@okaxis</p>
                    <p className="text-[10px] text-[#8a7560]">Amount: ₹{cartTotal.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 font-medium leading-relaxed">After scanning & completing payment, click below to verify phone.</p>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground py-6">
                Proceed to Verification <ArrowRight className="size-4 ml-2" />
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-6 text-center">
              <div className="space-y-2 max-w-xs mx-auto">
                <p className="text-sm text-[#8a7560] leading-relaxed">
                  We've sent a simulated 4-digit verification code to <strong>+91 {phone}</strong>. Please enter it below to confirm your order.
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="otp-input" className="sr-only">Verification Code</Label>
                <Input
                  id="otp-input"
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 4-digit OTP"
                  className="rounded-xl border-[#ecdcc9] bg-white text-center text-xl tracking-[0.5em] font-display py-6 focus-visible:ring-primary focus-visible:border-primary max-w-[200px] mx-auto"
                  required
                />
              </div>

              <div className="space-y-3 pt-2">
                <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground py-6">
                  {loading ? "Verifying..." : "Confirm & Place Order"}
                </Button>
                
                <div className="flex justify-between items-center px-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      const code = Math.floor(1000 + Math.random() * 9000).toString();
                      setGeneratedOtp(code);
                      toast(`[SMS Gateway] Your OTP verification code is ${code}`, {
                        duration: 15000,
                        icon: "💬",
                      });
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="text-[#8a7560] hover:underline"
                  >
                    Change Payment
                  </button>

                </div>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center text-center space-y-5 py-8 animate-in zoom-in-95 duration-300">
              <div className="size-20 rounded-full bg-emerald-50 text-emerald-500 grid place-items-center shadow-sm">
                <CheckCircle2 className="size-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-[#5c4a37] font-semibold">Order Placed!</h3>
                <p className="text-sm text-[#8a7560] max-w-xs leading-relaxed">
                  Thank you for shopping. Your order has been logged in our clinic backend.
                </p>
                <div className="mt-4 p-3.5 bg-white border border-[#ecdcc9]/60 rounded-2xl text-xs space-y-1.5 text-left inline-block max-w-xs">
                  <div className="text-[#8a7560]"><span className="font-medium text-[#5c4a37]">Order ID:</span> {orderId}</div>
                  <div className="text-[#8a7560]"><span className="font-medium text-[#5c4a37]">Customer:</span> {name}</div>
                  <div className="text-[#8a7560]">
                    <span className="font-medium text-[#5c4a37]">Type:</span> {deliveryOption === "pickup" ? "Clinic Pickup" : "Home Delivery"}
                  </div>
                  {deliveryOption === "deliver" && (
                    <div className="text-[#8a7560] truncate"><span className="font-medium text-[#5c4a37]">Address:</span> {address}</div>
                  )}
                </div>
              </div>
              <Button onClick={handleClose} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/95 px-8">
                Close & Return
              </Button>
            </div>
          )}
        </div>

        {/* Footer actions for checkout */}
        {cart.length > 0 && step !== "success" && (
          <div className="p-6 border-t border-[#ecdcc9]/60 bg-[#faf6f0] space-y-4">
            <div className="flex items-center justify-between text-base">
              <span className="text-[#8a7560]">Total amount</span>
              <span className="font-display font-semibold text-xl text-[#5c4a37]">₹{cartTotal.toLocaleString()}</span>
            </div>
            
            {step === "cart" && (
              <Button onClick={() => setStep("details")} className="w-full rounded-full bg-primary hover:bg-primary/95 text-primary-foreground py-6">
                Checkout Order <ArrowRight className="size-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
