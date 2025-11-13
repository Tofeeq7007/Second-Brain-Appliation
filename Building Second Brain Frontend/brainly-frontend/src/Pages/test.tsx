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
};// import { Card, type CardProps } from '../component/ui/Card'
// import { CreateContentModal } from '../component/ui/CreateContentModal'
// import { useState } from 'react'
// import { Sidebar } from '../component/ui/Sidebar'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { GetContent } from '../api/user.api'
// import type { POP_UP_Button } from '../store/store'
// import SearchBox from '../component/Search'
// import { Top_left_Corner } from '../component/Dashboard_Top_left'
// import { useSelector } from 'react-redux'
// import {  FolderOpen } from 'lucide-react'

// export interface ContentItem {
//   _id: string;
//   title: string;
//   description?: string;
//   image?: string;
//   link: string;
//   type: string;
//   tags: string;
//   userId: {
//     _id: string;
//     name: string;
//   };
//   __v: number;
// }

// interface ApiResponse {
//   content: ContentItem[];
// }

// export function Dashboard() {
//   const [currType, setType] = useState("");
//   const token = localStorage.getItem('token');
  
//   const { data, isLoading } = useQuery<ApiResponse>({
//     queryKey: ["content"],
//     queryFn: async () => await GetContent(token as string),
//     placeholderData: keepPreviousData,
//     staleTime: 10000,
//     enabled: !!token 
//   });

//   const [searchData, setSearchData] = useState("");
//   const popmsg = useSelector((state: POP_UP_Button) => state.Pop_Up.openPopUP);

//   // Filter content based on search and type
//   const filteredContent = data?.content?.filter((item: ContentItem) => {
//     const matchesSearch = !searchData || item._id === searchData;
//     const matchesType = !currType || item.type === currType;
//     return matchesSearch && matchesType;
//   }) || [];

//   const hasContent = filteredContent.length > 0;
    
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar setType={setType} />
      
//       <div className={`flex-1 overflow-hidden transition-all duration-300 ${popmsg ? "ml-20" : "ml-72"}`}>
//         <CreateContentModal />

//         {/* Main Content Area */}
//         <div className="h-screen overflow-y-auto">
//           {/* Header Section */}
//           <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//             <div className="p-6 space-y-4">
//               <div className="flex justify-between items-start gap-6 flex-wrap">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">Your Brain</h1>
//                   <p className="text-gray-500 mt-1 text-sm">Organize and discover your knowledge</p>
//                 </div>
                
//                 <div className="flex gap-4 flex-wrap">
//                   <SearchBox setSearchValue={setSearchData} />
//                   <Top_left_Corner />
//                 </div>
//               </div>

//               {/* Type Filter Indicator */}
//               {currType && (
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="text-gray-600">Viewing:</span>
//                   <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium capitalize">
//                     {currType}
//                   </span>
//                   <button 
//                     onClick={() => setType("")}
//                     className="text-purple-600 hover:text-purple-700 font-medium ml-2 transition"
//                   >
//                     Clear filter
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="p-6">
//             {isLoading ? (
//               // Loading State
//               <div className="flex justify-center items-center min-h-[60vh]">
//                 <div className="flex flex-col items-center gap-4">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//                   <p className="text-gray-600 font-medium">Loading your notes...</p>
//                 </div>
//               </div>
//             ) : hasContent ? (
//               // Content Grid - Dynamic Layout
//               <div className={`grid gap-6 transition-all duration-300 ${
//                 popmsg 
//                   ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
//                   : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
//               }`}>
//                 {filteredContent.map((item: ContentItem) => {
//                   const { _id, type, link, title, description, image }: CardProps = item;
//                   return (
//                     <div key={_id} className="h-full">
//                       <Card 
//                         _id={_id}
//                         type={type} 
//                         link={link} 
//                         title={title} 
//                         description={description}
//                         image={image}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               // Empty State
//               <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
//                 <div className="p-6 bg-purple-50 rounded-full">
//                   <FolderOpen size={48} className="text-purple-600" />
//                 </div>
//                 <div className="text-center">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-2">No Notes Yet</h2>
//                   <p className="text-gray-500 mb-6">
//                     {searchData 
//                       ? "No notes matching your search" 
//                       : currType 
//                       ? `No ${currType} content available` 
//                       : "Start by adding your first note"}
//                   </p>
//                   {(searchData || currType) && (
//                     <button 
//                       onClick={() => {
//                         setSearchData("");
//                         setType("");
//                       }}
//                       className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
//                     >
//                       Clear Filters
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { Card, type CardProps } from '../component/ui/Card'
import { CreateContentModal } from '../component/ui/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from '../component/ui/Sidebar'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GetContent } from '../api/user.api'
import type { POP_UP_Button } from '../store/store'
import SearchBox from '../component/Search'
import { Top_left_Corner } from '../component/Dashboard_Top_left'
import { useSelector } from 'react-redux'

export interface ContentItem {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  link: string;
  type: string;
  tags: string;
  userId: {
    _id: string;
    name: string;
  };
  __v: number;
}
interface ApiResponse {
  content: ContentItem[];
}

export function Dashboard() {
  // const [count, setCount] = useState(0)
  const [currType, setType] = useState("");
  const token = localStorage.getItem('token');
  
  const {data } = useQuery<ApiResponse>({
    queryKey:["content"],
    queryFn: async()=> await GetContent(token as string),
    placeholderData:keepPreviousData,
    staleTime:10000,
    enabled:!!token 
  })
  const [searchData,setSearchData] = useState("");
  const popmsg = useSelector((state:POP_UP_Button)=>state.Pop_Up.openPopUP);
      
    
  return (
      <div>
        <Sidebar setType={setType}/>
        <div className={`p-4   ${popmsg ? "ml-16" : "ml-72"} min-h-screen bg-gray-100 border-gray-300 border-2 `}>
          <CreateContentModal/>       

          <div className='flex justify-between items-center flex-wrap'>
            <div className='text-2xl font-bold font-roboto'>All Notes</div>
            <div className='flex gap-10'>
                  <SearchBox setSearchValue={setSearchData} />
              <Top_left_Corner/>
            </div>
          </div>
          {/* <Button  size="lg" variant="secondary" text="Add Content"/> */}
          <div className='w-1/3'>
            {data?.content?.map((item:ContentItem)=>{
              const {_id, type , link, title,description,image}:CardProps = item;
              if(_id === searchData)
                return (
                  <Card 
                    _id={_id}
                    type={type} 
                    link={link} 
                    title={title} 
                    description={description}
                    image={image}
                  />
                );  
            })}            
          </div>

      {!data?.content.length && (
        <div className="flex justify-center items-center min-h-[70vh]">
          <h1 className="text-2xl font-semibold">No Data Found!</h1>
        </div>
      )}
          <div className={`grid  ${popmsg ? 'grid-cols-4' : 'grid-cols-3'} gap-10 mt-7`}>

            {data?.content?.map((item:ContentItem)=>{
              const {_id, type , link, title,description,image}:CardProps = item;
              if(currType=="")
                return (
                  <Card 
                    _id={_id}
                    type={type} 
                    link={link} 
                    title={title} 
                    description={description}
                    image={image}
                  />
                );  
                else if(type==currType)
                  return (
                    <Card 
                      _id={_id}
                      type={type} 
                      link={link} 
                      title={title} 
                      description={description}
                      image={image}
                    />
                  );  
            })}
            {/* <Card type="twitter" link="https://x.com/kirat_tw/status/1929805164963061811" title="GAME Over"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/> */}
          </div>
        </div>
      </div>
  )
}

export default Dashboard