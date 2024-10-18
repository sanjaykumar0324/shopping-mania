import { commentsData } from "../data"

export const GET=async(req : Request,{
    params
}: {params : {id: string}})=>{
    const comment = commentsData.find((comment)=>comment.id === parseInt(params.id))
    return Response.json(comment)
    
}