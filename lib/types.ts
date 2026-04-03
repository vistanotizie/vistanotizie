export type Category = "politica" | "cronaca" | "sport" | "economia" | "locale";

export type NewsItem = {
  id: number;
  title: string;
  summary: string;
  category: Category;
  city: string;
  date: string;
  sourceName: string;
  sourceUrl: string;
  image: string;
  tags: string[];
};
