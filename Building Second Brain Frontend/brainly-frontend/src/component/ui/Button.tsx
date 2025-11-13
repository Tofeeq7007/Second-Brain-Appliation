// import type { ReactElement } from "react"

// type Variants = "primary" | "secondary"
// interface ButtonProps {
//     variant:Variants,
//     size:"sm" | "md" | "lg",
//     text:string,
//     startIcon? : ReactElement ,
//     endIcon? : ReactElement ,
//     onClick?:()=> void ,
//     fullwidth?:boolean,
//     loading?:boolean,
// }
// const variantStyles : Record<Variants,string> ={
//     "primary": "bg-whitits-100 text-purple-300 ",
//     "secondary":" bg-purple-600 text-white"
// };
// const sizeStyles = {
//     "sm":"py-1 px-2",
//     "md":"py-2 px-4",
//     "lg":"py-4 py-6",
// }
// const defaultStyles = "rounded-md  cursor-pointer flex items-center transition active:scale-110" + "  disabled:cursor-not-allowed disabled:scale-100";


// export const Button = (props:ButtonProps)=>{
//     return <>
//         <button disabled={props.loading ? true : false}  onClick={props.onClick ? props.onClick : ()=>{}} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullwidth ? "w-full flex justify-center items-center " : ""}`}>
//             {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.loading==true ? "Loading...":props.text} {props.endIcon}
//         </button>
//     </>
// }  

import type { ReactElement } from "react"
import { Loader2 } from "lucide-react"

type Variants = "primary" | "secondary"

interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}

const variantStyles: Record<Variants, string> = {
    "primary": "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-500/50",
    "secondary": "bg-white/10 hover:bg-white/20 text-white border border-white/20"
};

const sizeStyles = {
    "sm": "py-2 px-3 text-sm",
    "md": "py-3 px-6 text-base",
    "lg": "py-4 px-8 text-lg",
};

const defaultStyles = "rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100";

export const Button = (props: ButtonProps) => {
    return (
        <button
            disabled={props.loading}
            onClick={props.onClick}
            className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullwidth ? "w-full" : ""}`}
        >
            {props.startIcon && <div className="flex-shrink-0">{props.startIcon}</div>}
            
            <span className="flex items-center gap-2">
                {props.loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Loading...</span>
                    </>
                ) : (
                    props.text
                )}
            </span>
            
            {props.endIcon && <div className="flex-shrink-0">{props.endIcon}</div>}
        </button>
    );
};