import { StudentsTable } from "@/components/students-table";

export function Students() {
  return (
    <div className="mx-4 lg:mx-6">
      <h1 className="text-2xl poppins-bold text-primary">Alunos</h1>
      <div className="my-8">
        <StudentsTable />
      </div>
    </div>
  );
}
