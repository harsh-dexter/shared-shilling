import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExpenseCard } from "@/components/ExpenseCard";
import { BalanceSummary } from "@/components/BalanceSummary";
import { SettlementList } from "@/components/SettlementList";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { mockGroups, Expense } from "@/data/mockData";
import { calculateBalances, calculateSettlements } from "@/utils/calculations";

const GroupDetail = () => {
  const { groupId } = useParams();
  const group = mockGroups.find((g) => g.id === groupId);

  const [expenses, setExpenses] = useState<Expense[]>(group?.expenses || []);

  if (!group) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Group not found</h2>
          <Link to="/">
            <Button variant="outline">Go back home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const balances = calculateBalances(expenses, group.members);
  const settlements = calculateSettlements(balances);

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const expense: Expense = {
      ...newExpense,
      id: `e${Date.now()}`
    };
    setExpenses([expense, ...expenses]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 gap-2 text-primary-foreground hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" />
              Back to Groups
            </Button>
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{group.name}</h1>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Users className="h-4 w-4" />
                <span>{group.members.join(", ")}</span>
              </div>
            </div>
            <AddExpenseDialog members={group.members} onAddExpense={handleAddExpense} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Expenses */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Expenses</h2>
              <span className="text-muted-foreground">{expenses.length} total</span>
            </div>
            {expenses.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No expenses yet. Add one to get started!</p>
              </div>
            ) : (
              expenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <BalanceSummary balances={balances} />
            <SettlementList settlements={settlements} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
