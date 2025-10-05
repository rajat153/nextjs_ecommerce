
// const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, Db, ServerApiVersion } from "mongodb";
// nextjs_ecommerce
// 2RcQPiOGaWB2Mlzg
const user = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PWD;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null   = null;

export async function connectToDatabase() {
    if(cachedClient && cachedDb){
        return {client: cachedClient, db : cachedDb}
    }
    const uri = `mongodb+srv://${user}:${pwd}@nextjsecommerce.obg1l2p.mongodb.net/?retryWrites=true&w=majority&appName=NextjsEcommerce`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

    // async function run() {
    // try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    // }

    cachedClient = client;
    cachedDb = client.db('ecommerce-nextjs');

    return {client, db:client.db('ecommerce-nextjs')}
}
    // run().catch(console.dir);
// }