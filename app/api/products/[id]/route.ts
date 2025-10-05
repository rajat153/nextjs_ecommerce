import { NextRequest } from "next/server";
import { connectToDatabase } from "../../connection";



export async function GET(request: NextRequest, context: { params: Promise<Record<string, string>> }) {
    const { id } = await context.params;
    const {db} = await connectToDatabase();
    const productId = id;
    const product = await db.collection('products').findOne({id : productId})
    if (!product) {
        return new Response('Product Not Found', { status: 404 });
    }
    return new Response(JSON.stringify(product), { status: 200 , headers: { 'Content-Type': 'application/json'}});

}