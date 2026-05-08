const PRIORITIES = [
  { key: 'urgent_count', label: 'Urgent', color: 'var(--color-priority-urgent)' },
  { key: 'high_count',   label: 'High',   color: 'var(--color-priority-high)' },
  { key: 'medium_count', label: 'Medium', color: 'var(--color-priority-medium)' },
  { key: 'low_count',    label: 'Low',    color: 'var(--color-priority-low)' },
];

export default function WorkloadCard({ member, onClick, selected = false, children }) {
  const isOverloaded = member.urgent_count >= 3;
  const isEmpty = member.total_count === 0;

  const cardStyle = {
    background: isOverloaded ? 'var(--color-error-light)' : 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderLeft: isOverloaded
      ? '4px solid var(--color-priority-urgent)'
      : selected
      ? '4px solid var(--color-primary)'
      : '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-lg)',
    padding: 'var(--space-5)',
    cursor: onClick ? 'pointer' : 'default',
    opacity: isEmpty ? 0.55 : 1,
    transition: 'box-shadow var(--transition-fast), transform var(--transition-fast)',
    boxShadow: selected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
  };

  const avatarStyle = {
    width: '44px',
    height: '44px',
    borderRadius: 'var(--border-radius-full)',
    background: member.avatar_color || 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-base)',
    flexShrink: 0,
  };

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div style={cardStyle} onClick={onClick}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <div style={avatarStyle}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-base)' }}>
              {member.name}
            </span>
            {isOverloaded && (
              <span style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-priority-urgent)',
                background: 'var(--color-error-light)',
                border: '1px solid var(--color-priority-urgent)',
                borderRadius: 'var(--border-radius-full)',
                padding: '1px var(--space-2)',
                lineHeight: '1.4',
              }}>
                Overloaded
              </span>
            )}
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{member.role}</div>
        </div>
      </div>

      {/* Priority breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-2)' }}>
        {PRIORITIES.map(({ key, label, color }) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: member[key] > 0 ? color : 'var(--color-text-muted)',
              lineHeight: 1.1,
            }}>
              {member[key]}
            </div>
            <div style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              marginTop: '2px',
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
