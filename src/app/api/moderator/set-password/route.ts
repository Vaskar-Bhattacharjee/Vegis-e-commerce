import { dbConnect } from "@/src/lib/dbConnect";
import User from "@/src/model/auth.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

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
    const { token, password } = passwordSchema.parse(reqBody);
    const user = await User.findOne({ invitationToken: token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    if (user.invitationTokenExpiry < new Date()) {
      return NextResponse.json({ message: "Token has expired" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isAcceptedbyUser = true;
    user.isBlocked = false;
    user.invitationToken = "";
    user.invitationTokenExpiry = new Date(0);
    await user.save();
    return NextResponse.json({ message: "Password set successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "password set failed totally" }, { status: 500 });
  }
}