import { axiosInstance } from "../services/api"


interface user{
    username:string,
    password:string
}
export async function SigninFunction ({username, password}:user){
    const res = await axiosInstance.post('/signin' ,{
        name:username,
        password:password
    })
    return res.data;
}
export async function SignupFunction ({username, password}:user){
    const res = await axiosInstance.post('/signup' ,{
        name:username,
        password:password
    })
    return res.data;
}
export async function CheckAuth(id: string) {
    console.log(id);

    const res = await axiosInstance.post(
        '/check',
        {},
        {
            headers: {
                Authorization: id // 👈 correctly sends as HTTP header
            }
        }
    );

    return res.data;
}
export async function GetContent(id: string) {

    const res = await axiosInstance.get(
        '/content',
        {
            headers: {
                Authorization: id // 👈 correctly sends as HTTP header
            }
        }
    );
    
    return res.data;
}
export async function deleteContent(contentId:string) {

    const res = await axiosInstance.delete(
        '/content',
        {
            data:{
                contentId:contentId
            },
            headers: {
                Authorization: localStorage.getItem('token') // 👈 correctly sends as HTTP header
            }
        }
    );
    
    return res.data;
}

interface content_object{
    title:string,
    link:string,
    type:string,
    tag:string,
}
export async function PostContent(id:string,{title,link,type,tag}:content_object) {

    const res = await axiosInstance.post(
        '/content',
        {
            title,
            link,
            type,
            tag
        },
        {
            headers: {
                Authorization: id // 👈 correctly sends as HTTP header
            }
        }
    );

    return res.data;
}

export async function SearchContent(value:string){
    const res =  await axiosInstance.get(`/autocomplete?q=${value}`)
    return res.data;
}