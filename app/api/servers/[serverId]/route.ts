import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// ROUTE FOR EDIT SERVER
export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}

    ){
      try {
        const profile=await currentProfile()
        const {name,imageUrl}=await req.json()

        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }
        // finding server using server id  and profile to change the data with req.body data
        const server=await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id
            },
            data:{
                name,
                imageUrl
            }
        })
    
       return NextResponse.json(server)

      } catch (error) {
        console.log("SERVER_ID_PATCH",error);
        return new NextResponse('internal Error',{status:500})
      }
    
}

// ROUTE FOR DELETING THE SERVER

export async function DELETE(
    req:Request,
    {params}:{params:{serverId:string}}
    ){

        try {
            const profile=await currentProfile()

            if(!profile){
                return new NextResponse("Unauthorized",{status:401})
            }
    const server=await db.server.delete({
        where:{
        id:params.serverId,
        profileId:profile.id
       }
    })
      return NextResponse.json(server)
        
} catch (error) {
            console.log("SERVER_DELETE",error);
            return new NextResponse('Internal Error',{status:500})
            
        }
}