import { Box, Container, Typography } from '@mui/material';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contato | NTT News',
  description: 'Entre em contato com a nossa equipe.',
};

export default function ContatoPage() {
  return (
    <Container maxWidth="sm" className="py-12">
      <Box className="mb-8">
        <Typography variant="h4" component="h1" className="font-bold">
          Fale conosco
        </Typography>
        <Typography variant="body1" className="mt-2 text-gray-600">
          Preencha o formulário abaixo e retornaremos o mais breve possível.
        </Typography>
      </Box>

      <ContactForm />
    </Container>
  );
}
