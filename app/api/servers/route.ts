import {v4 as uuidv4} from 'uuid'
import { NextResponse } from 'next/server';
import {currentProfile} from '@/lib/current-profile'
import { db } from '@/lib/db'
import { MemberRole } from '@prisma/client';

export async function POST(req:Request){
    // the datas send from client are get from req.json()
    try {
        const {name,imageUrl}= await req.json()
        const profile=await currentProfile()
       
        // checking whether user is authorized or not
        if(!profile){
            return new NextResponse('Unauthorized',{status:401})
        }
// CREATING A SERVER IN DB,UUID-its used for creating unique id 
        const server=await db.server.create({
            data:{
                profileId:profile.id,
                name,
                imageUrl,
                inviteCode:uuidv4(),
                channels:{
                    create:[
                        {
                            name:"general",
                            profileId:profile.id
                        }
                    ]
                },
                Members:{
                    create:[
                        {
                            profileId:profile.id,
                            role:MemberRole.ADMIN
                        }
                    ]
                }
            }
        })
            
          return NextResponse.json(server)
    } catch (error) {
        console.log("[SERVER POST]",error);
        return new NextResponse("Internal server error",{status:500})
        
    }
}