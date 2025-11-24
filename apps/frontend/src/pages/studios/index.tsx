import { Button } from "@/components/ui/button";

import { StudiosTable } from "@/components/studios-table";

export function Studios() {
  return (
    <div className="mx-8">
      <div className="flex flex-row items-center justify-between mb-8">
        <h1>Studios</h1>
        <Button>Novo Estúdio</Button>
      </div>

      <StudiosTable />
    </div>
  );
}
