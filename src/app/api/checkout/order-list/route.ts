import { dbConnect } from "@/src/lib/dbConnect";
import {checkout} from "@/src/model/checkout.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const orders = await checkout.find({}).sort({ createdAt: -1 });
        if (orders.length === 0) {
            return NextResponse.json({ message: "No orders found yet" }, { status: 200 });
        }
        return NextResponse.json({
            success: true,
            totalOrders: orders.length,
            orders
        }, { status: 200 });        
    } catch (error) {
        console.log("finding an error while getting products", error);
        return NextResponse.json({ message: "Finding an error while getting products" }, { status: 500 });
    }
}