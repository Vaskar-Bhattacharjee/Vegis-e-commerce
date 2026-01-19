import { NextResponse } from "next/server";
import { dbConnect } from "@/src/lib/dbConnect";
import  Product  from "@/src/model/product.model";
import { checkout } from "@/src/model/checkout.model";
export async function GET() {
    try {
        await dbConnect();
        const lowStockCount = await Product.countDocuments({ quantity: { $lt: 10 } });
        const pendingOrders = await checkout.countDocuments({ status: "Pending" });
        const confirmedOrders = await checkout.countDocuments({ status: "Confirmed" });
        
        return NextResponse.json({
            lowStockCount,
            pendingOrders,
            confirmedOrders,
            // totalRevenue, etc.
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ message: "Error fetching stats" }, { status: 500 });
    }
}