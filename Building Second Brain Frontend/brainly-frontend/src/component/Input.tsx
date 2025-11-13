// type InputProps = {
//     type?:string
//   placeholder: string;
//   onChange?: (value: string) => void,
//   ref?:React.Ref<HTMLInputElement>;
  
// };
// export function Input({placeholder,onChange,type,ref} : InputProps){
//     return (
//     <div>
//         <input 
//             ref={ref}
//             type={type ? type : "text"} 
//             placeholder={placeholder} 
//             onChange={onChange ? (e)=>onChange(e.target.value) : ()=>{}} 
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//         />
//     </div>
//     )
// }

type InputProps = {
    type?: string;
    placeholder: string;
    onChange?: (value: string) => void;
    ref?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
};

export function Input({ placeholder, onChange, type, ref, disabled }: InputProps) {

    return (
        <div className="relative group">
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
                className="w-full px-4 py-3 bg-white/5 border text-black border-gray-300 rounded-lg  placeholder-white/40 focus:outline-none  focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            {/* {isPasswordField && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80 transition disabled:cursor-not-allowed"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            )} */}
        </div>
    );
}