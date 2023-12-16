import { useEffect, useState } from "react"

// A SIMPLE HOOK USED FOR RETUN ORIGIN VALUE
export const useOrigin=()=>{
    const [mounted,setMounted]=useState(false)

    useEffect(()=>{
       setMounted(true);
    },[])

    // Confirming the window object is not undefined
    const origin=typeof window!=="undefined"&& window.location.origin? window.location.origin :"";

    if(!mounted){
        return ""
    }


    return origin
}