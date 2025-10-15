import { Users, TrendingUp } from "lucide-react";
import { GroupCard } from "@/components/GroupCard";
import { CreateGroupDialog } from "@/components/CreateGroupDialog";
import { useGroups } from "@/contexts/GroupContext";

const Index = () => {
  const { groups, addGroup } = useGroups();

  const handleCreateGroup = (group: { name: string; members: string[] }) => {
    addGroup({
      name: group.name,
      members: group.members,
      expenses: [],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Split Expenses Simply
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Track shared expenses with friends, split bills fairly, and settle up with ease
            </p>
            <div className="flex flex-wrap gap-4">
              <CreateGroupDialog onCreateGroup={handleCreateGroup} />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {groups.reduce((sum, g) => sum + g.members.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {groups.reduce((sum, g) => sum + g.expenses.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  ₹{groups.reduce((sum, g) => 
                    sum + g.expenses.reduce((expSum, exp) => expSum + exp.amount, 0), 0
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Tracked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Groups</h2>
            <p className="text-muted-foreground">Manage and track expenses across groups</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
