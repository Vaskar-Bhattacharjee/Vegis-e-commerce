

interface EmailTemplateProps {
  email: string;
  role: "admin" | "moderator";
  inviteLink: string;
}

export function EmailTemplate({ role,  inviteLink }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h2>You are invited as a {role}</h2>

      <p>
        Click the button below to set your password and activate your account.
      </p>

      <a
        href={inviteLink}
        style={{
          display: "inline-block",
          padding: "12px 20px",
          backgroundColor: "#111827",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "6px",
          marginTop: "12px",
        }}
      >
        Accept Invitation
      </a>

      <p style={{ marginTop: "16px", fontSize: "12px", color: "#555" }}>
        This link will expire in 1 hour.
      </p>
    </div>
  );
}
