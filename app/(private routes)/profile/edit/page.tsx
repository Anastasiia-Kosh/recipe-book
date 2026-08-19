"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { EditRequest, updateMe } from "@/lib/api/clientApi";

const ProfileEdit = () => {
  const router = useRouter();
  const user = useAuth((store) => store.user);
const setUser = useAuth((store) => store.setUser);

  const handleEditUsername = async (action: FormData) => {
    try {
      const editData: EditRequest = {
        username: action.get("username") as string,
      };
      const user = await updateMe(editData);
    if (user) {
  setUser(user);
  router.push("/profile");
}
    } catch {
      alert("Something went wrong...");
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar as string} 
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleEditUsername}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                router.push("/profile");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfileEdit;
