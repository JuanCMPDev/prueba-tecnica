interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
}

export function CircularProgress({
  percentage,
  size = 200,
  strokeWidth = 10,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - ((percentage * 0.95) / 100) * circumference

  const getColorClass = (percentage: number) => {
    if (percentage >= 70) return 'stroke-green-500';
    if (percentage >= 40) return 'stroke-yellow-500';
    return 'stroke-red-500';
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={getColorClass(percentage)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-medium text-white"
        style={{
          fontSize: `${size / 3.5}px`,
          lineHeight: 1
        }}
      >
        {percentage}%
      </div>
    </div>
  )
}

