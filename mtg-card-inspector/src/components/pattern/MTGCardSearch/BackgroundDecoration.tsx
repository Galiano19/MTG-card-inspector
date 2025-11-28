export function BackgroundDecoration() {
  return (
    <div
      id="background-decoration"
      className="fixed inset-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-teal-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 -left-40 w-60 md:w-80 h-60 md:h-80 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 right-1/3 w-60 md:w-80 h-60 md:h-80 bg-cyan-100 rounded-full blur-3xl opacity-30" />
    </div>
  );
}
