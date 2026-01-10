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
            const checkoutData = await checkout.create(
                   {
                    firstname: m?.firstname,
                    lastname: m?.lastname,
                    email: m?.email,
                    phone: m?.phone,
                    country: m?.country,
                    state: m?.state,
                    city: m?.city,
                    postcode: m?.postcode,
                    addressLine1: m?.addressLine1,
                    addressLine2: m?.addressLine2,
                    paymentMethod: "Online",
                    status: "confirmed"
                }
            );

            return NextResponse.json({
                message: "Payment successful",
                checkoutData
            }, { status: 200 });
        }

    } catch (error) {
        console.log("", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}