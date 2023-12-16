import {getAuth} from '@clerk/nextjs/server'
import {db} from '@/lib/db'
import {NextApiRequest} from 'next'
// this is for finding the current userPROFILE
export const currentProfilePages=(req:NextApiRequest)=>{
    const {userId}=getAuth(req)

    if(!userId){
        return null
    }
    const profile=db.profile.findUnique({
        where:{
            userId
        }
    })
    return profile
}