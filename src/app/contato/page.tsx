export default function ContatoPage() {
  return (
    <main className="mx-auto max-w-screen-md px-4 py-16">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">Contato</h1>
      <p className="mb-10 text-gray-500 dark:text-gray-400">
        Preencha o formulário abaixo e entraremos em contato em breve.
      </p>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Seu nome completo"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mensagem" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mensagem
          </label>
          <textarea
            id="mensagem"
            rows={5}
            placeholder="Escreva sua mensagem..."
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="self-start rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
        >
          Enviar mensagem
        </button>
      </form>
    </main>
  );
}
