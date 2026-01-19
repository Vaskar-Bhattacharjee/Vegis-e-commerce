import { dbConnect } from "@/src/lib/dbConnect";
import { checkout } from "@/src/model/checkout.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url)
        const session_id = searchParams.get("session_id");

        if (!session_id) {
            return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        if (session.payment_status === "paid") {
            const m = session.metadata;
            console.log("metadata checking: ",m);
            
            const ordererDetails = await checkout.findOne({
                _id: m?.order_id,
                status: "Awaiting Payment",
                paymentMethod: "Online",
            });
            if (!ordererDetails) {
                return NextResponse.json({ message: "Order not found" }, { status: 404 });
            }
            ordererDetails.status = "Confirmed";
            await ordererDetails.save();

            return NextResponse.json({
                message: "Payment successful",
                checkoutData: ordererDetails.toJSON()
            }, { status: 200 });
        }

    } catch (error) {
        console.log("Error verifying online payment", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}