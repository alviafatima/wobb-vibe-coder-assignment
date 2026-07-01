import { Check } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;

  return (
    <span
      className="inline-flex items-center justify-center
      w-5 h-5 ml-1 rounded-md
      bg-blue-500 shadow-sm"
      title="Verified Creator"
    >
      <Check
        size={12}
        strokeWidth={3}
        className="text-white"
      />
    </span>
  );
}