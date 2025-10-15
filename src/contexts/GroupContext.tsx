import { createContext, useContext, useState, ReactNode } from "react";
import { Group } from "@/data/mockData";
import { mockGroups } from "@/data/mockData";

interface GroupContextType {
  groups: Group[];
  addGroup: (group: Omit<Group, "id">) => void;
  getGroup: (id: string) => Group | undefined;
  updateGroup: (id: string, group: Group) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>(mockGroups);

  const addGroup = (group: Omit<Group, "id">) => {
    const newGroup: Group = {
      ...group,
      id: `g${Date.now()}`,
    };
    setGroups((prev) => [...prev, newGroup]);
  };

  const getGroup = (id: string) => {
    return groups.find((g) => g.id === id);
  };

  const updateGroup = (id: string, updatedGroup: Group) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? updatedGroup : g))
    );
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup, getGroup, updateGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroups() {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroups must be used within GroupProvider");
  }
  return context;
}
