import { dbConnect } from "@/src/lib/dbConnect";
import { User } from "@/src/model/checkout.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const passwordSchema = z.object({
    token: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function POST(req: Request) {
    try {
        await dbConnect();
    
        const reqBody = await req.json();
        const validateData = passwordSchema.safeParse(reqBody);
        if (!validateData.success) {
            return NextResponse.json({ message:'Password does not match' }, { status: 400 });
        }
        const { token, password } = validateData.data;
        const user = await User.findOne({ 
                resetPasswordToken: token,
                resetPasswordExpire: { $gt: new Date() } 
            });
    
        if (!user) {
            return NextResponse.json({ message: "This link is invalid or has expired" }, { status: 404 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "365d"} );
        (await cookies()).set("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
        });
           const accessTokenPayload = {
            id: user._id,
            email: user.email,
            role: user.role
           }
         const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_ACCESS_SECRET as string,{ expiresIn: "15m" });
         return NextResponse.json({ accessToken }, { status: 200 });
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return NextResponse.json({ message: "Server error while resetting password" }, { status: 500 });
    }
}