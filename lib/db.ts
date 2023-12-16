import { PrismaClient } from '@prisma/client';
//  It is used to avoid initilization of too many prisma client every time
declare global{
    var prisma:PrismaClient|undefined
}

export const db=globalThis.prisma||new PrismaClient()

if(process.env.NODE_ENV!=='production') globalThis.prisma=db