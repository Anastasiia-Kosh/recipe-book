"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { updateAvatar, updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import Icon from "@/components/Icon/Icon";

const ProfileEdit = () => {
  const router = useRouter();
  const user = useAuth((store) => store.user);
  const setUser = useAuth((store) => store.setUser);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || !user) {
      return;
    }
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
    setSelectedAvatar(file);
  };
  const handleSaveProfile = async (formData: FormData) => {
    const username = formData.get("username")?.toString().trim() ?? "";

    try {
      const avatarFormData = new FormData();

      if (selectedAvatar) {
        avatarFormData.append("avatar", selectedAvatar);
      }

      const [updatedUser, avatarResult] = await Promise.all([
        updateMe({ username }),
        selectedAvatar ? updateAvatar(avatarFormData) : Promise.resolve(null),
      ]);

      setUser({
        ...updatedUser,
        avatar: avatarResult?.url ?? updatedUser.avatar,
      });

      toast.success("Профіль оновлено");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Не вдалося оновити профіль");
    }
  };
  if (!user) {
    return (
      <div className={css.loading}>
        <Loader />
      </div>
    );
  }
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Редагувати профіль</h1>

          <div className={css.avatarSection}>
            <p className={css.label}>Фото профілю</p>

            <label htmlFor="avatar" className={css.avatarPicker}>
              <Image
                src={avatarPreview ?? user.avatar}
                alt="Фото профілю"
                fill
                className={css.avatar}
                sizes="160px"
              />

              <div className={css.avatarOverlay}>
                <span className={css.changePhoto}>
                  <Icon name="pencil" size={18} />
                  Змінити фото
                </span>
              </div>
            </label>

            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={css.hiddenFileInput}
            />
          </div>
          <form className={css.profileInfo} action={handleSaveProfile}>
            <div className={css.field}>
              <label htmlFor="username" className={css.label}>
                Ім&apos;я користувача
              </label>

              <input
                id="username"
                name="username"
                type="text"
                defaultValue={user.username}
                required
                className={css.input}
              />
            </div>

            <div className={css.field}>
              <p className={css.label}>Email</p>
              <p className={css.email}>{user.email}</p>
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
