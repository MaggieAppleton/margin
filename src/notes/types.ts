export type Note = {
  id: string;
  title: string;
  body: string;
  reminderAt?: number | string | null;
  createdAt: number;
};
