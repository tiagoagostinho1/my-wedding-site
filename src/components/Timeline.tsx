const Timeline = () => {
  const events = [
    { time: "14:00", label: "Cerimónia" },
    { time: "16:00", label: "Copo d’Água" },
    { time: "17:30", label: "Fotografias" },
    { time: "19:00", label: "Jantar" },
    { time: "23:00", label: "Festa 🎉" },
  ];

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-3xl font-light text-center mb-8">Programa</h2>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="flex justify-between border-b pb-2">
            <span className="font-medium">{e.time}</span>
            <span>{e.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
