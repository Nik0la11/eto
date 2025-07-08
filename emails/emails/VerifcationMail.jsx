import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Link,
} from "@react-email/components";

export default function ResetPasswordEmail({ userName, resetLink }) {
  return (
    <Html>
      <Head />
      <Preview>Resetuj svoju lozinku</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Potvrdite e-mail</Text>

          <Text style={text}>
            Poštovani/a, <br />
            Hvala Vam što ste se registrovali! Da biste završili proces
            registracije i potvrdili svoju e-mail adresu, kliknite na dugme
            ispod:
          </Text>

          <Section style={{ textAlign: "center", margin: "24px 0" }}>
            <Button href={resetLink} style={button}>
              Potvrdite e-mail
            </Button>
          </Section>

          <Text style={text}>
            Ako niste Vi napravili ovaj nalog, slobodno ignorišite ovu poruku.
          </Text>

          <Text style={footer}>
            Srdačno, <br />
            [Naziv salona]
          </Text>

          <Text style={footerSmall}>
            Ako dugme ne funkcioniše, kopirajte i nalepite sledeći link u vaš
            browser:{" "}
            <Link href={resetLink} style={{ color: "#2563eb" }}>
              {resetLink}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Helvetica, Arial, sans-serif",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "40px",
  maxWidth: "480px",
  margin: "0 auto",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#111827",
};

const text = {
  fontSize: "14px",
  color: "#374151",
  marginBottom: "16px",
};

const button = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "14px",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
};

const footer = {
  fontSize: "14px",
  color: "#4b5563",
  marginTop: "24px",
};

const footerSmall = {
  fontSize: "12px",
  color: "#6b7280",
  marginTop: "16px",
};
