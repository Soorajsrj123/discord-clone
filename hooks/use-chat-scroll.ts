import { useEffect, useState } from "react";

type ChatScrollProps={
    chatRef:React.RefObject<HTMLDivElement>;
    bottomRef:React.RefObject<HTMLDivElement>;
    shouldLoadMore:boolean;
    loadMore:()=>void;
    count:number;

}

export const useChatScroll=({bottomRef,chatRef,count,loadMore,shouldLoadMore}:ChatScrollProps)=>{
      const [hasInitialized,setHasInitilized]=useState(false)

      useEffect(()=>{
           const topDiv=chatRef.current
           const handleScroll=()=>{
            const scrollTop=topDiv?.scrollTop
            if(scrollTop===0&&shouldLoadMore){
                loadMore()
            };
           };
           topDiv?.addEventListener("scroll",handleScroll)

           return ()=>{
            topDiv?.removeEventListener("scroll",handleScroll)
           }
      },[shouldLoadMore,loadMore,chatRef])

      useEffect(()=>{
        const bottomDiv=bottomRef.current;
        const topDiv=chatRef.current;
        const shouldAutoSroll=()=>{
            if(!hasInitialized&&bottomDiv){
                setHasInitilized(true)
                return true
            }

            if(!topDiv){
                return false
            }

            const distanceFromBottom=topDiv.scrollHeight-topDiv.scrollTop-topDiv.clientHeight
            return distanceFromBottom<=100
        }
       if(shouldAutoSroll()){
        setTimeout(()=>{
            bottomRef.current?.scrollIntoView({
                behavior:"smooth"
            })
        },100)
       }
      },[bottomRef,chatRef,count,hasInitialized])
}