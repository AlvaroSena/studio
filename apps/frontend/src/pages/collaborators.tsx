import { CollaboratorsTable } from "@/components/collaborators-table";

export function Collaborators() {
  return (
    <div className="mx-4 lg:mx-6">
      <h1 className="text-2xl poppins-bold text-primary">Colaboradores</h1>
      <div className="my-8">
        <CollaboratorsTable />
      </div>
    </div>
  );
}
