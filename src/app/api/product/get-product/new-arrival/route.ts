import { NextResponse } from "next/server";
import Product from "@/src/model/product.model";
import { dbConnect } from "@/src/lib/dbConnect";

export async function GET() {
    try {
        await dbConnect();
        const newArrivalProducts = await Product.find({ newArrival: true })
                                                .sort({ createdAt: -1 })
                                                .limit(10).exec();

        if (newArrivalProducts.length === 0) {
            return NextResponse.json({ message: "No new arrival products found" }, { status: 200 });
        }                                        
                                                
        return NextResponse.json({ products: newArrivalProducts }, { status: 200 });
    } catch (error) {
        console.log("Error fetching new arrival products:", error);
        return NextResponse.json({ message: "Failed to fetch new arrival products", error }, { status: 500 });
    }
}