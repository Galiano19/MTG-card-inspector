export default function FoilEffect() {
  return (
    <>
      <div className="foil-shine absolute inset-0 pointer-events-none rounded-xl" />
      <div className="bg-[#bc20e3] absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply rounded-xl" />
    </>
  );
}
