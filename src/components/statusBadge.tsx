import { labels, stylesStatus } from "../constants/constants";



type Status = keyof typeof stylesStatus;

export default function StatusBadge({ status }: { status?: string }) {
  if (!status || !(status in stylesStatus)) return null;

  const key = status as Status;

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${stylesStatus[key]}`}>
      {labels[key]}
    </span>
  );
}