// import { isAxiosError } from "axios";
// import { useNavigate } from "@tanstack/react-router";
// import { Input } from "../component/Input";
// import { Button } from "../component/ui/Button";
// import { useRef, useState } from "react";
// import { SignupFunction } from "../api/user.api";

// export function Signup(){
//     const navigate = useNavigate();
//     const usernameRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const confirmPasswordRef = useRef<HTMLInputElement>(null);
//     const [error,setError] = useState("");
//     const [loading,setLoading] = useState(false);
//     const handleSignin = async() =>{
//         const username = usernameRef.current?.value || "";
//         const password = passwordRef.current?.value || "";
//         const confirm = confirmPasswordRef.current?.value || "";
//         if(password !== confirm){
//             setError("Passwords do not match");
//             return;
//         }
//         try{
//             setError("")
//             setLoading(true);
//             if(username.trim() != "" && password.trim() != ""){
//                 const data = await SignupFunction({username,password});
                
//                 console.log(data);

//                 setLoading(false);
//                 navigate({to:'/'})
                
                
//             }
//             else{
//                 setError("Username and password cannot be empty.");
//             }

//         }
//         catch(e){
//             setLoading(false)
//             if (isAxiosError(e)) {
//                 // Now TypeScript knows `e` is an AxiosError.
//                 // You can safely access `e.response`.
//                 if (e.response && e.response.data && e.response.data.Error_Detail) {
                    
//                     setError(e.response.data.Error_Detail.password || e.response.data.Error_Detail.name);                    
//                 }
//                 else {
//                     setError("An unexpected API error occurred.");
//                 }
//             } else {
//                 // Handle non-Axios errors (e.g., network errors, coding mistakes)
//                 setError("An unexpected error occurred. Please try again.");
//                 console.error("An unexpected error:", e);
//             }
//         }
//     }

//     return (
        
//         <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
//             <div className="mb-8 text-center">
//                 <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
//                 <p className="text-gray-600">Sigup to Brainly App</p>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-10   min-w-72 md:min-w-96">
//                 <div className="space-y-6">
//                {error &&  <div className="bg-red-300 text-lg text-center font-roboto w-96 rounded-md">{error}</div>}
//                     <Input placeholder="Username" ref={usernameRef} />
//                     <Input placeholder="Password" type="password" ref={passwordRef}/>
//                     <Input placeholder="Password" type="password" ref={confirmPasswordRef}/>
//                 </div>
//                 <div className="flex flex-col items-center pt-6">
//                     <Button variant="secondary" text="Signup" size="md" fullwidth={true} loading={loading} onClick={handleSignin}/>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { isAxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import { useRef, useState } from "react";
import { SignupFunction } from "../api/user.api";
import { AlertCircle } from "lucide-react";

export function Signup(){
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSignin = async() => {
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const confirm = confirmPasswordRef.current?.value || "";
        
        if(password !== confirm){
            setError("Passwords do not match");
            return;
        }
        
        try{
            setError("")
            setLoading(true);
            if(username.trim() != "" && password.trim() != ""){
                const data = await SignupFunction({username, password});
                console.log(data);
                setLoading(false);
                navigate({to:'/'})
            }
            else{
                setError("Username and password cannot be empty.");
            }
        }
        catch(e){
            setLoading(false)
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.Error_Detail) {
                    setError(e.response.data.Error_Detail.password || e.response.data.Error_Detail.name);                    
                }
                else {
                    setError("An unexpected API error occurred.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("An unexpected error:", e);
            }
        }
    }

    return (
        <div className="min-h-screen w-full bg-gray-950 flex flex-col justify-center items-center p-4">
            <div className="mb-12 text-center">
                <div className="mb-4 flex justify-center">
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-purple-200 text-lg">Create your Brainly account to get started</p>
            </div>

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-5">
                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}
                    
                    <Input 
                        placeholder="Username" 
                        ref={usernameRef}
                        disabled={loading}
                    />
                    
                    <Input 
                        placeholder="Password" 
                        type="password" 
                        ref={passwordRef}
                        disabled={loading}
                    />
                    
                    <Input 
                        placeholder="Confirm Password" 
                        type="password" 
                        ref={confirmPasswordRef}
                        disabled={loading}
                    />
                </div>

                <div className="mt-8">
                    <Button 
                        variant="primary" 
                        text="Create Account" 
                        size="md" 
                        fullwidth={true} 
                        loading={loading} 
                        onClick={handleSignin}
                    />
                </div>

                <p className="text-center text-purple-200 text-sm mt-6">
                    Already have an account? 
                    <span onClick={() => navigate({to: "/"})} className="text-purple-300 cursor-pointer underline underline-offset-4 hover:text-purple-200 font-semibold ml-1 transition">
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    )
}