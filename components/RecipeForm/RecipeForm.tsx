import { recipeCategories } from "@/types/recipe";

export default function RecipeForm() {
  async function handleSubmit(formData: FormData) {
      "use server";
    const recipe = {
      category: formData.get("category"),
      image: formData.get("image"),
      title: formData.get("title"),
      shortDescription: formData.get("shortDescription"),
      text: formData.get("text"),
    };

    console.log(recipe);
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="category">Категорія</label>

        <select
          id="category"
          name="category"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Оберіть категорію
          </option>

          {recipeCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image">Фото</label>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required
        />
      </div>

      <div>
        <label htmlFor="title">Заголовок</label>

        <input
          id="title"
          name="title"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="shortDescription">
          Короткий опис
        </label>

        <textarea
          id="shortDescription"
          name="shortDescription"
          required
        />
      </div>

      <div>
        <label htmlFor="text">Текст рецепта</label>

        <textarea
          id="text"
          name="text"
          rows={15}
          required
        />
      </div>

      <button type="submit">
        Створити рецепт
      </button>
    </form>
  );
}