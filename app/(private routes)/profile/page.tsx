import Link from "next/link"
import css from "./ProfilePage.module.css"
import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
   openGraph: {
      title: "Profile",
     description: "Profile pagep",
      url: `https://notehub.com/profile`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1ysfcv6*_gcl_au*ODUyOTQ5MTQ0LjE3NzcxOTI2ODU.*_ga*MTcyMDgxMzYzMC4xNzYyNzk3NTM2*_ga_PW0T7S5LDQ*czE3ODA4MTg2NzEkbzEyOSRnMSR0MTc4MDgyMDU2MCRqNTYkbDAkaDA.',
          width: 1200,
          height: 630,
          alt: "Profile",
        },
      ],
    },
};
const Profile = async () => {
  const { email, username, avatar } = await getMe();

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {username}
      </p>
      <p>
        Email: {email}
      </p>
    </div>
  </div>
</main>
  )
}

export default Profile