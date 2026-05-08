import { useState } from 'react';
import WorkloadCard from '../WorkloadCard';
import Modal from '../../common/Modal';

const PRIORITIES = [
  { key: 'urgent_count', label: 'Urgent', color: 'var(--color-priority-urgent)', bg: 'var(--color-error-light)' },
  { key: 'high_count',   label: 'High',   color: 'var(--color-priority-high)',   bg: '#fff4ed' },
  { key: 'medium_count', label: 'Medium', color: 'var(--color-priority-medium)', bg: 'var(--color-accent-light)' },
  { key: 'low_count',    label: 'Low',    color: 'var(--color-priority-low)',    bg: 'var(--color-surface-hover)' },
];

function MemberDetail({ member }) {
  const isOverloaded = member.urgent_count >= 3;
  const initials = member.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const max = Math.max(member.urgent_count, member.high_count, member.medium_count, member.low_count, 1);

  return (
    <div>
      {/* Member identity */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-5)',
        background: isOverloaded ? 'var(--color-error-light)' : 'var(--color-bg)',
        borderRadius: 'var(--border-radius-md)',
        marginBottom: 'var(--space-5)',
        border: isOverloaded ? '1px solid var(--color-priority-urgent)' : '1px solid var(--color-border)',
      }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: 'var(--border-radius-full)',
          background: member.avatar_color || 'var(--color-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 'var(--font-weight-bold)',
          fontSize: 'var(--font-size-xl)', flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-lg)' }}>{member.name}</span>
            {isOverloaded && (
              <span style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-priority-urgent)',
                border: '1px solid var(--color-priority-urgent)',
                borderRadius: 'var(--border-radius-full)',
                padding: '1px var(--space-2)',
              }}>Overloaded</span>
            )}
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{member.role}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>{member.email}</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-5)',
      }}>
        <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--border-radius-md)', padding: 'var(--space-4)', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text)' }}>{member.total_count}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Total Tasks</div>
        </div>
        <div style={{ background: isOverloaded ? 'var(--color-error-light)' : 'var(--color-bg)', borderRadius: 'var(--border-radius-md)', padding: 'var(--space-4)', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: member.urgent_count >= 3 ? 'var(--color-priority-urgent)' : 'var(--color-text)' }}>{member.urgent_count}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Urgent</div>
        </div>
      </div>

      {/* Priority breakdown */}
      <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
        Priority Breakdown
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {PRIORITIES.map(({ key, label, color, bg }) => (
          <div key={key} style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
            background: bg, borderRadius: 'var(--border-radius-md)', padding: 'var(--space-3) var(--space-4)',
          }}>
            <div style={{ width: '52px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, height: '8px', background: 'rgba(0,0,0,0.08)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(member[key] / max) * 100}%`,
                background: color,
                borderRadius: 'var(--border-radius-full)',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <div style={{ width: '24px', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: member[key] > 0 ? color : 'var(--color-text-muted)', textAlign: 'right', flexShrink: 0 }}>
              {member[key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ModalDeepDive({ workload }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 'var(--space-4)',
      }}>
        {workload.map((member) => (
          <WorkloadCard
            key={member.id}
            member={member}
            selected={selected?.id === member.id}
            onClick={() => setSelected(member)}
          />
        ))}
      </div>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
      >
        {selected && <MemberDetail member={selected} />}
      </Modal>
    </>
  );
}
