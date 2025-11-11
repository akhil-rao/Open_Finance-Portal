import { create } from 'zustand'

const initialState = {
  catalogTab: 'retail',
  catalogCategory: 'all',
  selectedApiId: null,
  docsExpanded: {},
  playgroundSelectedApi: null,
  playgroundLogs: []
}

const useAppStore = create((set) => ({
  ...initialState,
  setCatalogTab: (catalogTab) => set({ catalogTab }),
  setCatalogCategory: (catalogCategory) => set({ catalogCategory }),
  setSelectedApiId: (selectedApiId) => set({ selectedApiId }),
  toggleDocsExpanded: (id) =>
    set((state) => ({ docsExpanded: { ...state.docsExpanded, [id]: !state.docsExpanded[id] } })),
  setPlaygroundSelectedApi: (playgroundSelectedApi) => set({ playgroundSelectedApi }),
  addPlaygroundLog: (log) =>
    set((state) => ({ playgroundLogs: [...state.playgroundLogs, { id: Date.now(), ...log }] })),
  resetPlaygroundLogs: () => set({ playgroundLogs: [] })
}))

export default useAppStore
