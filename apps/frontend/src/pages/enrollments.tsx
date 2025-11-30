import { EnrollmentsTable } from "@/components/enrollments-table";
import { getEnrollmentsByClass } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type EnrollmentType = {
  id: string;
  classId: string;
  studentId: string;
  studentName: string;
  classTitle: string;
};

export function Enrollments() {
  const { classId } = useParams();

  const [enrollments, setEnrollments] = useState<EnrollmentType[]>([]);

  const loadEnrollments = async (classId: string) => {
    const data = await getEnrollmentsByClass(classId);

    if (data) {
      setEnrollments(data);
    }
  };

  useEffect(() => {
    if (!classId) {
      return;
    }

    loadEnrollments(classId);
  }, [classId]);

  return (
    <div className="mx-4 lg:mx-6">
      <h1 className="text-2xl poppins-bold text-primary">Matrículas</h1>
      <div className="my-8">
        <EnrollmentsTable
          data={enrollments}
          onRefetch={() => loadEnrollments(classId ?? "")}
        />
      </div>
    </div>
  );
}
