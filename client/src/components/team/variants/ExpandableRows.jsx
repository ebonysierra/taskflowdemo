import { useState } from 'react';
import WorkloadCard from '../WorkloadCard';

const PRIORITIES = [
  { key: 'urgent_count', label: 'Urgent', color: 'var(--color-priority-urgent)' },
  { key: 'high_count',   label: 'High',   color: 'var(--color-priority-high)' },
  { key: 'medium_count', label: 'Medium', color: 'var(--color-priority-medium)' },
  { key: 'low_count',    label: 'Low',    color: 'var(--color-priority-low)' },
];

function PriorityBars({ member }) {
  const max = Math.max(member.urgent_count, member.high_count, member.medium_count, member.low_count, 1);
  return (
    <div style={{
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-4)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
    }}>
      <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Task Breakdown
      </div>
      {PRIORITIES.map(({ key, label, color }) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: '52px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', flexShrink: 0 }}>{label}</div>
          <div style={{ flex: 1, height: '8px', background: 'var(--color-border-light)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(member[key] / max) * 100}%`,
              background: color,
              borderRadius: 'var(--border-radius-full)',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <div style={{ width: '20px', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: member[key] > 0 ? color : 'var(--color-text-muted)', textAlign: 'right', flexShrink: 0 }}>
            {member[key]}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 'var(--space-1)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'right' }}>
        {member.total_count} total task{member.total_count !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default function ExpandableRows({ workload }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: 'var(--space-4)',
    }}>
      {workload.map((member) => (
        <WorkloadCard
          key={member.id}
          member={member}
          selected={expandedId === member.id}
          onClick={() => setExpandedId(expandedId === member.id ? null : member.id)}
        >
          {expandedId === member.id && <PriorityBars member={member} />}
        </WorkloadCard>
      ))}
    </div>
  );
}
