import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

 
 export async function PATCH(
    req:Request,
    {params}:{params:{memberId:string}}
    ){
        try {
            const profile=await currentProfile()
         // creating a new URL constructor to get searchparams from URL
        const {searchParams}=new URL(req.url)
        const {role} = await req.json()
        const serverId=searchParams.get("serverId")
        
        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }
       if(!serverId){
        return new NextResponse("Server ID Missing",{status:400})
       }
       if(!params.memberId){
        return new NextResponse("Member IDMissing",{status:400})
       }

    //    finding the Member and change the role of the member with given data
       const server=await db.server.update({
        where:{
           id:serverId,
           profileId:profile.id
        },
        data:{
           Members:{
            update:{
                where:{
                    id:params.memberId,
                    profileId:{
                        not:profile.id
                    }
                    
                },
                data:{
                    role
                }
            }
           }
        },
        include:{
            Members:{
                include:{
                    profile:true,
                },
                orderBy:{
                    role:"asc"
                }
            }
        }
       })

       return NextResponse.json(server)

      } catch (error) {
        console.log(error,"MEMBER_ID_PATCH");
        return new NextResponse('Internal Error',{status:500})
        
      }
 }

 export async function DELETE(
    req:Request,
    {params}:{params:{memberId:string}}
    ){
        
    try {
    const profile=await currentProfile()
    const {searchParams}= new URL(req.url)
    const serverId=searchParams.get("serverId")

    if(!profile){
        return new NextResponse("Unauthorized",{status:401})
    }

    if(!serverId){
        return new NextResponse("Server ID Missing",{status:400})
    }

    if(!params.memberId){
        return new NextResponse("Member ID Missing",{status:400})
       }

       const server=await db.server.update({
        where:{
            id:serverId,
            profileId:profile.id,
        },
        data:{
            Members:{
                deleteMany:{
                    id:params.memberId,
                    profileId:{
                        not:profile.id
                    }
                }
            }
        },
        include:{
            Members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:'asc'
                }
            },
        },
       })

       return NextResponse.json(server)
       
    }catch (error) {
    console.log("MEMBER_ID_DELETE",error)
    return new NextResponse('Inernal Error',{status:500})
 }
 }

