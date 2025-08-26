import { HomeIcon } from "../../icons/HomeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { revert } from "../../store/features/pop_up";
import type { POP_UP_Button } from "../../store/store";

interface SidebarProps {
  setType: (type: string) => void;
}


export function Sidebar({ setType }: SidebarProps) {
    
    const open = useSelector((state:POP_UP_Button)=>state.Pop_Up.openPopUP);
    const dispatch = useDispatch();
    return <div
    className="">
        
    <div className={`h-screen bg-white fixed top-0 left-0 pl-2 ${open ? 'w-18' : 'w-72'}`}>  <div className="flex font-roboto text-3xl pt-4  pl-2 items-center gap-4">
        <img onClick={()=>dispatch(revert())} className="w-10 h-8 md:h-10 flex-shrink-0  cursor-pointer" src="https://cdn.iconscout.com/icon/free/png-256/free-brain-networking-icon-download-in-svg-png-gif-file-formats--connection-control-neural-network-artificial-intelligence-pack-science-technology-icons-6115682.png" alt="" />
        <div className={`${open ? 'hidden' : 'block'} cursor-pointer truncate`}>

            Brainly
        </div>
        </div> 
        <div className="pt-6">
            <div className="cursor-pointer" onClick={()=>setType("")}><SidebarItem text={`${open ? "" :"Home"}`}  icon={<HomeIcon size=""/>}/></div> 
            <div className="cursor-pointer" onClick={()=>setType("twitter")}><SidebarItem text={`${open ? "" :"Twitter"}`}  icon={<TwitterIcon size=""/>}/></div>
            <div className="cursor-pointer" onClick={()=>setType("youtube")}><SidebarItem text={`${open ? "" :"Youtube"}`}  icon={<YoutubeIcon size=""/>}/></div> 
        </div>
        </div>
    </div>
}