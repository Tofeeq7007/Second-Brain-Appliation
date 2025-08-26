import type { ReactElement } from "react"

type Variants = "primary" | "secondary"
interface ButtonProps {
    variant:Variants,
    size:"sm" | "md" | "lg",
    text:string,
    startIcon? : ReactElement ,
    endIcon? : ReactElement ,
    onClick?:()=> void ,
    fullwidth?:boolean,
    loading?:boolean,
}
const variantStyles : Record<Variants,string> ={
    "primary": "bg-whitits-100 text-purple-300 ",
    "secondary":" bg-purple-600 text-white"
};
const sizeStyles = {
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 py-6",
}
const defaultStyles = "rounded-md  cursor-pointer flex items-center transition active:scale-110" + "  disabled:cursor-not-allowed disabled:scale-100";


export const Button = (props:ButtonProps)=>{
    return <>
        <button disabled={props.loading ? true : false}  onClick={props.onClick ? props.onClick : ()=>{}} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullwidth ? "w-full flex justify-center items-center " : ""}`}>
            {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.loading==true ? "Loading...":props.text} {props.endIcon}
        </button>
    </>
}  
