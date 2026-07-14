import React, { useState } from 'react';

export const ConfidentialContent = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.85)', color: '#ffffff', padding: '1.5rem 2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <span style={{ color: '#ffffff' }}>⚠️ Confidential Content</span><br/>
          <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.8, color: '#ffffff', display: 'block', marginBottom: '1rem' }}>
            This section is locked.
          </span>
          <button 
            onClick={() => {
              const pwd = prompt("Enter unlock password:");
              // Using a simple client-side password (e.g., 'helix2026')
              if (pwd === "helix2026") {
                setUnlocked(true);
              } else if (pwd !== null) {
                alert("Incorrect password.");
              }
            }}
            style={{
              background: '#ffffff', color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem'
            }}
          >
            Unlock Content
          </button>
        </div>
      </div>
      
      {/* 
        This is just DUMMY text for the blur effect.
        The real content is NOT rendered in the DOM until unlocked, 
        making it impossible to bypass with "Inspect Element".
      */}
      <div style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.7 }}>
        <h1>Loading Content...</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h2>Section placeholder</h2>
        <ul>
          <li>Hidden content item 1 that is appropriately long.</li>
          <li>Hidden content item 2 that is appropriately long.</li>
          <li>Hidden content item 3 that is appropriately long.</li>
        </ul>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        <div style={{ height: '300px', background: '#e5e5e5', marginTop: '2rem', borderRadius: '8px' }}></div>
      </div>
    </div>
  );
};
