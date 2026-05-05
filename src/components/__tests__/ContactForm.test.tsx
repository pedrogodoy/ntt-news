import { render, screen, fireEvent, act } from '@testing-library/react';
import ContactForm from '../ContactForm';

const fillField = (label: RegExp, name: string, value: string) => {
  fireEvent.change(screen.getByRole('textbox', { name: label }), {
    target: { name, value },
  });
};

const fillValidForm = () => {
  fillField(/nome/i, 'name', 'João Silva');
  fillField(/e-mail/i, 'email', 'joao@example.com');
  fillField(/assunto/i, 'subject', 'Dúvida');
  fillField(/mensagem/i, 'message', 'Gostaria de saber mais informações.');
};

describe('ContactForm', () => {
  describe('rendering', () => {
    it('renders all form fields', () => {
      render(<ContactForm />);
      expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /assunto/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /mensagem/i })).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      render(<ContactForm />);
      expect(
        screen.getByRole('button', { name: /enviar mensagem/i }),
      ).toBeInTheDocument();
    });

    it('submit button is enabled initially', () => {
      render(<ContactForm />);
      expect(screen.getByRole('button', { name: /enviar mensagem/i })).not.toBeDisabled();
    });
  });

  describe('validation', () => {
    it('shows all field errors when submitting an empty form', () => {
      render(<ContactForm />);
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(
        screen.getByText('O nome deve ter pelo menos 3 caracteres.'),
      ).toBeInTheDocument();
      expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
      expect(screen.getByText('O assunto é obrigatório.')).toBeInTheDocument();
      expect(
        screen.getByText('A mensagem deve ter pelo menos 10 caracteres.'),
      ).toBeInTheDocument();
    });

    it('shows error when name has fewer than 3 characters', () => {
      render(<ContactForm />);
      fillField(/nome/i, 'name', 'Jo');
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(
        screen.getByText('O nome deve ter pelo menos 3 caracteres.'),
      ).toBeInTheDocument();
    });

    it('does not show name error when name is valid', () => {
      render(<ContactForm />);
      fillField(/nome/i, 'name', 'João');
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(
        screen.queryByText('O nome deve ter pelo menos 3 caracteres.'),
      ).not.toBeInTheDocument();
    });

    it('shows error for invalid email', () => {
      render(<ContactForm />);
      fillField(/e-mail/i, 'email', 'not-an-email');
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
    });

    it('does not show email error for a valid email', () => {
      render(<ContactForm />);
      fillField(/e-mail/i, 'email', 'joao@example.com');
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(
        screen.queryByText('Informe um e-mail válido.'),
      ).not.toBeInTheDocument();
    });

    it('shows error when message has fewer than 10 characters', () => {
      render(<ContactForm />);
      fillField(/mensagem/i, 'message', 'Curto');
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(
        screen.getByText('A mensagem deve ter pelo menos 10 caracteres.'),
      ).toBeInTheDocument();
    });

    it('shows error when subject is empty', () => {
      render(<ContactForm />);
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(screen.getByText('O assunto é obrigatório.')).toBeInTheDocument();
    });
  });

  describe('error clearing', () => {
    it('clears the name error when the user types in the name field', () => {
      render(<ContactForm />);
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(
        screen.getByText('O nome deve ter pelo menos 3 caracteres.'),
      ).toBeInTheDocument();
      fillField(/nome/i, 'name', 'João Silva');
      expect(
        screen.queryByText('O nome deve ter pelo menos 3 caracteres.'),
      ).not.toBeInTheDocument();
    });

    it('clears only the typed field error, keeping others', () => {
      render(<ContactForm />);
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      fillField(/nome/i, 'name', 'João Silva');
      expect(
        screen.queryByText('O nome deve ter pelo menos 3 caracteres.'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
    });
  });

  describe('submission', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('disables the submit button while loading', () => {
      jest.useFakeTimers();
      render(<ContactForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled();
      act(() => jest.runAllTimers());
    });

    it('shows success message after submission completes', () => {
      jest.useFakeTimers();
      render(<ContactForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      act(() => jest.runAllTimers());
      expect(screen.getByText('Mensagem enviada com sucesso!')).toBeInTheDocument();
    });

    it('clears the form fields after successful submission', () => {
      jest.useFakeTimers();
      render(<ContactForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      act(() => jest.runAllTimers());
      // Form is replaced by success screen — no inputs visible
      expect(
        screen.queryByRole('textbox', { name: /nome/i }),
      ).not.toBeInTheDocument();
    });

    it('does not submit and shows errors when form is invalid', () => {
      jest.useFakeTimers();
      render(<ContactForm />);
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      act(() => jest.runAllTimers());
      // Success screen must NOT appear
      expect(
        screen.queryByText('Mensagem enviada com sucesso!'),
      ).not.toBeInTheDocument();
      // Errors must be visible
      expect(
        screen.getByText('O nome deve ter pelo menos 3 caracteres.'),
      ).toBeInTheDocument();
    });

    it('allows sending another message from the success screen', () => {
      jest.useFakeTimers();
      render(<ContactForm />);
      fillValidForm();
      fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));
      act(() => jest.runAllTimers());
      fireEvent.click(
        screen.getByRole('button', { name: /enviar outra mensagem/i }),
      );
      expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument();
    });
  });
});
