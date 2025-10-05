
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/app/api/connection";

// type  ShoppingCart = Record<string, string[]>;
// const carts: ShoppingCart  = {'1':['123', '234']};

interface Cart {
  userId: string;
  cartIds: string[];
}

type Params = {
    id: string;
}

export async function GET(request: NextRequest, context: { params: Promise<Record<string, string>> }) {
    const {db} = await connectToDatabase();
    const { id } = await context.params;

    const userId = id;
    const cartProductIds = await db.collection('carts').findOne({userId})
    // const cartProductIds = carts[userId] || [];
    if(!cartProductIds) {
        return new Response(JSON.stringify([]), { status: 200 , headers: { 'Content-Type': 'application/json'}});
    }
    // const cartProducts = products.filter(p => cartProductIds.includes(p.id));
    const cartIds = cartProductIds.cartIds;
    const cartProducts = await db.collection('products').find({id: {$in : cartIds}}).toArray();
    return new Response(JSON.stringify(cartProducts), { status: 200 , headers: { 'Content-Type': 'application/json'}});
}

type AddToCartRequestBody = {
    productId: string;
}

//add to cart
export async function POST(request: NextRequest, context: { params: Promise<Record<string, string>> }) {
    const {db} = await connectToDatabase();
      const { id } = await context.params;

    const userId = id;
    const body : AddToCartRequestBody = await request.json();
    const productId = body.productId;
    if(!productId) {
        return new Response('Product ID is required', { status: 400 });
    }
    //const product = products.find(p => p.id === productId);
    // if(!product) {
    //     return new Response('Product Not Found', { status: 404 });
    // }

    const updatedCart = await db.collection<Cart>('carts').findOneAndUpdate({userId}, { $push: { cartIds : productId }}, { upsert:true, returnDocument:'after'});

    if (!updatedCart || !updatedCart.cartIds) {
        return new Response(JSON.stringify({msg:'Product added to cart', data: [] }), { status: 201 });
    }

    const cartProducts = await db.collection('products').find({id  : {$in: updatedCart.cartIds}}).toArray();
    // if(!carts[userId]) {
    //     carts[userId] = [];
    // }
    // carts[userId].push(productId);
    return new Response(JSON.stringify({msg:'Product added to cart', data:cartProducts }), { status: 201 });

}



export async function DELETE(request:NextRequest,context: { params: Promise<Record<string, string>> }) {
    const {db} = await connectToDatabase();
     const { id } = await context.params;
    const userId = id;
    const body : AddToCartRequestBody = await request.json();
    const productId = body.productId;
    if(!productId) {
        return new Response('Product ID is required', { status: 400 });
    }
    // const product = products.find(p => p.id === productId);
    // if(!product) {
    //     return new Response('Product Not Found', { status: 404 });
    // }
    // if(!carts[userId]) {
    //     carts[userId] = [];
    // }
    const updatedCart = await db.collection<Cart>('carts').findOneAndUpdate(
        {userId},
        {$pull: {cartIds : productId}},
        {returnDocument : 'after'}
    );
    if(!updatedCart){
        return new Response(JSON.stringify({message : 'Product removed from cart', data: [] }), { status: 202, headers: { 'Content-Type': 'application/json'}});
    }
    const cartProducts = await db.collection('products').find({id : {$in : updatedCart.cartIds}}).toArray();
    // const removeProduct = await db.collection('carts').findOneAndDelete({userId}, {$pull : {cartIds : productId}}, )
    // carts[userId] = carts[userId].filter(id => id !== productId);
    return new Response(JSON.stringify({message : 'Product removed', data: cartProducts}), { status: 202,headers: {
      'Content-Type': 'application/json',
    } });

}