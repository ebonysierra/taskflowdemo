import { useState } from 'react';
import { useWorkload } from '../../hooks/useWorkload';
import Spinner from '../common/Spinner';
import ExpandableRows from './variants/ExpandableRows';
import SlideOutPanel from './variants/SlideOutPanel';
import ModalDeepDive from './variants/ModalDeepDive';

const VARIANTS = [
  { id: 'expandable', label: 'Expandable Rows', Component: ExpandableRows },
  { id: 'slide',      label: 'Slide-Out Panel', Component: SlideOutPanel },
  { id: 'modal',      label: 'Modal Deep-Dive', Component: ModalDeepDive },
];

export default function WorkloadView() {
  const { data: workload, loading, error, refetch } = useWorkload();
  const [activeVariant, setActiveVariant] = useState('expandable');

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-12)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)' }}>
          Failed to load workload data
        </div>
        <button
          onClick={refetch}
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--space-2) var(--space-5)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const active = VARIANTS.find((v) => v.id === activeVariant);

  return (
    <div>
      {/* Variant tabs */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 'var(--space-3)',
      }}>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            style={{
              background: activeVariant === v.id ? 'var(--color-primary-light)' : 'none',
              border: 'none',
              borderBottom: activeVariant === v.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeVariant === v.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              fontWeight: activeVariant === v.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
              fontSize: 'var(--font-size-sm)',
              padding: 'var(--space-2) var(--space-4)',
              cursor: 'pointer',
              borderRadius: 'var(--border-radius-sm) var(--border-radius-sm) 0 0',
              transition: 'color var(--transition-fast)',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-5)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-muted)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: 'var(--color-error-light)', border: '1px solid var(--color-priority-urgent)' }} />
          Overloaded (3+ urgent)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: 'var(--color-surface-hover)', opacity: 0.5 }} />
          No tasks assigned
        </span>
        <span style={{ marginLeft: 'auto' }}>Click a card to {activeVariant === 'expandable' ? 'expand' : activeVariant === 'slide' ? 'open panel' : 'open detail'}</span>
      </div>

      <active.Component workload={workload} />
    </div>
  );
}
