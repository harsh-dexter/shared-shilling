import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface CreateGroupDialogProps {
  onCreateGroup: (group: { name: string; members: string[] }) => void;
}

export function CreateGroupDialog({ onCreateGroup }: CreateGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    if (members.length === 0) {
      toast.error("Please add at least one member");
      return;
    }

    onCreateGroup({
      name: groupName,
      members,
    });

    // Reset form
    setGroupName("");
    setMembers([]);
    setMemberInput("");
    setOpen(false);

    toast.success("Group created successfully!");
  };

  const addMember = () => {
    const trimmedName = memberInput.trim();
    if (!trimmedName) {
      toast.error("Please enter a member name");
      return;
    }

    if (members.includes(trimmedName)) {
      toast.error("This member is already added");
      return;
    }

    setMembers((prev) => [...prev, trimmedName]);
    setMemberInput("");
  };

  const removeMember = (member: string) => {
    setMembers((prev) => prev.filter((m) => m !== member));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMember();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary" className="gap-2">
          <Plus className="h-5 w-5" />
          Create New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Start a new expense group with your roommates or travel companions
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              placeholder="e.g., Goa Trip, Roommates"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="member">Add Members</Label>
            <div className="flex gap-2">
              <Input
                id="member"
                placeholder="Enter member name"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addMember} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {members.length > 0 && (
            <div className="space-y-2">
              <Label>Members ({members.length})</Label>
              <div className="flex flex-wrap gap-2 rounded-lg border border-border p-3 bg-muted/20">
                {members.map((member) => (
                  <Badge
                    key={member}
                    variant="secondary"
                    className="gap-1 pr-1 text-sm"
                  >
                    {member}
                    <button
                      type="button"
                      onClick={() => removeMember(member)}
                      className="ml-1 rounded-full p-0.5 hover:bg-destructive/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              Create Group
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
