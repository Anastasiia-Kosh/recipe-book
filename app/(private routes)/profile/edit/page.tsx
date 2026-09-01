"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { updateAvatar, updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

const ProfileEdit = () => {
  const router = useRouter();
  const user = useAuth((store) => store.user);
  const setUser = useAuth((store) => store.setUser);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const handleEditUsername = async (formData: FormData) => {
    const username = formData.get("username")?.toString().trim() ?? "";

    try {
      const updatedUser = await updateMe({ username });

      setUser(updatedUser);

      toast.success("Профіль оновлено");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error("Не вдалося оновити профіль");
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || !user) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
    setIsAvatarUploading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const result = await updateAvatar(formData);

      setUser({
        ...user,
        avatar: result.url,
      });

      setAvatarPreview(null);
      toast.success("Фото профілю оновлено");
    } catch (error) {
      console.error("Failed to update avatar:", error);

      setAvatarPreview(null);
      toast.error("Не вдалося оновити фото");
    } finally {
      setIsAvatarUploading(false);
      URL.revokeObjectURL(previewUrl);
      event.target.value = "";
    }
  };
  if (!user) {
  return <p>Завантаження...</p>;
}

const currentUser = user;
  return (
    <section className={css.page}>
      <div className="container">
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Редагувати профіль</h1>

        <div className={css.avatarSection}>
          <p className={css.label}>Фото профілю</p>

          <label htmlFor="avatar" className={css.avatarPicker}>
            <Image
              src={avatarPreview ?? currentUser.avatar}
              alt="Фото профілю"
              fill
              className={css.avatar}
              sizes="160px"
            />

            <div className={css.avatarOverlay}>
              {isAvatarUploading ? (
                <Loader size="small" />
              ) : (
                <span>✎ Змінити фото</span>
              )}
            </div>
          </label>

          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={isAvatarUploading}
            className={css.hiddenFileInput}
          />
        </div>
        <form className={css.profileInfo} action={handleEditUsername}>
          <div className={css.field}>
            <label htmlFor="username" className={css.label}>
              Ім&apos;я користувача
            </label>

            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              required
              className={css.input}
            />
          </div>

          <div className={css.field}>
            <p className={css.label}>Email</p>
            <p className={css.email}>{currentUser.email}</p>
          </div>

          <div className={css.actions}>
            <SubmitButton pendingText="Зберігаємо...">
              Зберегти зміни
            </SubmitButton>

            <Link href="/profile" className={css.cancelButton}>
              Скасувати
            </Link>
          </div>
        </form>
        </div>
        </div>
    </section>
  );
};

export default ProfileEdit;
