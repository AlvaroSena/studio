import { EnrollmentsTable } from "@/components/enrollments-table";
import { getEnrollments } from "@/lib/api";
import { useEffect, useState } from "react";

export type EnrollmentType = {
  id: string;
  classId: string;
  studentId: string;
  studentName: string;
  classTitle: string;
};

export function Enrollments() {
  const [enrollments, setEnrollments] = useState<EnrollmentType[]>([]);

  const loadEnrollments = async () => {
    const data = await getEnrollments();

    if (data) {
      setEnrollments(data);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  return (
    <div>
      <h1 className="text-2xl poppins-bold text-primary">Matrículas</h1>
      <div className="my-8">
        <EnrollmentsTable
          data={enrollments}
          onRefetch={() => loadEnrollments()}
        />
      </div>
    </div>
  );
}
