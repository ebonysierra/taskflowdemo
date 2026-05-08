const statCardStyle = (color) => ({
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--border-radius-lg)',
  borderTop: `3px solid ${color}`,
  padding: 'var(--space-6)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
  boxShadow: 'var(--shadow-sm)',
});

const iconBubbleStyle = (color) => ({
  width: '36px',
  height: '36px',
  borderRadius: 'var(--border-radius-md)',
  background: color + '18',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const labelStyle = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  fontWeight: 'var(--font-weight-medium)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const valueStyle = {
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text)',
  lineHeight: 1,
};

const icons = {
  tasks: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  ),
  check: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  progress: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  folder: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  ),
};

export default function Stats({ tasks, projects }) {
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((t) => t.status === 'done').length || 0;
  const inProgress = tasks?.filter((t) => t.status === 'in-progress').length || 0;
  const activeProjects = projects?.filter((p) => p.status === 'active').length || 0;

  const stats = [
    { label: 'Total Tasks', value: totalTasks, color: 'var(--color-primary)', icon: icons.tasks },
    // BUG: Typo — "Completd" instead of "Completed"
    { label: 'Completd Tasks', value: completedTasks, color: 'var(--color-success)', icon: icons.check },
    { label: 'In Progress', value: inProgress, color: 'var(--color-info)', icon: icons.progress },
    { label: 'Active Projects', value: activeProjects, color: 'var(--color-accent)', icon: icons.folder },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
      {stats.map((stat) => (
        <div key={stat.label} style={statCardStyle(stat.color)}>
          <div style={iconBubbleStyle(stat.color)}>
            {stat.icon(stat.color)}
          </div>
          <div>
            <div style={valueStyle}>{stat.value}</div>
            <div style={{ ...labelStyle, marginTop: 'var(--space-1)' }}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
