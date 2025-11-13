import { useRef } from "react";
import { Button } from "./ui/Button"
import { deleteContent } from "../api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface POPUP{
    open:boolean,
    onclose:(type:boolean)=>void,
    contentId:string,
}
export const PopUp = ({open,onclose,contentId}:POPUP)=>{
    const ref = useRef<HTMLDivElement>(null);
    
    function solve(e:React.MouseEvent<HTMLDivElement>) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            onclose(false);
        }
    }  
    async function removeContent(contentId:string){
        const id = localStorage.getItem('token');
        if(id != undefined){

            // await deleteContent(contentId);
            deleteContentMutation.mutate(contentId)
            // location.reload()  ;
        }

    }   
    const queryClient = useQueryClient();
    
    const deleteContentMutation = useMutation({
        mutationFn: (contentId:string)=>{
            return deleteContent(contentId);
        },
        
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['content']});
            alert(data.message);
            onclose(false);
        }
    })
    return <>
    { open && 
        <div>

            <div onClick={(e)=>solve(e)} className={`w-screen h-screen bg-slate-600 opacity-60  fixed top-0 left-0  flex justify-center`}></div>

            <div onClick={(e)=>solve(e)} className={`w-screen h-screen fixed top-0 left-0  flex items-center justify-center`}>
                <div ref={ref} className=" p-4   rounded-md bg-white flex justify-between items-center">
                    <div>

                    <div className="">Are you Sure want to delete Permanantly ?</div>
                    <div className="flex justify-center gap-10 pt-4 items-center">
                            <Button onClick={()=>onclose(false)} variant="primary" text="No" size="md"/>
                            <Button variant="primary" onClick={()=>removeContent(contentId)} text="Yes" size="md"/>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    }
    </>
}