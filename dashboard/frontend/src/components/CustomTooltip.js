// Custom Tooltip Component
export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <span className="label">{new Date(label).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</span>
        <div className="price">
          ${Number(payload[0].value).toFixed(2)}
        </div>
        <small style={{ color: '#718096' }}>Brent Crude Oil</small>
      </div>
    );
  }
  return null;
};
