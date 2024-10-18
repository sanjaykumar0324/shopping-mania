import { commentsData } from "./data"

export const  GET = async()=>{
    return Response.json(commentsData)
}

export const POST = async(req : Request)=>{
    const comment = await req.json();
    const newComment = {
        id: commentsData.length +1,
        text : comment.text
    }

    commentsData.push(newComment)
    return new Response(JSON.stringify(commentsData),
   { headers : {
        "Content-Type" : "application/json"

    },
status : 201,})
}