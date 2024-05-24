import React from "react";
import { Button } from "@/components/ui/button";
import { FaTh, FaList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setGridView } from "@/redux/slice/authSlice";


export const Togglebutton=()=>{
    const isGridView= useSelector(state=>state.auth.isGridView);
    const dispatch= useDispatch();
    return(
        <>
        <Button className="mx-[5px] " onClick={()=>dispatch(setGridView(!(isGridView)))} variant="outline">
                    {isGridView?
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