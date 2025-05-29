export default function StyledListItem({ children, className }) {
  return (
    <li
      className={`text-[#2E2E2E] font-['Great_Vibes'] uppercase font-semibold cursor-pointer ${className}`}
    >
      {children}
    </li>
  );
}
