import { Link } from "react-router-dom";
import { Users, Receipt, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Group } from "@/data/mockData";
import { calculateBalances } from "@/utils/calculations";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const totalExpenses = group.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balances = calculateBalances(group.expenses, group.members);
  const unsettled = balances.some(b => Math.abs(b.netBalance) > 0.01);

  return (
    <Link to={`/group/${group.id}`}>
      <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer border-border bg-gradient-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-semibold">{group.name}</CardTitle>
            {unsettled && (
              <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                Unsettled
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">{group.members.length} members</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Receipt className="h-4 w-4" />
            <span className="text-sm">{group.expenses.length} expenses</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-xl font-bold text-foreground">₹{totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
