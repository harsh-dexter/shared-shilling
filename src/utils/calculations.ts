import { Expense } from "@/data/mockData";

export interface MemberBalance {
  name: string;
  totalPaid: number;
  totalOwed: number;
  netBalance: number;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export function calculateBalances(expenses: Expense[], members: string[]): MemberBalance[] {
  const balances: Record<string, MemberBalance> = {};

  // Initialize balances for all members
  members.forEach(member => {
    balances[member] = {
      name: member,
      totalPaid: 0,
      totalOwed: 0,
      netBalance: 0
    };
  });

  // Calculate paid and owed amounts
  expenses.forEach(expense => {
    const { paidBy, amount, participants } = expense;
    const splitAmount = amount / participants.length;

    balances[paidBy].totalPaid += amount;

    participants.forEach(participant => {
      balances[participant].totalOwed += splitAmount;
    });
  });

  // Calculate net balance
  Object.values(balances).forEach(balance => {
    balance.netBalance = balance.totalPaid - balance.totalOwed;
  });

  return Object.values(balances);
}

export function calculateSettlements(balances: MemberBalance[]): Settlement[] {
  const settlements: Settlement[] = [];
  
  // Create copies of net balances
  const debtors = balances
    .filter(b => b.netBalance < 0)
    .map(b => ({ name: b.name, amount: Math.abs(b.netBalance) }))
    .sort((a, b) => b.amount - a.amount);
  
  const creditors = balances
    .filter(b => b.netBalance > 0)
    .map(b => ({ name: b.name, amount: b.netBalance }))
    .sort((a, b) => b.amount - a.amount);

  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debt = debtors[i].amount;
    const credit = creditors[j].amount;
    const settleAmount = Math.min(debt, credit);

    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: Math.round(settleAmount * 100) / 100
    });

    debtors[i].amount -= settleAmount;
    creditors[j].amount -= settleAmount;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return settlements;
}
