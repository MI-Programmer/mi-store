const colors = {
  red: "bg-red-200 text-red-700",
  blue: "bg-blue-200 text-blue-700",
  yellow: "bg-yellow-200 text-yellow-700",
  green: "bg-green-200 text-green-700",
};

interface BadgeProps {
  children: string;
  color: "red" | "blue" | "yellow" | "green";
}

const Badge = ({ children, color }: BadgeProps) => {
  return (
    <span
      className={`w-20 rounded-md px-4 py-2 text-center text-xs font-semibold uppercase sm:w-24 ${
        colors[color]
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
