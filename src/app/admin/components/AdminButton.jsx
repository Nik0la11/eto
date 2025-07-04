export default function AdminButton({
  onClick,
  children,
  className = "",
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${disabled ? `bg-[#bfdbfe] text-gray-400 py-2 px-8 font-['Great_Vibes'] font-bold rounded-lg shadow-md shadow-blue-300/50 ${className}` : `bg-[#3b82f6] text-[#111827] hover:bg-[#2563eb] py-2 px-8 font-['Great_Vibes'] font-bold rounded-lg shadow-lg shadow-blue-500/50 ${className}`}`}
    >
      {children}
    </button>
  );
}
