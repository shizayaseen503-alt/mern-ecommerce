import { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import { useRegisterMutation } from "../../redux/api/userApiSlice"; 
import AuthLayout from "../../components/layout/AuthLayout";

export default function Register() { 
  const navigate = useNavigate(); 
  const [register, { isLoading }] = useRegisterMutation(); 

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const submitHandler = async (e) => { 
    e.preventDefault(); 
    if (!name.trim() || !email.trim() || !password) { 
      return toast.error("Please fill in all layout configuration fields completely."); 
    } 
    try { 
      await register({ username: name.trim(), email: email.trim(), password }).unwrap(); 
      toast.success("Profile registration completed successfully!"); 
      navigate("/login"); 
    } catch (err) { 
      toast.error(err?.data?.message || err?.message || "Registration processing failed"); 
    } 
  }; 

  return ( 
    <AuthLayout 
      title="Create account" 
      subtitle="Join to manage curated fashion custom collections today."
    >
      <form onSubmit={submitHandler} className="space-y-5 animate-in fade-in duration-300"> 
        {/* Full Identity Registration Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Signature Name
          </label>
          <input 
            type="text"
            placeholder="John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            disabled={isLoading}
            className="w-full text-sm border border-slate-200 bg-white text-slate-900 placeholder-slate-400 p-3 rounded-xl outline-hidden focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all duration-200 shadow-xs disabled:bg-slate-50 disabled:text-slate-400"
            required 
          /> 
        </div>

        {/* Email Address Registration Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address
          </label>
          <input 
            type="email"
            placeholder="name@company.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
            className="w-full text-sm border border-slate-200 bg-white text-slate-900 placeholder-slate-400 p-3 rounded-xl outline-hidden focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all duration-200 shadow-xs disabled:bg-slate-50 disabled:text-slate-400"
            required 
          /> 
        </div> 

        {/* Password Security Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Secure Account Password
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
            className="w-full text-sm border border-slate-200 bg-white text-slate-900 placeholder-slate-400 p-3 rounded-xl outline-hidden focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all duration-200 shadow-xs disabled:bg-slate-50 disabled:text-slate-400"
            required 
          /> 
        </div> 

        {/* Primary Action Button Registration Trigger */}
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-xs active:scale-[0.99] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
        > 
          {isLoading ? "Creating Security Profile..." : "Register Account"} 
        </button> 

        {/* Alternate Routing Reference Row */}
        <p className="mt-6 text-center text-xs font-medium text-slate-500"> 
          Already have a profile?{" "} 
          <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold tracking-tight transition-colors">
            Login here instead
          </Link> 
        </p> 
      </form> 
    </AuthLayout>
  ); 
}