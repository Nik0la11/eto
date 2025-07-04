import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const KoalaWelcomeEmail = ({ userName }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="Logo salona"
          style={logo}
        />
        <Text style={paragraph}>Zdravo {userName},</Text>
        <Text style={paragraph}>
          Hvala Vam što koristite usluge frizerskog salona 'Ime salona'. Ovo je
          potvrda zakazanog termina. Detalji zakazivanja su ispod:
          <br />
        </Text>
        <Text style={details}>
          NAPOMENA:
          <br />
          Ukoliko želite da otkažete termin, to možete uraditi najkasnije 2 sata
          pre termina na ovaj link.
          <br />
          Ime: Nikola Marčeta
          <br />
          Mail adresa: marcetanikola3@gmail.com
          <br />
          Telefon: +381 65 2740 327
          <br />
          Frizer: Sale
          <br />
          Datum: 03-12-2024
          <br />
          Vreme: 20:30
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

// Default props for preview (not typed anymore)
KoalaWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
};

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const details = {
  fontSize: "16px",
  lineHeight: "36px",
  textAlign: "center",
};
