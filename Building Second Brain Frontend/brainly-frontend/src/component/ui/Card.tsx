import { CrossIcon } from "../../icons/CrossIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import '../../App.css'
// import { deleteContent } from "../../api/user.api";
import { PopUp } from "../Popup";
import { useState } from "react";
export interface CardProps{
    _id:string,
    title:string,
    link:string,
    type:"twitter" | "youtube" | string,
    description?:string,
    image?:string, 
}
export function Card({_id , title,link, type,description,image}:CardProps){
    const [popOpen , setPopup] = useState(false);


    const getYouTubeEmbedLink = (url: string) => {
    // A regular expression to find the video ID
    const videoIdMatch = url.match(/(?:\/|%3D|v=)([a-zA-Z0-9_-]{11})(?:&|\?|#|$)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };
    const embedLink = type === "youtube" ? getYouTubeEmbedLink(link) : '';

    

    function image_to_redirect(url:string){
        window.open(url , '_blank');
    }

    async function openSharePopup(link:string) {

        // check if Web Share API is support on your browser (share pop support karta hai ya nahi)

        await navigator.share({url:link})
        console.log("Content Share Successfully");
    }
    
    return <div className="hover:cursor-pointer transition hover:scale-1.1 w-full">
        <PopUp open={popOpen} onclose={()=>setPopup(false)} contentId={_id} />
          {/* <PopUp open={popOpen} onclose={setPopup}/>    */}

        <div key={_id} className="p-4  bg-white  rounded-md shadow-[1px_4px_18px_3px_rgba(0,_0,_0,_0.1)] outline-slate-200 h-full flex flex-col">
            <div className="flex justify-between ">
                <div className="flex items-center">
                    <div  className="flex gap-3 justify-center items-center text-gray-500">
                        {type=="youtube" && <YoutubeIcon size=""/>}
                        {type=="twitter" && <TwitterIcon size="lg"/>}
                    <div className="font-bold text-2xl  font-roboto  text-black">
                        {title}
                    </div>
                    </div>
                </div>
                <div className="flex items-center">
                        <div className="pr-2 text-gray-500" onClick={()=>openSharePopup(link)}>
                            <ShareIcon size="lg"/>
                        </div>
                    <div className="text-gray-500"onClick={()=>setPopup(true)}>
                        <CrossIcon size="lg"/>
                    </div>
                </div>
            </div>
                <div className="pt-2 font-roboto">{description}</div>
            <div className="flex justify-between h-full  pt-2 w-full">
            
                {type === "youtube" && <iframe className="rounded-lg   " src={embedLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

                {/* .................................... */}
                {type==="twitter" && <blockquote className="twitter-tweet ">
                    <a href={link.replace("x.com", "twitter.com")}>
                    </a>
                </blockquote> }
                {type != "youtube" && type != "twitter"  && (
                    <img className="" onClick={()=>image_to_redirect(link)}  src={image} alt="Preview not present" />
                )}

            </div>
        </div>
    </div> 
}








// import { CrossIcon } from "../../icons/CrossIcon";
// import { ShareIcon } from "../../icons/ShareIcon";
// import { TwitterIcon } from "../../icons/TwitterIcon";
// import { YoutubeIcon } from "../../icons/YoutubeIcon";
// import '../../App.css'
// import { deleteContent } from "../../api/user.api";
// export interface CardProps{
//     _id:string,
//     title:string,
//     link:string,
//     type:"twitter" | "youtube" | string,
//     description?:string,
//     image?:string, 
// }
// export function Card({_id , title,link, type,description,image}:CardProps){

//       const getYouTubeEmbedLink = (url: string) => {
//     // A regular expression to find the video ID
//     const videoIdMatch = url.match(/(?:\/|%3D|v=)([a-zA-Z0-9_-]{11})(?:&|\?|#|$)/);
//     const videoId = videoIdMatch ? videoIdMatch[1] : null;
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
//   };
//     const embedLink = type === "youtube" ? getYouTubeEmbedLink(link) : '';

    
//     async function removeContent(contentId:string){
//         const id = localStorage.getItem('token');
//         if(id != undefined){

//             await deleteContent(id,contentId);
//             location.reload()  ;
//         }

//     }

//     function image_to_redirect(url:string){
//         window.open(url , '_blank');
//     }

//     async function openSharePopup(link:string) {

//         // check if Web Share API is support on your browser (share pop support karta hai ya nahi)

//         await navigator.share({url:link})
//         console.log("Content Share Successfully");
        
        
//     }
    
//     return <div className="m-1 hover:cursor-pointer hover:scale-[1.1] transition duration-400">
//         <div key={_id} className="p-4 block bg-white  rounded-md shadow-[1px_4px_18px_3px_rgba(0,_0,_0,_0.1)] outline-slate-200 min-w-80
//         max-w-72 
//         min-h-48">
//             <div className="flex justify-between ">
//                 <div className="flex items-center">
//                     <div  className="flex gap-3 justify-center items-center text-gray-500">
//                         {type=="youtube" && <YoutubeIcon size=""/>}
//                         {type=="twitter" && <TwitterIcon size="lg"/>}
//                     <div className="font-bold text-2xl  font-roboto  text-black">
//                         {title}
//                     </div>
//                     </div>
//                 </div>
//                 <div className="flex items-center">
//                         <div className="pr-2 text-gray-500" onClick={()=>openSharePopup(link)}>
//                             <ShareIcon size="lg"/>
//                         </div>
//                     <div className="text-gray-500   " onClick={()=>removeContent(_id)}>
//                         <CrossIcon size="lg"/>
//                     </div>
//                 </div>
//             </div>
//                 <div className="pt-2 font-roboto">{description}</div>
//             <div className="flex justify-between h-full  pt-2 w-full">
//             <br />
//                 {type === "youtube" && <iframe className="rounded-lg p-1  block w-full h-full" src={embedLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

//                 {/* .................................... */}
//                 {type==="twitter" && <blockquote className="twitter-tweet ">
//                     <a href={link.replace("x.com", "twitter.com")}>
//                     </a>
//                 </blockquote> }
//                 {type != "youtube" && type != "twitter"  && (
//                     <img className="size-[86%]" onClick={()=>image_to_redirect(link)}  src={image} alt="Preview not present" />
//                 )}

//             </div>
//         </div>
//     </div> 
// }