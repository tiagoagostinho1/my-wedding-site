import { useState } from "react";

interface RSVPFormData {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number;
  guestNames: string[];
  notes?: string;
}

const RSVPForm = () => {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleGuestNameChange = (index: number, value: string) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data: RSVPFormData = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      attending: form.get("attending") as "yes" | "no",
      guests: attending === "yes" ? guestCount : 0,
      guestNames: attending === "yes" ? guestNames : [],
      notes: form.get("notes") as string,
    };

    try {
      await fetch("https://o-teu-servidor.com/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setDone(true);
    } catch (error) {
      console.error("Erro ao enviar RSVP", error);
    }

    setLoading(false);
  };

  if (done) {
    return (
      <p className="text-center text-xl mt-10 text-green-700">
        Obrigado pela confirmação! 💛 Estamos muito felizes por contar contigo.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-light text-center mb-4">
        Confirma a tua presença
      </h2>

      {/* Nome */}
      <input
        name="name"
        required
        placeholder="O teu nome"
        className="w-full p-3 border rounded"
      />

      {/* Email */}
      <input
        name="email"
        required
        type="email"
        placeholder="O teu email"
        className="w-full p-3 border rounded"
      />

      {/* Vai ao casamento */}
      <div className="flex gap-6 mt-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="attending"
            value="yes"
            checked={attending === "yes"}
            onChange={() => setAttending("yes")}
          />
          Sim, vou
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === "no"}
            onChange={() => setAttending("no")}
          />
          Não posso ir
        </label>
      </div>

      {/* Só mostra resto se attending = yes */}
      {attending === "yes" && (
        <>
          {/* Nº de pessoas */}
          <label className="block mt-4 font-medium">
            Quantas pessoas (incluindo tu)?
          </label>

          <select
            value={guestCount}
            onChange={(e) => {
              const count = Number(e.target.value);
              setGuestCount(count);
              setGuestNames(Array(count).fill(""));
            }}
            className="w-full p-3 border rounded"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} pessoa{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {/* Nomes dos convidados */}
          <div className="space-y-2 mt-4">
            {guestNames.map((guest, index) => (
              <input
                key={index}
                placeholder={
                  index === 0
                    ? "O teu nome (de novo para registo interno)"
                    : `Nome da pessoa ${index + 1}`
                }
                value={guest}
                onChange={(e) => handleGuestNameChange(index, e.target.value)}
                className="w-full p-3 border rounded"
              />
            ))}
          </div>

          {/* Notas */}
          <textarea
            name="notes"
            placeholder="Notas (opcional: alergias, bebés, transporte...)"
            className="w-full p-3 border rounded mt-4"
          />
        </>
      )}

      <button
        type="submit"
        className="w-full p-3 bg-black text-white rounded hover:bg-gray-800 transition mt-4"
      >
        {loading ? "A enviar..." : "Confirmar Presença"}
      </button>
    </form>
  );
};

export default RSVPForm;
