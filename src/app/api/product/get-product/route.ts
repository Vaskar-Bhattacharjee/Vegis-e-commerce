import { dbConnect } from "@/src/lib/dbConnect";
import Product from "@/src/model/product.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await dbConnect();
        
    } catch (error) {
        console.log("Finding an error while getting products",error);
        return NextResponse.json({ message: "Finding an error while getting products" }, { status: 500 });
    }
}