/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { api, getStudents, getStudioClasses } from "@/lib/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
// import { api } from "@/lib/api";

type StudentType = {
  id: string;
  name: string;
};

type ClassType = {
  id: string;
  title: string;
  date: Date;
};

interface MakeEnrollmentDialogProps {
  onRefetch: () => Promise<void>;
}

export function MakeEnrollmentDialog({ onRefetch }: MakeEnrollmentDialogProps) {
  const { studioId } = useParams();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [isPending, setTransition] = useState(false);

  const loadData = async () => {
    if (!studioId) {
      return;
    }

    const [studentsData, classesData] = await Promise.all([
      getStudents(),
      getStudioClasses(studioId),
    ]);

    if (studentsData && classesData) {
      setStudents(studentsData);
      setClasses(classesData);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateStudent = async () => {
    setTransition(true);

    try {
      const response = await api.post("/enrollments", {
        classId: selectedClassId,
        studentId: selectedStudentId,
      });

      if (response && response.status === 201) {
        onRefetch();
        toast.success("Aluno(a) matriculado com sucesso");
      }
    } catch (err) {
      if (isAxiosError(err) && err.status !== 201) {
        console.log(err);
        toast.error(err.response?.data.error);
      }
    } finally {
      setTransition(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold">
          Fazer matrícula
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Matricular aluno
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="select-student">Aluno</Label>
                  <Select
                    value={selectedStudentId}
                    onValueChange={setSelectedStudentId}
                  >
                    <SelectTrigger
                      id="select-student"
                      className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
                    >
                      <SelectValue placeholder="Selecione o aluno" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                      <SelectGroup>
                        <SelectLabel className="ps-2">
                          Selecione o aluno
                        </SelectLabel>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            <span className="truncate">{student.name}</span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="select-class">Aula</Label>
                  <Select
                    value={selectedClassId}
                    onValueChange={setSelectedClassId}
                  >
                    <SelectTrigger
                      id="select-class"
                      className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
                    >
                      <SelectValue placeholder="Selecione a aula" />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                      <SelectGroup>
                        <SelectLabel className="ps-2">
                          Selecione a aula
                        </SelectLabel>
                        {classes.map((studioClass) => (
                          <SelectItem
                            key={studioClass.id}
                            value={studioClass.id}
                          >
                            <span className="truncate">
                              {studioClass.title}
                            </span>
                            <span className="truncate text-foreground/80">
                              {Intl.DateTimeFormat("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }).format(new Date(studioClass.date))}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="py-4 flex items-center gap-4 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  disabled={isPending}
                  type="button"
                  onClick={() => handleCreateStudent()}
                  className="text-white bg-emerald-800 hover:bg-emerald-700 poppins-semibold"
                >
                  {isPending && <LoaderCircle className="animate-spin" />}
                  Matricular
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
