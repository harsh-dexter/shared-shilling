import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settlement } from "@/utils/calculations";

interface SettlementListProps {
  settlements: Settlement[];
}

export function SettlementList({ settlements }: SettlementListProps) {
  if (settlements.length === 0) {
    return (
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Settlement Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-3">
              <span className="text-3xl">✓</span>
            </div>
            <p className="text-muted-foreground">All balances are settled!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Settlement Suggestions</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Minimal transactions to settle all debts
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {settlements.map((settlement, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
            >
              <div className="flex-1 flex items-center justify-between">
                <span className="font-semibold text-foreground">{settlement.from}</span>
                <ArrowRight className="h-5 w-5 text-primary mx-2" />
                <span className="font-semibold text-foreground">{settlement.to}</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">₹{settlement.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
