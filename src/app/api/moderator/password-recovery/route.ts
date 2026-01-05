import User from "@/src/model/auth.model";
export async function POST(req: Request) {
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
        return Response.json({ message: "If an account exists, an email was sent." });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 3600000); 
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    

    return Response.json({ message: "Email sent" });
}