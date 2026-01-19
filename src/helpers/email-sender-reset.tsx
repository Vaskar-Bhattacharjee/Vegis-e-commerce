import { PasswordResetTemplate } from '@/src/components/email/password-reset-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail({email, resetLink}: {
    email: string,
    resetLink: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Vegis Auth <onboarding@resend.dev>', // Change 'Acme' to 'Vegis'
      to: email,
      subject: `Reset your Vegis Password`,
      react: PasswordResetTemplate({email, resetLink} ),
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}