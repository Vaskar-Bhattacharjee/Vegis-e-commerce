import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetTemplateProps {
  email: string;
  resetLink: string;
}

export const PasswordResetTemplate = ({
  email,
  resetLink,
}: PasswordResetTemplateProps) => (
  <Html>
    <Head />
    <Preview>Reset your Veggis account password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logo}>🥦 Veggis</Heading>
        </Section>
        
        <Section style={content} >
          <Heading style={h1}>Password Reset Request</Heading>
          <Text style={text}>
            Hello,
          </Text>
          <Text style={text}>
            We received a request to reset the password for your <strong>Veggis</strong> account associated with <strong>{email}</strong>.
          </Text>
          <Text style={text}>
            Click the button below to choose a new password. This link is valid for **1 hour** only.
          </Text>
          
          <Button style={button} href={resetLink}>
            Reset My Password
          </Button>
          
          <Text style={reason}>
            If you did not request a password reset, please ignore this email or contact support if you have concerns. Your password will remain unchanged.
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footerText}>
            If the button above doesn&apos;t work, copy and paste this link into your browser:
          </Text>
          <Link href={resetLink} style={link}>
            {resetLink}
          </Link>
        </Section>

        <Section style={footer}>
          <Text style={footerSubtext}>
            &copy; {new Date().getFullYear()} Veggis E-Commerce. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetTemplate;

// --- Styles (Identical to your invite template for brand consistency) ---

const main = {
  backgroundColor: "#f9fafb",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const header = {
  padding: "26px",
  textAlign: "center" as const,
};

const logo = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#16a34a", 
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "8px",
  border: "1px solid #e1e8e1", 
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.1",
  color: "#111827",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
};

const button = {
  backgroundColor: "#16a34a",
  borderRadius: "5px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px 0",
  marginTop: "25px",
};

const reason = {
  fontSize: "13px",
  color: "#6b7280",
  marginTop: "25px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "30px 0",
};

const link = {
  fontSize: "12px",
  color: "#16a34a",
  textDecoration: "underline",
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  marginBottom: "10px",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const footerSubtext = {
  fontSize: "12px",
  color: "#9ca3af",
};