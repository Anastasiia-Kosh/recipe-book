import css from "./page.module.css"

export default function Home() {
  return (
  <div className={css.container}>
    <h1 className={css.title}>RecipeBook</h1>
    <p className={css.description}>
      Моя книга рецептів
    </p>
  </div>
  );
}
