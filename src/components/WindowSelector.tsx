'use client';

interface WindowSelectorProps {
  selectedWindow: 1 | 3 | 7 | 14 | 30;
  onWindowChange: (window: 1 | 3 | 7 | 14 | 30) => void;
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

  return (
    <div className="flex gap-2">
      {([1, 3, 7, 14, 30] as const).map((window) => (
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
          {window}d
        </button>
      ))}
    </div>
  );
}
