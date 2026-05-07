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
  Fingerprint,
  Info,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

type Step = 
  | 'ACCOUNT_TYPE' 
  | 'EMAIL_COUNTRY' 
  | 'PHONE_OTP' 
  | 'PASSWORD' 
  | 'BASIC_INFO' 
  | 'INTENT' 
  | 'LINK_CARD' 
  | 'PLAID_INTRO'
  | 'SELECT_INSTITUTION'
  | 'IDENTITY_VERIFICATION' 
  | 'LIVENESS_CHECK' 
  | 'SUCCESS'
  | 'ERROR';

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
    address: '10116 Imperial Avenue, Cupertino, CA 95014-59',
    intent: '',
    linkMethod: 'card'
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const nextStep = (s: Step) => setStep(s);

  const handleError = (msg: string) => {
    setErrorMsg(msg);
    setStep('ERROR');
  };

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
          color: #1a1a1a;
        }
        .paypal-input:focus { border-color: #0070ba; box-shadow: 0 0 0 1px #0070ba; }
        .paypal-btn {
          width: 100%;
          padding: 14px;
          background: #0070ba;
          color: white;
          border-radius: 100px;
          font-weight: 700;
          transition: 0.2s;
          text-align: center;
        }
        .paypal-btn:hover { background: #005ea6; }
        .paypal-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .outline-btn {
          width: 100%;
          padding: 14px;
          background: white;
          color: #0070ba;
          border: 1px solid #0070ba;
          border-radius: 100px;
          font-weight: 700;
          transition: 0.2s;
        }
        .outline-btn:hover { background: #f0f7ff; }
      `}</style>

      <div className="max-w-md mx-auto px-6 py-12">
        <header className="flex justify-center mb-12">
           <div className="text-2xl font-black text-[#0070ba] flex items-center gap-1 cursor-pointer" onClick={() => setStep('ACCOUNT_TYPE')}>
             <Shield fill="#0070ba" /> Futuristic <span className="text-[#10b981]">Pay</span>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 'ACCOUNT_TYPE' && (
            <motion.div 
              key="account-type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Join Futuristic Pay</h1>
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
              key="email-country"
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
            <motion.div key="phone-otp" className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Confirm your phone</h1>
                <p className="text-sm text-gray-500">We'll send a code to verify your identity.</p>
              </div>

              <div className="space-y-4">
                {!otpSent ? (
                  <>
                    <div className="flex gap-2">
                      <div className="w-24 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-400 gap-2">
                         <img src="https://flagcdn.com/w20/us.png" width="20" alt="US" />
                         <span>+1</span>
                      </div>
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
            <motion.div key="password" className="space-y-8">
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
            <motion.div key="basic-info" className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Your info</h1>
                <p className="text-sm text-gray-500">Legal name and address required by law.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="First name" className="paypal-input" onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <input placeholder="Last name" className="paypal-input" onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <input placeholder="Street address" className="paypal-input" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" className="paypal-input" />
                  <input placeholder="Zip code" className="paypal-input" />
                </div>
                <button className="paypal-btn" onClick={() => nextStep('INTENT')}>Next</button>
              </div>
            </motion.div>
          )}

          {step === 'INTENT' && (
            <motion.div key="intent" className="space-y-8">
              <div className="space-y-2 text-center">
                <Zap className="mx-auto text-yellow-400" size={48} />
                <h1 className="text-2xl font-bold">What's your goal?</h1>
                <p className="text-sm text-gray-500">Tell us what you're planning to do.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {['Shop global brands', 'Send money to family', 'Manage my business', 'Receive cross-border payouts'].map(intent => (
                  <button 
                    key={intent}
                    onClick={() => { setFormData({...formData, intent}); nextStep('LINK_CARD'); }}
                    className="p-4 border border-gray-200 rounded-xl text-left font-semibold hover:border-[#0070ba] hover:bg-blue-50 transition-all flex justify-between items-center"
                  >
                    {intent}
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'LINK_CARD' && (
            <motion.div key="link-card" className="space-y-8">
               <div className="text-center space-y-4">
                  <h1 className="text-3xl font-black text-[#1b1c1a]">Link a card</h1>
                  <p className="text-sm font-medium">Want to link your <button className="text-[#0070ba] hover:underline">Amex Send® Account</button>?</p>
                  
                  <div className="w-24 h-16 bg-[#e1f5fe] rounded-lg mx-auto flex items-center justify-center text-[#03a9f4]">
                     <div className="w-10 h-6 border-2 border-current rounded relative overflow-hidden">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-current rounded-full" />
                        <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-current rounded-full" />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <input placeholder="Debit or credit card number" className="paypal-input" />
                  
                  <div className="relative">
                    <select className="paypal-input appearance-none bg-white pr-10">
                      <option>Card type</option>
                      <option>Visa</option>
                      <option>Mastercard</option>
                      <option>Amex</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>

                  <input placeholder="Expiration date" className="paypal-input" />
                  <input placeholder="Security code" className="paypal-input" />
                  
                  <div className="relative">
                    <div className="paypal-input flex items-center justify-between text-sm py-4">
                       <span className="truncate">{formData.address}</span>
                       <ChevronDown size={20} className="text-gray-400" />
                    </div>
                  </div>

                  <button className="paypal-btn" onClick={() => nextStep('IDENTITY_VERIFICATION')}>Link Card</button>
                  <button className="outline-btn" onClick={() => nextStep('PLAID_INTRO')}>Link a bank instead</button>
                  
                  <button className="w-full text-sm font-bold text-[#0070ba] mt-4" onClick={() => nextStep('IDENTITY_VERIFICATION')}>Not now</button>
               </div>
            </motion.div>
          )}

          {step === 'PLAID_INTRO' && (
            <motion.div key="plaid-intro" className="space-y-12">
               <div className="flex justify-end">
                  <button onClick={() => nextStep('LINK_CARD')}><X size={24} className="text-gray-400" /></button>
               </div>
               
               <div className="text-center space-y-6">
                  <div className="flex justify-center items-center -space-x-2">
                     <div className="w-12 h-12 bg-[#0070ba] rounded-lg border-2 border-white flex items-center justify-center text-white font-bold text-xl">P</div>
                     <div className="w-12 h-12 bg-[#3bbcd0] rounded-lg border-2 border-white flex items-center justify-center text-white">
                        <Building size={24} />
                     </div>
                  </div>
                  
                  <h1 className="text-2xl font-bold px-4">Futuristic Pay uses Plaid to connect your account</h1>
               </div>

               <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="paypal-input flex items-center gap-4 bg-gray-50 border-gray-200">
                       <img src="https://flagcdn.com/w20/us.png" width="20" alt="US" />
                       <span className="font-bold">+1</span>
                       <input type="tel" placeholder="Phone" className="bg-transparent outline-none flex-1 font-medium" />
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl">
                       <Zap size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                       <p className="text-[11px] text-gray-500 leading-relaxed">
                         Use your phone number to log in or sign up with Plaid to go faster next time. <button className="underline font-bold">Learn more</button>
                       </p>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 text-center px-4">
                    By continuing, you agree to Plaid's <button className="underline">Terms</button> and <button className="underline">Privacy Policy</button> and to receive updates on plaid.com
                  </p>

                  <button className="w-full py-4 bg-gray-400 text-white rounded-xl font-bold" onClick={() => nextStep('SELECT_INSTITUTION')}>Continue</button>
                  <button className="w-full text-sm font-bold text-gray-900 py-2" onClick={() => nextStep('SELECT_INSTITUTION')}>Continue without phone number</button>
               </div>
            </motion.div>
          )}

          {step === 'SELECT_INSTITUTION' && (
            <motion.div key="select-institution" className="space-y-8">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-black text-xs tracking-widest text-gray-900">
                    <Building size={16} fill="#000" /> PLAID
                  </div>
                  <X size={20} className="text-gray-400" />
               </div>

               <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">Select a saved institution</h1>
                  <p className="text-sm text-gray-500">You can connect a new institution or select a saved one.</p>
               </div>

               <div className="space-y-3">
                  <button className="w-full p-4 border border-gray-100 rounded-xl flex items-center gap-4 hover:bg-gray-50 transition-all text-left">
                     <div className="w-12 h-12 bg-[#612d87] rounded-lg flex items-center justify-center text-white font-black text-2xl">A</div>
                     <div className="flex-1">
                        <p className="font-bold">Ally Bank</p>
                        <p className="text-xs text-gray-400">Previously connected</p>
                     </div>
                     <Zap size={16} className="text-purple-400" />
                  </button>

                  <button className="w-full p-4 border border-gray-100 rounded-xl flex items-center gap-4 hover:bg-gray-50 transition-all text-left">
                     <div className="w-12 h-12 bg-[#bf0d3e] rounded-lg flex items-center justify-center text-white">
                        <img src="https://www.bankofamerica.com/content/images/Contextual/Logos/bac-logo-mobile.png" className="w-10 brightness-200" alt="BofA" />
                     </div>
                     <div className="flex-1">
                        <p className="font-bold">Bank of America</p>
                        <p className="text-xs text-gray-400">Previously connected</p>
                     </div>
                  </button>

                  <button className="w-full p-4 border border-gray-100 rounded-xl flex items-center gap-4 hover:bg-gray-50 transition-all text-left">
                     <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center">
                        <Zap size={20} className="text-gray-300" />
                     </div>
                     <div className="flex-1">
                        <p className="font-bold text-gray-900">Connect a new institution</p>
                        <p className="text-xs text-gray-400">Then connect faster next time</p>
                     </div>
                  </button>
               </div>

               <div className="pt-6 border-t border-gray-50">
                  <p className="text-[11px] text-gray-400 leading-relaxed text-center px-4">
                    You'll share contact info, account and balance info, account and routing number, and transactions to help you make a purchase online and verify your identity and prevent fraud. <button className="underline font-bold text-gray-500">Learn more</button>
                  </p>
               </div>
               
               <button className="paypal-btn mt-4" onClick={() => nextStep('IDENTITY_VERIFICATION')}>Confirm Selection</button>
               <button className="w-full text-sm font-bold text-[#0070ba] py-2" onClick={() => handleError("Unable to connect to financial institution. Please try again later.")}>Trigger Test Error</button>
            </motion.div>
          )}

          {step === 'IDENTITY_VERIFICATION' && (
            <motion.div key="identity" className="space-y-8">
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
            <motion.div key="liveness" className="space-y-8">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Liveness Verification</h1>
                <p className="text-sm text-gray-500">Please position your face in the center of the frame.</p>
              </div>

              <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-full overflow-hidden border-8 border-gray-100 bg-black">
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

              <div className="space-y-4 text-center">
                 <div className="flex items-center justify-center gap-3 text-sm font-bold text-gray-500">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={12} /></div>
                   Photo ID Detected
                 </div>
                 <button className="paypal-btn mt-6" onClick={() => nextStep('SUCCESS')}>Complete Registration</button>
              </div>
            </motion.div>
          )}

          {step === 'SUCCESS' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-black">All set, {formData.firstName || 'User'}!</h1>
                <p className="text-gray-500">Your account is active and verified.</p>
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl space-y-4 border border-blue-100 text-left">
                 <div className="flex items-center gap-3 text-[#0070ba]">
                    <Fingerprint size={24} />
                    <h4 className="font-bold">FaceID Payouts Enabled</h4>
                 </div>
                 <p className="text-xs text-blue-800 leading-relaxed">
                   For all future transactions, you'll receive an SMS to authorize via FaceID on your mobile device. Just swipe to confirm.
                 </p>
              </div>

              <Link href="/" className="paypal-btn block text-center">
                Go to Dashboard
              </Link>
            </motion.div>
          )}

          {step === 'ERROR' && (
            <motion.div key="error" className="text-center space-y-8 py-12">
               <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={40} />
               </div>
               <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Something went wrong</h1>
                  <p className="text-gray-500 px-8 leading-relaxed">{errorMsg}</p>
               </div>
               <button className="paypal-btn" onClick={() => setStep('SELECT_INSTITUTION')}>Try again</button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 text-center space-y-4">
          <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <button>Privacy</button>
            <button>Cookies</button>
            <button>Legal</button>
          </div>
          <p className="text-[10px] text-gray-300">© 2026 Futuristic International. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
