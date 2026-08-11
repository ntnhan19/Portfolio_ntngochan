'use client';
import React, { createContext, useContext, useState } from 'react';

interface RecruiterModeContextValue {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextValue | null>(null);

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  return (
    <RecruiterModeContext.Provider value={{ isRecruiterMode, toggleRecruiterMode: () => setIsRecruiterMode(p => !p) }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const ctx = useContext(RecruiterModeContext);
  if (!ctx) throw new Error('useRecruiterMode must be used within RecruiterModeProvider');
  return ctx;
}
