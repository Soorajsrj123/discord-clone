import {auth} from '@clerk/nextjs'
import {db} from '@/lib/db'

// this is for finding the current userPROFILE
export const currentProfile=()=>{
    const {userId}=auth()

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