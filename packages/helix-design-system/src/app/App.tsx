import { useState } from 'react';
import { Agentation } from 'agentation';
import { Sidebar, RAIL_WIDTH, PANEL_WIDTH } from './components/Sidebar';
import { groupOfSection } from './data/navigation';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Navigating (rail, search, cards) opens the panel of the destination's group.
  const goTo = (section: string) => {
    setActiveSection(section);
    setOpenGroup(groupOfSection(section));
    window.scrollTo({ top: 0 });
  };
  const sidebarWidth = RAIL_WIDTH + (openGroup ? PANEL_WIDTH : 0);

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-page)' }}>
        <Sidebar activeSection={activeSection} onSectionChange={goTo} openGroup={openGroup} onOpenGroupChange={setOpenGroup} />
        <Header
          left={sidebarWidth}
          panelOpen={openGroup !== null}
          onTogglePanel={() => setOpenGroup(openGroup ? null : groupOfSection(activeSection) ?? 'foundations')}
          onSectionChange={goTo}
        />
        <MainContent activeSection={activeSection} left={sidebarWidth} onSectionChange={goTo} />
      </div>
      {import.meta.env.DEV && <Agentation />}
    </>
  );
}
