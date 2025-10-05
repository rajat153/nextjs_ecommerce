
import NotFound from "@/app/not-found";
export default async function ProductsDetails({params}: {params: {id: string}}) { 
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // const product = products.find(p => p.id === params.id);
    const response = await fetch(`${baseUrl}/api/products/${params.id}`)
    const product = await response.json()
    if (!product) {
        return <NotFound/>;
    }
    return (
       <>
       <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2  mb-4 md:mb-0 md:mr-8">
            <img src={'/' + product.imageUrl} alt={product.name} width={400} height={400} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-600 mb-6">${product.price}</p>
            <h3 className= "text-2xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
        </div>
       </div>
       </>
    );
}