export default function AdminButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#3b82f6] text-[#111827] hover:bg-[#2563eb] py-2 px-8 font-['Great_Vibes'] font-bold rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}
