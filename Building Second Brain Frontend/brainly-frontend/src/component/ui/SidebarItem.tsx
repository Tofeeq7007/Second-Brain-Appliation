import type { ReactElement } from "react"


interface Bar {
    text: string,
    icon: ReactElement
}
export function SidebarItem({text,icon}:Bar){
    return <div className="flex text-gray-600 transition-all duration-100 rounded hover:bg-gray-300 gap-1 items-center mx-1">
        <div className="p-2 ml-0 max-w-48 ">

            {icon}
        </div>
        <div className="p-2 text-md font-roboto ">{text}</div>

    </div>
}