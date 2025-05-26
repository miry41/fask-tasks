import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: Request){
    const {email, password, name} = await req.json();
    
    try{
        //登録済かチェック
        const exisitingUer = await prisma.user.findUnique({
            where:{ email },
        });

        if (exisitingUer){
            return NextResponse.json(
                {message:"このメールアドレスは既に登録されています。"},
                {status:409}
            );
        }



        //パスワードをハッシュ化
        const hashedPass = await bcrypt.hash(password,10);

        const user = await
        prisma.user.create({
            data:{email,name,password:hashedPass,},
        })


        if (SECRET_KEY){
            const token =jwt.sign({
                id:user.id,
                email:user.email,},
                SECRET_KEY,{ expiresIn:"1h", });
            return NextResponse.json({
                message:"登録が完了しました。",
                user, token },{ status:200 });
        }


        return NextResponse.json({user});
    }catch(e){
        return NextResponse.json(e);
    }
}