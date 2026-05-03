"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  User, 
  Briefcase, 
  Mail, 
  Smartphone, 
  Lock, 
  MapPin, 
  CreditCard, 
  Building,
  Camera,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  X,
  Zap,
  Fingerprint
} from "lucide-react";
import Link from "next/link";

type Step = 
  | 'ACCOUNT_TYPE' 
  | 'EMAIL_COUNTRY' 
  | 'PHONE_OTP' 
  | 'PASSWORD' 
  | 'BASIC_INFO' 
  | 'INTENT' 
  | 'FINANCIAL_LINK' 
  | 'IDENTITY_VERIFICATION' 
  | 'LIVENESS_CHECK' 
  | 'SUCCESS';

export default function RegistrationPage() {
  const [step, setStep] = useState<Step>('ACCOUNT_TYPE');
  const [formData, setFormData] = useState({
    type: 'personal',
    email: '',
    country: 'United States',
    phone: '',
    otp: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    intent: '',
    linkMethod: 'card'
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const nextStep = (s: Step) => setStep(s);

  return (
    <div className="min-h-screen bg-white text-[#1b1c1a] font-sans overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .paypal-input { 
          width: 100%; 
          padding: 16px; 
          border: 1px solid #d1d5db; 
          border-radius: 8px; 
          font-size: 16px; 
          transition: 0.2s;
          outline: none;
        }
        .paypal-input:focus { border-color: #0070ba; ring: 2px solid rgba(0,112,186,0.1); }
        .paypal-btn {
          width: 100%;
          padding: 14px;
          background: #0070ba;
          color: white;
          border-radius: 100px;
          font-weight: 700;
          transition: 0.2s;
        }
        .paypal-btn:hover { background: #005ea6; }
      `}</style>

      <div className="max-w-md mx-auto px-6 py-12">
        <header className="flex justify-center mb-12">
           <div className="text-2xl font-black text-[#0070ba] flex items-center gap-1">
             <Shield fill="#0070ba" /> AgriMind <span className="text-[#10b981]">Pay</span>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 'ACCOUNT_TYPE' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Join AgriMind Pay</h1>
                <p className="text-gray-500">The safest way to pay and get paid across the globe.</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => { setFormData({...formData, type: 'personal'}); nextStep('EMAIL_COUNTRY'); }}
                  className="w-full p-6 border-2 border-gray-100 rounded-2xl flex items-start gap-4 hover:border-[#0070ba] hover:bg-blue-50/30 transition-all text-left group"
                >
                  <div className="p-3 bg-blue-100 rounded-xl text-[#0070ba] group-hover:bg-[#0070ba] group-hover:text-white transition-colors">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Personal Account</h3>
                    <p className="text-sm text-gray-500">Shop, send money, and pay bills securely.</p>
                  </div>
                </button>

                <button 
                  onClick={() => { setFormData({...formData, type: 'business'}); nextStep('EMAIL_COUNTRY'); }}
                  className="w-full p-6 border-2 border-gray-100 rounded-2xl flex items-start gap-4 hover:border-[#0070ba] hover:bg-blue-50/30 transition-all text-left group"
                >
                  <div className="p-3 bg-green-100 rounded-xl text-[#10b981] group-hover:bg-[#10b981] group-hover:text-white transition-colors">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Business Account</h3>
                    <p className="text-sm text-gray-500">Accept payments and manage business globally.</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'EMAIL_COUNTRY' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Sign up for {formData.type === 'personal' ? 'Personal' : 'Business'}</h1>
                <p className="text-sm text-gray-500">First, we need your email and region.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Region</label>
                  <select 
                    className="paypal-input bg-gray-50"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Germany</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@email.com" 
                    className="paypal-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <button 
                  className="paypal-btn mt-4"
                  onClick={() => nextStep('PHONE_OTP')}
                  disabled={!formData.email}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 'PHONE_OTP' && (
            <motion.div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Confirm your phone</h1>
                <p className="text-sm text-gray-500">We'll send a code to verify your identity.</p>
              </div>

              <div className="space-y-4">
                {!otpSent ? (
                  <>
                    <div className="flex gap-2">
                      <div className="w-24 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-400">+1</div>
                      <input 
                        type="tel" 
                        placeholder="Mobile number" 
                        className="paypal-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <button 
                      className="paypal-btn"
                      onClick={() => setOtpSent(true)}
                      disabled={!formData.phone}
                    >
                      Send Code
                    </button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between gap-2">
                      {[1,2,3,4,5,6].map(i => (
                        <input key={i} type="text" maxLength={1} className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:border-[#0070ba]" />
                      ))}
                    </div>
                    <p className="text-xs text-center text-gray-400">Didn't receive it? <button className="text-[#0070ba] font-bold">Resend</button></p>
                    <button className="paypal-btn" onClick={() => nextStep('PASSWORD')}>Verify OTP</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'PASSWORD' && (
            <motion.div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Create your password</h1>
                <p className="text-sm text-gray-500">Must be at least 8 characters with numbers.</p>
              </div>

              <div className="space-y-4">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="paypal-input"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button className="paypal-btn" onClick={() => nextStep('BASIC_INFO')}>Next</button>
              </div>
            </motion.div>
          )}

          {step === 'BASIC_INFO' && (
            <motion.div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Your info</h1>
                <p className="text-sm text-gray-500">Legal name and address required by law.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="First name" className="paypal-input" onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <input placeholder="Last name" className="paypal-input" onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <input placeholder="Street address" className="paypal-input" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" className="paypal-input" />
                  <input placeholder="Zip code" className="paypal-input" />
                </div>
                <button className="paypal-btn" onClick={() => nextStep('INTENT')}>Next</button>
              </div>
            </motion.div>
          )}

          {step === 'INTENT' && (
            <motion.div className="space-y-8">
              <div className="space-y-2 text-center">
                <Zap className="mx-auto text-yellow-400" size={48} />
                <h1 className="text-2xl font-bold">What's your goal?</h1>
                <p className="text-sm text-gray-500">Tell us what you're planning to do.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {['Shop global brands', 'Send money to family', 'Manage my business', 'Receive cross-border payouts'].map(intent => (
                  <button 
                    key={intent}
                    onClick={() => { setFormData({...formData, intent}); nextStep('FINANCIAL_LINK'); }}
                    className="p-4 border border-gray-200 rounded-xl text-left font-semibold hover:border-[#0070ba] hover:bg-blue-50 transition-all flex justify-between items-center"
                  >
                    {intent}
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'FINANCIAL_LINK' && (
            <motion.div className="space-y-8">
               <div className="text-center space-y-2">
                  <Building className="mx-auto text-[#0070ba]" size={40} />
                  <h1 className="text-2xl font-bold">Link your account</h1>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    AgriMind uses Stripe to link your accounts. By continuing, you agree to our terms and Stripe's privacy policy.
                  </p>
               </div>

               <div className="space-y-6">
                  {/* Mock Stripe Institution Select */}
                  <div className="p-1 border border-gray-200 rounded-2xl">
                    <div className="p-4 flex items-center justify-between border-b border-gray-100">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">STRIPE</div>
                         <span className="text-xs font-bold text-gray-400 tracking-widest">FINANCIAL CONNECTIONS</span>
                      </div>
                      <X size={16} className="text-gray-300" />
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <p className="text-xs font-bold text-gray-600">SELECT A SAVED INSTITUTION</p>
                      
                      <button className="w-full p-4 bg-gray-50 rounded-xl flex items-center gap-4 hover:bg-gray-100 transition-all">
                        <div className="w-10 h-10 bg-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
                        <div className="text-left">
                          <p className="font-bold">Ally Bank</p>
                          <p className="text-[10px] text-gray-400">Previously connected</p>
                        </div>
                        <Zap size={14} className="ml-auto text-purple-400" />
                      </button>

                      <button className="w-full p-4 bg-gray-50 rounded-xl flex items-center gap-4 hover:bg-gray-100 transition-all">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">B</div>
                        <div className="text-left">
                          <p className="font-bold">Bank of America</p>
                          <p className="text-[10px] text-gray-400">Previously connected</p>
                        </div>
                      </button>

                      <button className="w-full p-4 border border-dashed border-gray-300 rounded-xl flex items-center gap-4 text-gray-400 font-bold hover:bg-gray-50 transition-all">
                         <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                           <Zap size={18} />
                         </div>
                         Connect new institution
                      </button>
                    </div>
                  </div>

                  <button className="paypal-btn" onClick={() => nextStep('IDENTITY_VERIFICATION')}>Next Step</button>
                  <button className="w-full text-sm font-bold text-[#0070ba] py-2" onClick={() => nextStep('IDENTITY_VERIFICATION')}>Link a bank instead</button>
               </div>
            </motion.div>
          )}

          {step === 'IDENTITY_VERIFICATION' && (
            <motion.div className="space-y-8">
               <div className="space-y-2">
                 <h1 className="text-2xl font-bold">Identity Check</h1>
                 <p className="text-sm text-gray-500">Government regulation requires us to verify your ID.</p>
               </div>

               <div className="space-y-6">
                 <div className="aspect-[1.6/1] w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-[#0070ba] transition-all cursor-pointer">
                    <Camera className="text-gray-300 group-hover:text-[#0070ba]" size={40} />
                    <p className="font-bold text-gray-400 group-hover:text-[#0070ba]">Scan Driver's License</p>
                 </div>

                 <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-3">
                   <Shield className="text-yellow-600 flex-shrink-0" size={18} />
                   <p className="text-xs text-yellow-800 leading-relaxed">
                     Your data is encrypted and used only for compliance purposes. We never sell your biometric data.
                   </p>
                 </div>

                 <button className="paypal-btn" onClick={() => nextStep('LIVENESS_CHECK')}>Start Liveness Scan</button>
               </div>
            </motion.div>
          )}

          {step === 'LIVENESS_CHECK' && (
            <motion.div className="space-y-8">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Liveness Verification</h1>
                <p className="text-sm text-gray-500">Please position your face in the center of the frame.</p>
              </div>

              <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-full overflow-hidden border-8 border-gray-100 bg-black">
                {/* Simulation of a face scan */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <User size={120} className="text-white opacity-20" />
                   <motion.div 
                     initial={{ rotate: 0 }}
                     animate={{ rotate: 360 }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                   />
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={12} /></div>
                   Photo ID Detected
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={12} /></div>
                   Matching with Driver's License...
                 </div>

                 <button className="paypal-btn mt-6" onClick={() => nextStep('SUCCESS')}>Complete Registration</button>
              </div>
            </motion.div>
          )}

          {step === 'SUCCESS' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-black">All set, {formData.firstName}!</h1>
                <p className="text-gray-500">Your account is active and verified.</p>
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl space-y-4 border border-blue-100">
                 <div className="flex items-center gap-3 text-[#0070ba]">
                    <Fingerprint size={24} />
                    <h4 className="font-bold text-left">FaceID Payouts Enabled</h4>
                 </div>
                 <p className="text-xs text-left text-blue-800 leading-relaxed">
                   For all future transactions, you'll receive an SMS to authorize via FaceID on your mobile device. Just swipe to confirm.
                 </p>
              </div>

              <Link href="/" className="paypal-btn block text-center">
                Go to Dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 text-center space-y-4">
          <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <button>Privacy</button>
            <button>Cookies</button>
            <button>Legal</button>
          </div>
          <p className="text-[10px] text-gray-300">© 2026 AgriMind International. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
