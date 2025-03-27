import { createContext, useContext, ReactNode, useState } from 'react';

export type TreeViewerContextType = {
  onSelect: ({ path, value }: { path: string; value: any }) => void;
};

const TreeViewerContext = createContext<TreeViewerContextType | undefined>(undefined);

type TreeViewerProviderProps = {
  children: ReactNode;
  onSelect: TreeViewerContextType['onSelect'];
};

export function TreeViewerProvider({ children, onSelect }: TreeViewerProviderProps) {
  return <TreeViewerContext.Provider value={{ onSelect }}>{children}</TreeViewerContext.Provider>;
}

export function useTreeViewer() {
  const context = useContext(TreeViewerContext);

  if (context === undefined) {
    throw new Error('useTreeViewer must be used within a TreeViewerProvider');
  }

  return context;
}
