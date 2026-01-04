import { sendingEmail } from "@/src/helpers/email-senders";
import { dbConnect } from "@/src/lib/dbConnect";
import User from "@/src/model/auth.model";
import { NextResponse } from "next/server";
import { z } from "zod";

const authSchema = z.object({
  email: z.email(),
  role: z.enum(["admin", "moderator"]),
});
export async function POST(req: Request) {
    try {
         await dbConnect();

        
        const reqBody = await req.json();
        const { email, role } = authSchema.parse(reqBody);
        const invitationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const invitationTokenExpiry = new Date();
        invitationTokenExpiry.setHours(invitationTokenExpiry.getHours() + 1);
        const inviteLink = `${process.env.NEXT_PUBLIC_URL}/invite/?token=${invitationToken}`;
        const existingUser = await User.findOne({ email });
        let user;
        if (!existingUser) {                
                const newUser = await User.create({ 
                     email,
                     role,
                     isAcceptedbyUser: false,
                     isBlocked: false,
                     invitationToken,
                     invitationTokenExpiry
                    });
                user = newUser;               
                
            } else {
                existingUser.role = role;
                existingUser.isAcceptedbyUser = false;
                existingUser.isBlocked = false;
                existingUser.invitationToken = invitationToken;
                existingUser.invitationTokenExpiry = invitationTokenExpiry;
                user = await existingUser.save();
            }  
         
            const emailSend = await sendingEmail({ email, role, inviteLink });
           if (!emailSend.success) {
                return NextResponse.json({ 
                    message: "User created but email failed", 
                    error: emailSend.error 
                }, { status: 500 });
            }
            return NextResponse.json({ user }, { status: 200 });

            
        } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}
  
