import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
  type: "appointment" | "pending" | "cancelled";
  label: string;
  icon: string;
  count: number;
}

const StatCard = ({ type, label, icon, count }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointment",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
