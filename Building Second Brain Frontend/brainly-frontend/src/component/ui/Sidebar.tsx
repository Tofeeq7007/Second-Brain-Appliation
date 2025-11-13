import { HomeIcon } from "../../icons/HomeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { SidebarItem } from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { revert } from "../../store/features/pop_up";
import type { POP_UP_Button } from "../../store/store";
import { ChevronLeft, ChevronRight, Link, LogOut, Youtube } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface SidebarProps {
  setType: (type: string) => void;
}

export function Sidebar({ setType }: SidebarProps) {
    const navigate = useNavigate();
    const open = useSelector((state: POP_UP_Button) => state.Pop_Up.openPopUP);
    const dispatch = useDispatch();
    const [screenSize, setScreenSize] = useState('');
    // Open is failse -> side bar open
    // Open is true -> side bar close


      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            setScreenSize('mobile');
          } else {
            setScreenSize('desktop');
          }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
        useEffect(() => {
            console.log('Screen size changed to:', screenSize);
            if (screenSize === 'mobile'  && !open) {
                dispatch(revert());
            }
        }, [screenSize]);


    return (
        <div className={`h-screen  flex justify-between flex-col bg-gradient-to-b from-blue-600 via-blue-100 to-gray-300 fixed top-0 left-0 transition-all duration-300  ease-in-out shadow-xl border-r border-gray-200  ${open ? 'w-20' : 'w-72'}`}>
            

            <div className="flex flex-col justify-between">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button 
                        onClick={() => {
                            if(screenSize == 'desktop'){
                                dispatch(revert())
                            }
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
                        title={open ? "Expand" : "Collapse"}
                    >
                        <img 
                            className="w-8 h-8 object-contain" 
                            src="https://cdn.iconscout.com/icon/free/png-256/free-brain-networking-icon-download-in-svg-png-gif-file-formats--connection-control-neural-network-artificial-intelligence-pack-science-technology-icons-6115682.png" 
                            alt="Brainly Logo" 
                        />
                    </button>
                    
                    {!open && (
                        <div className="font-bold text-xl text-gray-800 truncate">
                            Brainly
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => {
                            if(screenSize == 'desktop'){
                                dispatch(revert())
                            }
                    }}
                    className="p-1 hover:bg-gray-200 rounded transition ml-auto flex-shrink-0"
                >
                    {open ? (
                        <ChevronRight size={18} className="text-black-600" />
                    ) : (
                        <ChevronLeft size={18} className="text-black-600" />
                    )}
                </button>
            </div>

            <nav className="pt-6 space-y-2 px-2">
                <div 
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setType("")}
                    title="Home"
                >
                    <SidebarItem 
                        text={open ? "" : "Home"}  
                        icon={<HomeIcon size="" />}
                    />
                </div>

                <div 
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setType("twitter")}
                    title="Twitter"
                >
                    <SidebarItem 
                        text={open ? "" : "Twitter"}  
                        icon={<TwitterIcon size="" />}
                    />
                </div>

                <div 
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setType("youtube")}
                    title="Youtube"
                >
                    <SidebarItem 
                        text={open ? "" : "Youtube"}  
                        icon={<Youtube size="35" />}
                    />
                </div>
                <div 
                    className="cursor-pointer px-1 transition-all duration-200"
                    onClick={() => setType("link")}
                    title="link"
                >
                    <SidebarItem 
                        text={open ? "" : "Link"}  
                        icon={<Link size="30" />}
                    />
                </div>
            </nav>

            </div>
                <div 
                    className="cursor-pointer transition-all duration-200" 
                    onClick={() =>{
                        localStorage.removeItem('token');
                        navigate({to:"/"});
                    }}
                    title="Log out"
                >
                    <div className="flex text-black-600 transition-all bg-red-500 duration-100 rounded hover:bg-red-900  items-center mx-1">
                        <div className="p-2 ml-0 max-w-48 ">

                            <LogOut size="30" />
                        </div>
                        {!open && <div className="p-2  text-md font-roboto font-bold ">Log out</div>}

                    </div>                    
                </div>

            {/* {!open && (
                <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p>© 2025 Brainly</p>
                </div>
            )} */}
        </div>
    );
}