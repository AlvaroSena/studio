import { ClassSchedule } from "@/components/class-schedule";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function StudioAgenda() {
  return (
    <div>
      <Breadcrumb className="mx-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/studios">Studios</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/studios/agenda">Agenda</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ClassSchedule />
    </div>
  );
}
