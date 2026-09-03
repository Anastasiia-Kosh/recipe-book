import css from "./Icon.module.css";

export type IconName =
  | "camera"
  | "pencil"
  | "bookmark"
  | "ingredients"
  | "preparation"
  | "trash"
  | "edit"
  | "back"
  | "logo";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export default function Icon({
  name,
  size = 24,
  className = "",
}: IconProps) {
  return (
    <svg
      className={`${css.icon} ${className}`}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}