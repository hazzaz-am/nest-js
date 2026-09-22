export interface Ticket {
  id: number;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "closed" | "in-progress";
  createdAt: string;
}
