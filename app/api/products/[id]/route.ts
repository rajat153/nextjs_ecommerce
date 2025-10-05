import { NextRequest } from "next/server";
import { connectToDatabase } from "../../connection";


type Params = {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const {db} = await connectToDatabase();
    const productId = params.id;
    const product = await db.collection('products').findOne({id : productId})
    if (!product) {
        return new Response('Product Not Found', { status: 404 });
    }
    return new Response(JSON.stringify(product), { status: 200 , headers: { 'Content-Type': 'application/json'}});

}