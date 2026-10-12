import { useState } from 'react';
import { Agentation } from 'agentation';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-page)' }}>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isCollapsed}
        />
        <Header
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onSectionChange={setActiveSection}
        />
        <MainContent
          activeSection={activeSection}
          isCollapsed={isCollapsed}
          onSectionChange={setActiveSection}
        />
      </div>
      {import.meta.env.DEV && <Agentation />}
    </>
  );
}