
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create note",
  description: "Create note",
   openGraph: {
      title: "Create note",
     description: "Create note",
      url: `https://notehub.com/notes/action/create`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1ysfcv6*_gcl_au*ODUyOTQ5MTQ0LjE3NzcxOTI2ODU.*_ga*MTcyMDgxMzYzMC4xNzYyNzk3NTM2*_ga_PW0T7S5LDQ*czE3ODA4MTg2NzEkbzEyOSRnMSR0MTc4MDgyMDU2MCRqNTYkbDAkaDA.',
          width: 1200,
          height: 630,
          alt: "Create note",
        },
      ],
    },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
              <h1 className={css.title}>Create note</h1>
              {<NoteForm/>}
      </div>
    </main>
  );
};

export default CreateNote;
