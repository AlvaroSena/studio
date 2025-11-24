import { PlansTable } from "@/components/plans-table";

export function Plans() {
  return (
    <div className="mx-8">
      <h1 className="text-2xl poppins-bold text-primary">Planos</h1>
      <div className="my-8">
        <PlansTable />
      </div>
    </div>
  );
}
