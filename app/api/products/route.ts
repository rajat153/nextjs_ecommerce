import {connectToDatabase} from '../connection'


export async function GET() {
    console.log("Mongo User:", process.env.MONGODB_USER);
    const { db } = await connectToDatabase();
    const products = await db.collection('products').find({}).toArray();
    

    return new Response(JSON.stringify(products), {status: 200, headers: {'Content-Type': 'application/json'}});
}   