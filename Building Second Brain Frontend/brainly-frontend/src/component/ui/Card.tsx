import { CrossIcon } from "../../icons/CrossIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import '../../App.css'
import { PopUp } from "../Popup";
import { useEffect, useState } from "react";
import { Link, Twitter, Youtube } from 'lucide-react';
export interface CardProps{
    _id:string,
    title:string,
    link:string,
    type:"twitter" | "youtube" | string,
    description?:string,
    image?:string, 
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function Card({_id , title,link, type,description,image}:CardProps){
    const [popOpen , setPopup] = useState(false);

    const getYouTubeEmbedLink = (url: string) => {
        const videoIdMatch = url.match(/(?:\/|%3D|v=)([a-zA-Z0-9_-]{11})(?:&|\?|#|$)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };
    
    const embedLink = type === "youtube" ? getYouTubeEmbedLink(link) : '';
    
    useEffect(() => {
        if (type === "twitter" && window.twttr?.widgets) {
            window.twttr.widgets.load();
        }
    }, [type, link]);
    
    function image_to_redirect(url:string){
        window.open(url , '_blank');
    }

    async function openSharePopup(link:string) {
        try {
            await navigator.share({url:link})
            console.log("Content Share Successfully");
        } catch (err) {
            console.log("Share failed or cancelled");
        }
    }
    
    return <div className="m-1 hover:cursor-pointer transition duration-300 sm:w-[400px] md:w-full">
        <PopUp open={popOpen} onclose={()=>setPopup(false)} contentId={_id} />

        <div key={_id} className="bg-black/30  border border-white/10 rounded-xl p-4 hover:bg-black/40 shadow-md hover:shadow-xl  h-full flex flex-col transition-all duration-300">
            
            {/* Header Section */}
            <div className="flex justify-between items-start gap-3 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2  rounded-lg flex-shrink-0">
                        {type=="youtube" && <Youtube className="text-gray-100"  size="30"/>}
                        {type=="twitter" && <Twitter className="text-gray-100" size="25"/>}
                        {type=="link" && <Link className="text-gray-100" size="20"/>}
                    </div>
                    <div className="font-bold text-lg text-gray-100 truncate">
                        {title}
                    </div>
                </div>
                
                {/* Action Icons */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition duration-300">
                    <div 
                        className="p-2 text-gray-300 hover:text-purple-100 hover:bg-purple-600 rounded-lg transition duration-300 cursor-pointer transform hover:scale-125 hover:rotate-12"
                        onClick={()=>openSharePopup(link)}
                        title="Share"
                    >
                        <ShareIcon size="lg"/>
                    </div>
                    <div 
                        className="p-2 text-gray-300 hover:text-red-100 hover:bg-red-600/80 rounded-lg transition duration-300 cursor-pointer transform hover:scale-125 hover:-rotate-12"
                        onClick={()=>setPopup(true)}
                        title="Delete"
                    >
                        <CrossIcon size="lg"/>
                    </div>
                </div>
            </div>
            
            {/* Description */}
            {description && (
                <div className="text-gray-300 text-sm mb-3 line-clamp-2 group-hover:text-gray-700 transition">
                    {description}
                </div>
            )}
            
            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/30  border border-white/10  p-2 hover:bg-black/40 rounded-xl group-hover:from-purple-50 group-hover:to-gray-100 transition duration-500">
                {type === "youtube" && (
                    <iframe 
                        className=" w-full h-full shadow-sm group-hover:shadow-lg transition duration-500 transform group-hover:scale-105" 
                        src={embedLink} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    />
                )}

                {type === "twitter" && (
                    <blockquote className="twitter-tweet w-full h-full">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                )}
                
                {type != "youtube" && type != "twitter" && (
                    <img 
                        className="w-full h-full object-contain  cursor-pointer hover:scale-102 transition-transform duration-300" 
                        onClick={()=>image_to_redirect(link)}  
                        src={image} 
                        alt="Preview not present" 
                    />
                )}
            </div>
        </div>
    </div> 
}