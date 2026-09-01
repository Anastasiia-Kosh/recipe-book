import Image from "next/image";
import Link from "next/link";
import css from "./RecipesEmptyState.module.css";

interface RecipesEmptyStateProps {
  image: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
}

export default function RecipesEmptyState(
  props: RecipesEmptyStateProps,
) {
  return (
    <div className={css.emptyState}>
      <div className={css.imageWrapper}>
        <Image
          src={props.image}
          alt=""
          fill
          className={css.image}
          sizes="(min-width: 768px) 40vw, 80vw"
        />
      </div>

      <div className={css.content}>
        <h2 className={css.title}>{props.title}</h2>

        <p className={css.description}>
          {props.description}
        </p>

        <Link href={props.linkHref} className={css.link}>
          {props.linkText}
        </Link>
      </div>
    </div>
  );
}