interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export default function ProgressBar({ value, max = 100, label, color }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="progress-bar-wrapper">
      {label && <div className="progress-bar-label">{label}</div>}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
