import { ElementType } from "react";

export default function CardIcon({
  icon: Icon,
  color,
  size = 20,
}: {
  icon: ElementType;
  color?: string;
  size?: number;
}) {
  return <Icon size={size} className="stroke-[2.5]" color={color} />;
}
