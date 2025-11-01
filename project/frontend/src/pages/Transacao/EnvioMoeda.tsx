import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function EnvioMoeda() {
  const alunos = [
    { id: 1, nome: "Marcos", email: "marcos@email.com" },
    { id: 2, nome: "Paulo", email: "paulo@email.com" },
    { id: 3, nome: "Joaquim", email: "joaquim@email.com" },
  ];

  const professorEmail = "professor@email.com";
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Enviando...");

    if (!form.current) return;

    const formData = new FormData(form.current);
    const nomeAluno = formData.get("aluno")?.toString() || "";
    const moedas = formData.get("moedas")?.toString() || "";
    const aluno = alunos.find((a) => a.nome === nomeAluno);

    if (!aluno) {
      setStatus("Aluno não encontrado.");
      return;
    }

    try {
      await emailjs.send(
        "service_insd0tu",
        "template_5x5wcvc",
        {
          to_email: aluno.email,
          to_name: aluno.nome,
          from_name: "Professor",
          message: `Você recebeu ${moedas} moedas estudantis do professor.`,
        },
        "npBATyLmsJ0WBjGuX"
      );

      await emailjs.send(
        "service_insd0tu",
        "template_5x5wcvc",
        {
          to_email: professorEmail,
          to_name: "Professor",
          from_name: "Sistema Recompensa",
          message: `Você enviou ${moedas} moedas para o aluno ${aluno.nome}.`,
        },
        "npBATyLmsJ0WBjGuX"
      );

      setStatus("Moedas enviadas com sucesso!");
      form.current.reset();
    } catch (error: any) {
      setStatus("Erro ao enviar e-mails: " + error.text);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          💰 Transação de Moeda Estudantil
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Envie moedas como recompensa para seus alunos.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label
              htmlFor="alunos"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selecione o Aluno
            </label>
            <select
              name="aluno"
              id="alunos"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Selecione --</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.nome}>
                  {aluno.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="moedas"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantidade de Moedas
            </label>
            <input
              type="number"
              id="moedas"
              name="moedas"
              min="1"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enviar Moedas
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.startsWith("✅")
                ? "text-green-600"
                : status.startsWith("❌")
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
