import { Metadata } from "next";
import css from "./page.module.css"

export const metadata: Metadata = {
    title: "Page not found",
  description: "Page not found",
  openGraph: {
       title: "Page not found",
    description: "Page not found",
      url: `https://notehub.com/notes`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1ysfcv6*_gcl_au*ODUyOTQ5MTQ0LjE3NzcxOTI2ODU.*_ga*MTcyMDgxMzYzMC4xNzYyNzk3NTM2*_ga_PW0T7S5LDQ*czE3ODA4MTg2NzEkbzEyOSRnMSR0MTc4MDgyMDU2MCRqNTYkbDAkaDA.',
          width: 1200,
          height: 630,
          alt: "Page not found",
        },
      ],
  }
}

const NotFound = () => {
  return (
    <div className={css.container}>
<h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;