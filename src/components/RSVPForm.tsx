import { useState } from "react";
import API_URL from "../api/rsvp";

interface FormData {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number; // total (incluindo a pessoa principal)
  guestNames: string[]; // apenas acompanhantes
  notes?: string;
}

const RSVPForm = () => {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1); // inclui sempre a pessoa principal
  const [guestNames, setGuestNames] = useState<string[]>([]); // só acompanhantes
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleGuestNameChange = (i: number, value: string) => {
    const updated = [...guestNames];
    updated[i] = value;
    setGuestNames(updated);
  };

  const handleGuestCountChange = (value: number) => {
    setGuestCount(value);

    if (value <= 1) {
      setGuestNames([]);
      return;
    }

    const extraGuests = value - 1; // só acompanhantes
    const updated = [...guestNames];

    if (extraGuests > updated.length) {
      // adiciona campos
      while (updated.length < extraGuests) {
        updated.push("");
      }
    } else if (extraGuests < updated.length) {
      // remove campos a mais
      updated.length = extraGuests;
    }

    setGuestNames(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const data: FormData = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      attending,
      guests: attending === "yes" ? guestCount : 0,
      guestNames: attending === "yes" ? guestNames : [],
      notes: (form.get("notes") as string) || undefined,
    };

    try {
      await fetch(`${API_URL}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setDone(true);
    } catch (err) {
      console.error("Erro ao enviar RSVP:", err);
      // aqui no futuro podes mostrar toast de erro
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <p className="text-center text-xl mt-10 text-green-700">
        Obrigado pela confirmação! 💛
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

      {/* Nome principal */}
      <input
        name="name"
        required
        placeholder="O teu nome"
        className="w-full p-3 border rounded"
      />

      {/* Email principal */}
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

      {attending === "yes" && (
        <>
          {/* Quantas pessoas (inclui a pessoa principal) */}
          <label className="block mt-4 font-medium">
            Quantas pessoas (incluindo tu)?
          </label>

          <select
            value={guestCount}
            onChange={(e) => handleGuestCountChange(Number(e.target.value))}
            className="w-full p-3 border rounded"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} pessoa{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {/* Nomes dos acompanhantes, se existirem */}
          {guestNames.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="font-medium">Nomes dos acompanhantes</p>
              {guestNames.map((guest, index) => (
                <input
                  key={index}
                  placeholder={`Acompanhante ${index + 1}`}
                  value={guest}
                  onChange={(e) => handleGuestNameChange(index, e.target.value)}
                  className="w-full p-3 border rounded"
                />
              ))}
            </div>
          )}

          {/* Notas */}
          <textarea
            name="notes"
            placeholder="Notas (alergias, bebés, transporte, etc.)"
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
