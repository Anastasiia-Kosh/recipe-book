"use client"
import { useRouter } from 'next/navigation'
import { ChangeEvent} from 'react'
import css from "./NoteForm.module.css";
import { useDraftStore } from '@/lib/store/noteStore';
import { RequestNote } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';


export default function NoteForm() {
  const router = useRouter()
  const { draft, setDraft, clearDraft } = useDraftStore()
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
      mutationFn: (newNote: RequestNote) => createNote(newNote),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notes"],
        })
      }
  })

  const handleSubmit = async (action: FormData) => {
    const newNote: RequestNote = {
      title: action.get('title') as string,
      content: action.get('content') as string,
      tag: action.get('tag') as string,
    }
    await mutateAsync(newNote)
    clearDraft()
    router.push('/notes/filter/all')
  }

    const handleCancel = () => {
    router.back()
  }

    const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value })
  }
  
  return (
    <form action={handleSubmit} className={css.form}>
          <fieldset className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" defaultValue={draft.title} onChange={handleChange}/>
          </fieldset>

          <fieldset className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
          className={css.textarea}
          defaultValue={draft.content} onChange={handleChange}
            />
          </fieldset>

          <fieldset className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select
              id="tag"
              name="tag"
              className={css.select} defaultValue={draft.tag} onChange={handleChange}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </fieldset>

          <div className={css.actions}>
            <button
              type="button"
          onClick={handleCancel}
              className={css.cancelButton}  disabled={isPending}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isPending}>
              Create note
            </button>
          </div>
  
    </form>
  );
}