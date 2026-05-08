import { useState } from 'react';
import { useTeam } from '../hooks/useTeam';
import MemberList from '../components/team/MemberList';
import WorkloadView from '../components/team/WorkloadView';
import Spinner from '../components/common/Spinner';

export default function Team() {
  const { data: members, loading } = useTeam();
  const [view, setView] = useState('list');

  if (loading) return <Spinner />;

  const btnBase = {
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-md)',
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  };

  const activeBtn = {
    ...btnBase,
    background: 'var(--color-primary)',
    color: '#fff',
    borderColor: 'var(--color-primary)',
  };

  const inactiveBtn = {
    ...btnBase,
    background: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>Team</h1>
          <p>{view === 'list' ? 'Your product team members' : 'Task load by priority per member'}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
          <button style={view === 'list' ? activeBtn : inactiveBtn} onClick={() => setView('list')}>List</button>
          <button style={view === 'workload' ? activeBtn : inactiveBtn} onClick={() => setView('workload')}>Workload</button>
        </div>
      </div>

      {view === 'list' ? <MemberList members={members} /> : <WorkloadView />}
    </div>
  );
}
