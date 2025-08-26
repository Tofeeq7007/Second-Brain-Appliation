import { useDispatch } from "react-redux"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./ui/Button"
import { Open } from "../store/features/ModalSlice"
import { useNavigate } from "@tanstack/react-router"

export const Top_left_Corner = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return <div className=" flex gap-4 max-md:flex-col">
        
          <Button onClick={()=>{navigate({to:'/testPage'})}} startIcon={<ShareIcon size="md"/>} size="sm" variant="primary" text="Share Brain"/>
                <Button  startIcon={<PlusIcon size="lg"/>} onClick={()=>{dispatch(Open())}} size="md" variant="secondary" text="Add Content"/>
    </div>
}