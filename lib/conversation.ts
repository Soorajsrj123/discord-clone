import { db } from "@/lib/db"


export const getOrCreateConversation=async (memberOneId:string,memberTwoId:string)=>{
    // finding the conversation both way mem1 to mem2 AND mem2 t mem1
      let conversation=await findConversation(memberOneId,memberTwoId)|| await findConversation(memberTwoId,memberOneId)

    //   Checking if there is a previos conversation if its not then creating a new conversation
      if(!conversation){
         conversation=await createNewConversation(memberOneId,memberTwoId)
      }

      return conversation
}

const findConversation=async (memberOneId:string,memberTwoId:string)=>{
  try{

      return await db.conversation.findFirst({
          where:{
            AND:[
                {memberOneId:memberOneId},
                {memberTwoId:memberTwoId}
            ]
        },
        include:{
            memberOne:{
                include:{
                    profile:true
                }
            },
            memberTwo:{
                include:{
                    profile:true
                }
            }
        }
    })
    }catch{
            return null
    }
}

const createNewConversation=async (memberOneId:string,memberTwoId:string)=>{

    try{

        return await db.conversation.create({
            data:{
                memberOneId,
                memberTwoId
        },
        include:{
            memberOne:{
                include:{
                    profile:true
                }
            },
            memberTwo:{
                include:{
                    profile:true
                }
            }
        }
    })
     }catch{
         return null
     }
}