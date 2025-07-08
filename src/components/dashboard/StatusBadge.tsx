import { STATUS } from "@/types";
import React from "react";
import { Badge } from "../ui/badge";
import { CheckCircle, Clock, LucideIcon, XCircle } from "lucide-react";

type BadgeInfo = {
  icon: LucideIcon;
  bg: string;
};

const badgeProps: Record<STATUS, BadgeInfo> = {
  pending: {
    icon: Clock,
    bg: "bg-yellow-100 text-yellow-800",
  },
  approved: {
    icon: CheckCircle,
    bg: "bg-green-100 text-green-800",
  },
  rejected: {
    icon: XCircle,
    bg: "bg-red-100 text-red-800",
  },
};

const StatusBadge = ({ status }: { status: STATUS }) => {
  const Icon = badgeProps[status]?.icon;
  const bgColor = badgeProps[status]?.bg;

  return (
    <Badge className={`capitalize py-1 gap-1 ${bgColor}`}>
      {Icon && <Icon />}
      {status}
    </Badge>
  );
};

export default StatusBadge;
