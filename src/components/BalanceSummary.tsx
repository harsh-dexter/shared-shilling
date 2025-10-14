import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MemberBalance } from "@/utils/calculations";

interface BalanceSummaryProps {
  balances: MemberBalance[];
}

export function BalanceSummary({ balances }: BalanceSummaryProps) {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Balance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {balances.map((balance) => {
            const isPositive = balance.netBalance > 0.01;
            const isNegative = balance.netBalance < -0.01;
            const isSettled = !isPositive && !isNegative;

            return (
              <div
                key={balance.name}
                className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:shadow-soft transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    isPositive ? 'bg-positive/10' : 
                    isNegative ? 'bg-negative/10' : 
                    'bg-muted'
                  }`}>
                    {isPositive ? (
                      <ArrowUp className="h-4 w-4 text-positive" />
                    ) : isNegative ? (
                      <ArrowDown className="h-4 w-4 text-negative" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{balance.name}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span>Paid: ₹{balance.totalPaid.toFixed(2)}</span>
                      <span>Share: ₹{balance.totalOwed.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={isPositive ? "default" : isNegative ? "destructive" : "secondary"}
                    className={
                      isPositive ? "bg-positive hover:bg-positive/90" :
                      isNegative ? "bg-negative hover:bg-negative/90" :
                      ""
                    }
                  >
                    {isSettled ? 'Settled' : 
                     isPositive ? `+₹${balance.netBalance.toFixed(2)}` : 
                     `₹${balance.netBalance.toFixed(2)}`}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isSettled ? 'All paid up' :
                     isPositive ? 'Gets back' : 
                     'Owes'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
