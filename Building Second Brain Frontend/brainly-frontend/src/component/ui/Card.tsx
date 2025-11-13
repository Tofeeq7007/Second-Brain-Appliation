import { CrossIcon } from "../../icons/CrossIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import '../../App.css'
import { PopUp } from "../Popup";
import { useEffect, useState } from "react";
import { Link, Youtube } from 'lucide-react';
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
    
    return <div className="hover:cursor-pointer transition duration-300 sm:w-[400px] md:w-full">
        <PopUp open={popOpen} onclose={()=>setPopup(false)} contentId={_id} />

        <div key={_id} className="bg-black/30  border border-white/10 rounded-xl p-4 hover:bg-black/40 shadow-md hover:shadow-xl  h-full flex flex-col transition-all duration-300">
            
            {/* Header Section */}
            <div className="flex justify-between items-start gap-3 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2  rounded-lg flex-shrink-0">
                        {type=="youtube" && <Youtube size="30"/>}
                        {type=="twitter" && <TwitterIcon size="lg"/>}
                        {type=="link" && <Link size="20"/>}
                    </div>
                    <div className="font-bold text-lg text-black-800 truncate">
                        {title}
                    </div>
                </div>
                
                {/* Action Icons */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition duration-300">
                    <div 
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition duration-300 cursor-pointer transform hover:scale-125 hover:rotate-12"
                        onClick={()=>openSharePopup(link)}
                        title="Share"
                    >
                        <ShareIcon size="lg"/>
                    </div>
                    <div 
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition duration-300 cursor-pointer transform hover:scale-125 hover:-rotate-12"
                        onClick={()=>setPopup(true)}
                        title="Delete"
                    >
                        <CrossIcon size="lg"/>
                    </div>
                </div>
            </div>
            
            {/* Description */}
            {description && (
                <div className="text-black-600 text-sm mb-3 line-clamp-2 group-hover:text-gray-700 transition">
                    {description}
                </div>
            )}
            
            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/30  border border-white/10  p-4 hover:bg-black/40 rounded-xl group-hover:from-purple-50 group-hover:to-gray-100 transition duration-500">
                {type === "youtube" && (
                    <iframe 
                        className="rounded-xl w-full h-full shadow-sm group-hover:shadow-lg transition duration-500 transform group-hover:scale-105" 
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
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300" 
                        onClick={()=>image_to_redirect(link)}  
                        src={image} 
                        alt="Preview not present" 
                    />
                )}
            </div>
        </div>
    </div> 
}