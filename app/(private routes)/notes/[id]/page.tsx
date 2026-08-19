import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)
  return {
    title: `Note: ${note.title}`,
    description: note.content,
    openGraph: {
       title: `Note: ${note.title}`,
    description: note.content,
      url: `https://notehub.com/notes/${note.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1ysfcv6*_gcl_au*ODUyOTQ5MTQ0LjE3NzcxOTI2ODU.*_ga*MTcyMDgxMzYzMC4xNzYyNzk3NTM2*_ga_PW0T7S5LDQ*czE3ODA4MTg2NzEkbzEyOSRnMSR0MTc4MDgyMDU2MCRqNTYkbDAkaDA.',
          width: 1200,
          height: 630,
          alt: "Note",
        },
      ],
  }
  }
}



const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
