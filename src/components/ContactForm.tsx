'use client';

import { useState } from 'react';
import { z } from 'zod';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

const contactSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Informe um e-mail válido.'),
  subject: z.string().min(1, 'O assunto é obrigatório.'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
});

type ContactFields = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const emptyForm: ContactFields = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFields>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors({
        name: flat.name?.[0],
        email: flat.email?.[0],
        subject: flat.subject?.[0],
        message: flat.message?.[0],
      });
      return;
    }

    setStatus('loading');
    // Simula envio — substitua pelo fetch real quando houver API
    setTimeout(() => {
      setStatus('success');
      setForm(emptyForm);
      setErrors({});
    }, 1200);
  }

  if (status === 'success') {
    return (
      <Box className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <Typography variant="h6" className="font-semibold text-green-700">
          Mensagem enviada com sucesso!
        </Typography>
        <Typography className="mt-2 text-green-600">
          Entraremos em contato em breve.
        </Typography>
        <Button
          className="mt-6"
          variant="outlined"
          color="success"
          onClick={() => setStatus('idle')}
        >
          Enviar outra mensagem
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <TextField
        label="Nome"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        required
      />

      <TextField
        label="E-mail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
      />

      <TextField
        label="Assunto"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        error={!!errors.subject}
        helperText={errors.subject}
        fullWidth
        required
      />

      <TextField
        label="Mensagem"
        name="message"
        value={form.message}
        onChange={handleChange}
        error={!!errors.message}
        helperText={errors.message}
        fullWidth
        required
        multiline
        rows={5}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={status === 'loading'}
        startIcon={status === 'loading' ? <CircularProgress size={18} color="inherit" /> : null}
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
      </Button>
    </Box>
  );
}
