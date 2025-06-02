export default function Button({
  onClick,
  children,
  className = "",
  appointment,
  setAppointment,
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#D4AF37] hover:bg-[#E6C94F] py-2 px-4 font-['Great_Vibes'] font-bold uppercase ${className}`}
    >
      {children}
    </button>
  );
}
