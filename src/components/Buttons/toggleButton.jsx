import React from "react";
import { Button } from "@/components/ui/button";
import { FaTh, FaList } from "react-icons/fa";

export const Togglebutton=({isGridView, setIsGridView})=>{
    const toggleView = () => {
        setIsGridView((prev) => !prev);
        };

    return(
        <>
        <Button className="mx-[5px] " onClick={toggleView} variant="outline">
                    {isGridView ?
                    <div className="flex flex-row gap-x-1 items-center ">
                        <FaList className="m-[2px]"size={12} />
                        <FaTh className="m-[2px]"size={22} />
                    </div> :
                    <div className="flex flex-row gap-x-1 items-center">
                        <FaList className="m-[2px]" size={22} />
                        <FaTh className="m-[2px]" size={12} />
                    </div>}
                </Button>
        </>
    )
}