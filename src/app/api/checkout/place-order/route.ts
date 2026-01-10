import { dbConnect } from "@/src/lib/dbConnect";
import { checkout } from "@/src/model/checkout.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const checkoutSchemaZod = z.object({
  firstname: z.string().min(2, "First name is too short"),
  lastname: z.string().min(2, "Last name is too short"),
  email: z.email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 10 digits"),
  country: z.string().default("Bangladesh"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(4, "Invalid postcode"),
  addressLine1: z.string().min(5, "Address is too short"),
  addressLine2: z.string().optional(),
  paymentMethod: z.enum(["COD", "Online"]), 
  saveInfo: z.boolean().default(false),
});

export async function POST(request: Request) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const parsedData = checkoutSchemaZod.safeParse(reqBody);
        if (!parsedData.success) {
            return NextResponse.json({ 
                message: "Validation Error", 
                errors: parsedData.error
            }, { status: 400 }
            );
        }

        const initialPaymentStatus = parsedData.data.paymentMethod === "COD" ? "Pending" : "Awaiting Payment";

        if (parsedData.data.paymentMethod === "COD") {

            const checkoutData = await checkout.create({
            ...parsedData.data,
            status: initialPaymentStatus
        });

        return NextResponse.json({
            message: "Cash on Delivery",
            checkoutData
        }, { status: 200 });

        }
        if (parsedData.data.paymentMethod === "Online") {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Total Order Payment',
                            },
                            unit_amount: 5000, // Example amount in cents
                        },
                        quantity: 1,
                    }
                ],
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,

                metadata: {
                    firstname: parsedData.data.firstname,
                    lastname: parsedData.data.lastname,
                    email: parsedData.data.email,
                    phone: parsedData.data.phone,
                    country: parsedData.data.country,
                    state: parsedData.data.state,
                    city: parsedData.data.city,
                    postcode: parsedData.data.postcode,
                    addressLine1: parsedData.data.addressLine1,
                    addressLine2: parsedData.data.addressLine2 || "",
                    paymentMethod: "Online"
                },
            });
            if (!session.url) {
                return NextResponse.json({ message: "Failed to create Stripe checkout session" }, { status: 500 });
            }
            return NextResponse.json({
                message: "Online Payment",

                checkoutUrl: session.url
            }, { status: 200 });
        }
        
        
       
        
    } catch (error) {
        console.log("", error);
        return NextResponse.json({ message: "Internal Server Error while checking out" }, { status: 500 });
    }
}