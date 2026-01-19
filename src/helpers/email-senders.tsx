import { EmailTemplate } from '@/src/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendingEmail({email, role, inviteLink}:{
    email: string,
    role: "admin" | "moderator",
    inviteLink: string
}) {

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: `You’ve been invited as ${role}`,
      react: EmailTemplate({ 
        email,
        role,
        inviteLink
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Resend Error:", error);
    return { success: false, error };}
}