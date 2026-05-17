import React from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  key?: React.Key;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={twMerge("animate-pulse rounded-md bg-white/5", className)} {...props} />;
}
