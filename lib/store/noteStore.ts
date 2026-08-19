import { RequestNote } from '@/types/note'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DraftNoteStore {
  draft: RequestNote
  setDraft: (note: RequestNote) => void
  clearDraft: () => void
}

const initialDraft: RequestNote = {
  title: '',
  content: '',
  tag: 'Todo',
}

export const useDraftStore = create<DraftNoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: RequestNote) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'Draft-note',
      partialize: (draftNoteStore) => ({ draft: draftNoteStore.draft }),
    },
  ),
)