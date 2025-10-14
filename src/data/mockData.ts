export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  expenses: Expense[];
}

export const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Goa Trip",
    members: ["Alice", "Bob", "Carol", "Dave"],
    expenses: [
      {
        id: "e1",
        title: "Groceries",
        amount: 100,
        paidBy: "Alice",
        participants: ["Alice", "Bob", "Carol", "Dave"],
        date: "2025-10-12"
      },
      {
        id: "e2",
        title: "Utility Bill",
        amount: 60,
        paidBy: "Bob",
        participants: ["Alice", "Bob"],
        date: "2025-10-13"
      },
      {
        id: "e3",
        title: "Cab Fare",
        amount: 120,
        paidBy: "Carol",
        participants: ["Bob", "Carol", "Dave"],
        date: "2025-10-14"
      }
    ]
  },
  {
    id: "g2",
    name: "Roommates",
    members: ["John", "Jane", "Jack"],
    expenses: [
      {
        id: "e4",
        title: "Rent",
        amount: 1500,
        paidBy: "John",
        participants: ["John", "Jane", "Jack"],
        date: "2025-10-01"
      },
      {
        id: "e5",
        title: "Internet Bill",
        amount: 50,
        paidBy: "Jane",
        participants: ["John", "Jane", "Jack"],
        date: "2025-10-05"
      }
    ]
  }
];
