import { Receipt, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Expense } from "@/data/mockData";

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const splitAmount = expense.amount / expense.participants.length;

  return (
    <Card className="hover:shadow-soft transition-all duration-200 bg-gradient-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            <div className="p-2 rounded-lg bg-primary/10">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{expense.title}</h3>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{expense.participants.length} people</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Paid by <span className="font-medium text-foreground">{expense.paidBy}</span>
              </p>
            </div>
          </div>
          <div className="text-right ml-4">
            <p className="text-xl font-bold text-foreground">₹{expense.amount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">₹{splitAmount.toFixed(2)}/person</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
