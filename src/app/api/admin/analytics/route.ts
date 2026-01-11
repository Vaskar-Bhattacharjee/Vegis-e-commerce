import { dbConnect } from "@/src/lib/dbConnect";
import { checkout } from "@/src/model/checkout.model";
import  Product  from "@/src/model/product.model"; // Adjust path as needed
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const totalRevenue = await checkout.aggregate([
            {
                $match: { 
            $or: [
                { paymentMethod: "Online", status: { $ne: "Cancelled" } },
                
                { paymentMethod: "COD", status: "Delivered" }
            ]
        } 
    },
    { 
        $group: { 
            _id: null, 
            total: { $sum: "$totalAmount" } 
        }
            }
        ]);
        const pendingOrders = await checkout.countDocuments({ status: "Pending" });
        const lowStockProducts = await Product.countDocuments({ quantity: { $lt: 5 } });

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const salesTrend = await checkout.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo },
            $or: [
                        { paymentMethod: "Online", status: { $ne: "Cancelled" } },
                        { paymentMethod: "COD", status: "Delivered" }
                    ]            
            } },

            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, dailyTotal: { $sum: "$totalAmount" } } },
            { $sort: { _id: 1 } }
        ]);
        return NextResponse.json({
            success: true,
            stats: {
                revenue: totalRevenue[0]?.total || 0,
                pending: pendingOrders,
                lowStock: lowStockProducts
            },
            graphData: salesTrend // This goes straight into your Chart.js or Recharts
        });
        
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json({ message: "Error fetching analytics" }, { status: 500 });
    }
}