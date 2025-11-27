'use client';

interface WindowSelectorProps {
  selectedWindow: 2 | 3 | 7 | 14 | 30 | 90 | 180 | 270 | 365;
  onWindowChange: (window: 2 | 3 | 7 | 14 | 30 | 90 | 180 | 270 | 365) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function WindowSelector({
  selectedWindow,
  onWindowChange,
  disabled = false,
  size = 'md',
}: WindowSelectorProps) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const windows = [2, 3, 7, 14, 30, 90, 180, 270, 365] as const;
  const labels: Record<number, string> = {
    2: '2d',
    3: '3d',
    7: '7d',
    14: '14d',
    30: '30d',
    90: '90d',
    180: '180d',
    270: '270d',
    365: '1y',
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {windows.map((window) => (
        <button
          key={window}
          onClick={() => onWindowChange(window)}
          disabled={disabled}
          className={`${sizeClasses[size]} rounded-lg font-semibold transition-all ${
            selectedWindow === window
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {labels[window]}
        </button>
      ))}
    </div>
  );
}
