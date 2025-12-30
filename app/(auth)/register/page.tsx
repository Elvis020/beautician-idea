"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, User, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Role = "customer" | "beautician";
type Step = "role" | "phone" | "otp" | "details";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") as Role | null;

  const [role, setRole] = useState<Role | null>(initialRole);
  const [step, setStep] = useState<Step>(initialRole ? "phone" : "role");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectRole = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep("phone");
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("otp");
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("details");
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    // Redirect based on role
    if (role === "beautician") {
      router.push("/beautician/dashboard");
    } else {
      router.push("/explore");
    }
  };

  const goBack = () => {
    if (step === "phone") setStep("role");
    else if (step === "otp") setStep("phone");
    else if (step === "details") setStep("otp");
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-pink-600" />
          <span className="text-xl font-bold text-zinc-900">LukGood</span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col justify-center px-6 pb-12">
        <div className="w-full max-w-sm mx-auto">
          {/* Back Button */}
          {step !== "role" && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-zinc-500 hover:text-zinc-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
          )}

          {/* Step: Choose Role */}
          {step === "role" && (
            <>
              <h1 className="text-2xl font-bold text-center text-zinc-900 mb-2">
                Create your account
              </h1>
              <p className="text-center text-zinc-500 mb-8">
                How will you use LukGood?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleSelectRole("customer")}
                  className="w-full p-4 rounded-xl border-2 border-zinc-200 hover:border-pink-300 transition-colors flex items-center gap-4 text-left"
                >
                  <div className="rounded-full bg-pink-100 p-3">
                    <User className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">I'm a Customer</h3>
                    <p className="text-sm text-zinc-500">
                      Find and book beauticians near me
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectRole("beautician")}
                  className="w-full p-4 rounded-xl border-2 border-zinc-200 hover:border-pink-300 transition-colors flex items-center gap-4 text-left"
                >
                  <div className="rounded-full bg-purple-100 p-3">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">I'm a Beautician</h3>
                    <p className="text-sm text-zinc-500">
                      List my services and reach clients
                    </p>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Step: Phone */}
          {step === "phone" && (
            <>
              <h1 className="text-2xl font-bold text-center text-zinc-900 mb-2">
                Enter your phone number
              </h1>
              <p className="text-center text-zinc-500 mb-8">
                We'll send you a verification code
              </p>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <Input
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isLoading || !phone}
                >
                  {isLoading ? "Sending..." : "Send Code"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}

          {/* Step: OTP */}
          {step === "otp" && (
            <>
              <h1 className="text-2xl font-bold text-center text-zinc-900 mb-2">
                Verify your number
              </h1>
              <p className="text-center text-zinc-500 mb-8">
                Enter the code sent to {phone}
              </p>

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-lg text-center tracking-widest"
                  maxLength={6}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}

          {/* Step: Details */}
          {step === "details" && (
            <>
              <h1 className="text-2xl font-bold text-center text-zinc-900 mb-2">
                Complete your profile
              </h1>
              <p className="text-center text-zinc-500 mb-8">
                Tell us a bit about yourself
              </p>

              <form onSubmit={handleComplete} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {role === "beautician" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                        Business Name
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., Akosua Beauty Lounge"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                        Location / Address
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., Osu, Accra"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isLoading || !name || (role === "beautician" && (!businessName || !address))}
                >
                  {isLoading ? "Creating account..." : "Complete Setup"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}

          {/* Login Link */}
          {step === "role" && (
            <p className="mt-8 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-pink-600">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
