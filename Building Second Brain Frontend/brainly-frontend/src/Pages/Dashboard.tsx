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
        <div className={`p-4   ${popmsg ? "ml-16" : "ml-72"} min-h-screen  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500`}>
          <CreateContentModal/>       

          <div className='md:flex flex-wrap justify-evenly items-start gap-6  p-2 border-b border-gray-400 '>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Your Brain</h1>
                  <p className="text-black-500 mt-1 text-sm">Organize and discover your knowledge</p>
                </div>
            <div className='flex flex-wrap-reverse gap-4 md:gap-10'>
                  <SearchBox setSearchValue={setSearchData} />
              <Top_left_Corner/>
            </div>
          </div>
          {/* <Button  size="lg" variant="secondary" text="Add Content"/> */}
          <div>
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
          <div   className={`grid gap-10 mt-7 
    ${popmsg ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
  `}>

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


