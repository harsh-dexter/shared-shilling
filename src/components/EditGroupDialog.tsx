import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
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
import { Group } from "@/data/mockData";

interface EditGroupDialogProps {
  group: Group;
  onUpdateGroup: (group: Group) => void;
}

export function EditGroupDialog({ group, onUpdateGroup }: EditGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState(group.name);
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>(group.members);

  useEffect(() => {
    if (open) {
      setGroupName(group.name);
      setMembers(group.members);
    }
  }, [open, group]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    if (members.length === 0) {
      toast.error("Group must have at least one member");
      return;
    }

    onUpdateGroup({
      ...group,
      name: groupName,
      members,
    });

    setOpen(false);
    toast.success("Group updated successfully!");
  };

  const addMember = () => {
    const trimmedName = memberInput.trim();
    if (!trimmedName) {
      toast.error("Please enter a member name");
      return;
    }

    if (members.includes(trimmedName)) {
      toast.error("This member is already in the group");
      return;
    }

    setMembers((prev) => [...prev, trimmedName]);
    setMemberInput("");
  };

  const removeMember = (member: string) => {
    if (members.length === 1) {
      toast.error("Group must have at least one member");
      return;
    }
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
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Edit Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle>Edit Group Details</DialogTitle>
          <DialogDescription>
            Update group name and manage members
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
            <Label htmlFor="member">Add Member</Label>
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
