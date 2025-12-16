export interface iMeal {
  id?: string | number;
  title: string;
  slug: string;
  image: string | File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export type iMealForm = Omit<iMeal, 'id' | 'slug' | 'image'> & {
  image: File;
};
