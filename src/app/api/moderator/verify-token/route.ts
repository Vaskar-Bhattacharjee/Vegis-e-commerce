import { dbConnect } from "@/src/lib/dbConnect";
import User from "@/src/model/auth.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const reqBody = await req.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 400 });
        }
        const user = await User.findOne({
            invitationToken: token,
            invitationTokenExpiry: { $gt: new Date() } 
        });

        if (!user) {
            return NextResponse.json({ 
                valid: false, 
                message: "This link is invalid or has expired" 
            }, { status: 404 });
        }
        return NextResponse.json({ 
            valid: true, 
            message: "This link is valid",
            email: user.email 
        }, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({error, message: "Server error during verification" }, { status: 500 });
    }
}