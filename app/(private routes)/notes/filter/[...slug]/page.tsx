import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/serverApi";
import NotesClientSlug from "./Notes.client";
import { Metadata } from "next";


interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `${slug[0]}`,
    description: `Notes categories ${slug[0]}`,
   openGraph: {
       title: `Notes categories ${slug[0]}`,
    description: `Notes categories ${slug[0]}`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1ysfcv6*_gcl_au*ODUyOTQ5MTQ0LjE3NzcxOTI2ODU.*_ga*MTcyMDgxMzYzMC4xNzYyNzk3NTM2*_ga_PW0T7S5LDQ*czE3ODA4MTg2NzEkbzEyOSRnMSR0MTc4MDgyMDU2MCRqNTYkbDAkaDA.',
          width: 1200,
          height: 630,
          alt: "Notes by categories",
        },
      ],
  }
  }
}

const NotesByCategory = async ({ params }: Props) => {
  
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClientSlug tagSearch={tag} />
    </HydrationBoundary>
  );
};
export default NotesByCategory;
