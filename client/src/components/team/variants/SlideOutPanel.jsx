import { useState } from 'react';
import WorkloadCard from '../WorkloadCard';

const PRIORITIES = [
  { key: 'urgent_count', label: 'Urgent', color: 'var(--color-priority-urgent)', bg: 'var(--color-error-light)' },
  { key: 'high_count',   label: 'High',   color: 'var(--color-priority-high)',   bg: '#fff4ed' },
  { key: 'medium_count', label: 'Medium', color: 'var(--color-priority-medium)', bg: 'var(--color-accent-light)' },
  { key: 'low_count',    label: 'Low',    color: 'var(--color-priority-low)',    bg: 'var(--color-surface-hover)' },
];

function Panel({ member, onClose }) {
  const initials = member.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const isOverloaded = member.urgent_count >= 3;
  const max = Math.max(member.urgent_count, member.high_count, member.medium_count, member.low_count, 1);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      width: '380px',
      background: 'var(--color-surface)',
      borderLeft: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 200,
      animation: 'slideIn 0.2s ease',
    }}>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

      {/* Panel header */}
      <div style={{
        padding: 'var(--space-5) var(--space-6)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isOverloaded ? 'var(--color-error-light)' : 'var(--color-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: 'var(--border-radius-full)',
            background: member.avatar_color || 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'var(--font-weight-semibold)',
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{member.name}</div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{member.role}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 'var(--font-size-xl)', color: 'var(--color-text-muted)',
            padding: 'var(--space-1)', lineHeight: 1,
          }}
        >×</button>
      </div>

      {/* Panel body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)' }}>
        {isOverloaded && (
          <div style={{
            background: 'var(--color-error-light)',
            border: '1px solid var(--color-priority-urgent)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            marginBottom: 'var(--space-5)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-priority-urgent)',
            fontWeight: 'var(--font-weight-medium)',
          }}>
            {member.urgent_count} urgent tasks — at capacity
          </div>
        )}

        <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
          Task Breakdown · {member.total_count} total
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {PRIORITIES.map(({ key, label, color, bg }) => (
            <div key={key} style={{
              background: bg,
              borderRadius: 'var(--border-radius-md)',
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}>
              <div style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: member[key] > 0 ? color : 'var(--color-text-muted)',
                width: '40px',
                textAlign: 'center',
                flexShrink: 0,
              }}>
                {member[key]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text)', marginBottom: '4px' }}>{label}</div>
                <div style={{ height: '6px', background: 'rgba(0,0,0,0.08)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(member[key] / max) * 100}%`,
                    background: color,
                    borderRadius: 'var(--border-radius-full)',
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SlideOutPanel({ workload }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 'var(--space-4)',
        transition: 'padding-right 0.2s ease',
        paddingRight: selected ? '400px' : 0,
      }}>
        {workload.map((member) => (
          <WorkloadCard
            key={member.id}
            member={member}
            selected={selected?.id === member.id}
            onClick={() => setSelected(selected?.id === member.id ? null : member)}
          />
        ))}
      </div>

      {selected && (
        <Panel member={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
