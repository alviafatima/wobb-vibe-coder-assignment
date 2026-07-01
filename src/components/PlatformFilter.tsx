import type { RefObject } from "react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
  inputRef,
}: PlatformFilterProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 justify-center mb-3">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-4 py-2 border rounded transition ${
              selected === p
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search creators... (Ctrl + K)"
        className="w-full max-w-md border px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}