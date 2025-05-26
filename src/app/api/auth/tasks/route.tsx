import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(){
    try{
    //セッションチェック
    const session = await getServerSession(authOptions);

    //ログインしていない場合
    if(!session?.user?.id){
        return NextResponse.json(
            {message:"ログインしてください"},
            {status:401}
        );
    }

    //ユーザーのタスク取得
    const tasks = await prisma.task.findMany({
        where:{
            userId:session.user.id,
        },
        orderBy: {
            createdAt:"desc",
        }
    })

    return NextResponse.json(tasks,{status:200});
    }catch(e){
        return NextResponse.json(
            {message:"タスクの取得に失敗しました"},
            {status:500}
        )
    }
}

export async function POST(req:Request){
    try{
        //セッション確認
        const session = await getServerSession(authOptions);

        //ログインしていない場合
        if (!session?.user?.id) {
            return NextResponse.json(
                {message:"ログインしてください"},
                {status:401})
        }
        //リクエストボディ取得
        const { title } = await req.json();

        //タイトルが空の場合
        if (!title || !title.trim()) {
            return NextResponse.json(
                {message:"タイトルは必須です。"},
                {status: 400});
        }

        //DBでタスク作成
        const task = await prisma.task.create({
            data:{
                title,
                userId:session.user.id,
            },
        })
        return NextResponse.json({task},{status:200});
    }catch(e){
        return NextResponse.json(
            {message:"タスクの作成に失敗しました"},
            {status:500}
        )
    }
}

export async function DELETE(req: Request){
    try{
        const { id } = await req.json();

        if(!id){
            return NextResponse.json({massage:"IDがありません"},{status:400});
        }

        const deleted = await prisma.task.delete({
            where: { id },
        });
        return NextResponse.json({message:"削除成功",task:deleted});
    }catch(e){
        return NextResponse.json({message:"削除失敗"},{status:500})
    }
}

export async function PATCH(req: Request){
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user?.id){
            return NextResponse.json({message:"ログインしてください。"},{status:401});
        }

        const { id, title, completed } =await req.json();

        if (!id){
            return NextResponse.json({message:"IDが必要です"},{status:400})
        }

        if (title !== undefined && !title.trim()) {
            return NextResponse.json({ message: "タイトルは空にできません" }, { status: 400 });
          }          

       // if (title === undefined && completed === undefined){return return NextResponse.json({message:"更新内容がありません"},{status:400});}

        //自分のタスクかチェック
        const updateData: any = {}
        if (completed !== undefined) updateData.completed = completed
        if (title !== undefined) updateData.title = title

        const updated = await prisma.task.update({
            where: {id},
            data:updateData,
        });

        return NextResponse.json({task:updated}, {status:200});
    }catch(e){
        //console.error(e);
        return NextResponse.json({message:"更新に失敗しました"},{status:500})
    }
}