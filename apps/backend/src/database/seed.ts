import { faker } from "@faker-js/faker";
import { db } from "./"; // ajuste o caminho
import {
  collaborators,
  students,
  studios,
  studioSchedule,
  classes,
  enrollments,
  plans,
  subscriptions,
  subscriptionsPayments,
} from "./schema";
import { randomUUID } from "node:crypto";
import { SQL, Placeholder } from "drizzle-orm";

function uuid() {
  return randomUUID();
}

async function main() {
  console.log("🌱 Running seed...");

  // ----------------------------
  // 1) Collaborators
  // ----------------------------
  const collaboratorsData = Array.from({ length: 8 }).map(() => ({
    id: uuid(),
    name: faker.person.fullName(),
    photoUrl: faker.image.avatar(),
    regionalCouncil: faker.string.uuid(),
    birthDate: faker.date.birthdate().toISOString(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    hiringDate: new Date(faker.date.past()).toISOString(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(["admin", "recepcionist", "instructor"]),
  }));

  await db.insert(collaborators).values(collaboratorsData);
  console.log("✔ collaborators inserted");

  const instructors = collaboratorsData.filter((c) => c.role === "instructor");

  // ----------------------------
  // 2) Studios
  // ----------------------------
  const studiosData = Array.from({ length: 3 }).map(() => ({
    id: uuid(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
  }));

  await db.insert(studios).values(studiosData);
  console.log("✔ studios inserted");

  // ----------------------------
  // 3) Studio Schedules
  // ----------------------------
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const scheduleData = [];

  for (const studio of studiosData) {
    for (const day of days) {
      scheduleData.push({
        id: uuid(),
        studioId: studio.id,
        dayOfWeek: day,
        openTime: "08:00",
        closeTime: "20:00",
        enabled: true,
      });
    }
  }

  await db.insert(studioSchedule).values(scheduleData);
  console.log("✔ studio schedule inserted");

  // ----------------------------
  // 4) Students
  // ----------------------------
  const studentsData = Array.from({ length: 30 }).map(() => {
    const registrar = faker.helpers.arrayElement(collaboratorsData);
    return {
      id: uuid(),
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      birthDate: faker.date.birthdate().toISOString(),
      cpf: faker.string.numeric(11),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      profession: faker.person.jobTitle(),
      registeredBy: registrar.id,
    };
  });

  await db.insert(students).values(studentsData);
  console.log("✔ students inserted");

  // ----------------------------
  // 5) Classes
  // ----------------------------
  const classesData = Array.from({ length: 40 }).map(() => {
    const instructor = faker.helpers.arrayElement(instructors);
    const studio = faker.helpers.arrayElement(studiosData);

    return {
      id: uuid(),
      title: faker.helpers.arrayElement(["Pilates Solo", "Aparelhos", "Reabilitação", "Avançado", "Alongamento"]),
      studioId: studio.id,
      instructorId: instructor.id,
      date: faker.date.soon({ days: 20 }),
      status: faker.helpers.arrayElement(["SCHEDULED", "DONE", "CANCELED"]),
      type: faker.helpers.arrayElement(["NORMAL", "REPLACEMENT", "EXPERIMENTAL"]),
      color: faker.helpers.arrayElement(["sky", "amber", "violet", "rose", "emerald", "orange"]),
    };
  });

  await db.insert(classes).values(classesData);
  console.log("✔ classes inserted");

  // ----------------------------
  // 6) Enrollments
  // ----------------------------
  const enrollmentsData:
    | {
        id: string | SQL<unknown> | Placeholder<string, any>;
        classId: string | SQL<unknown> | Placeholder<string, any>;
        studentId: string | SQL<unknown> | Placeholder<string, any>;
        createdAt?: Date | SQL<unknown> | Placeholder<string, any> | null | undefined;
        updatedAt?: Date | SQL<unknown> | Placeholder<string, any> | null | undefined;
      }[]
    | {
        id: `${string}-${string}-${string}-${string}-${string}`;
        classId: `${string}-${string}-${string}-${string}-${string}`;
        studentId: `${string}-${string}-${string}-${string}-${string}`;
      }[] = [];

  for (const classItem of classesData) {
    const enrolledStudents = faker.helpers.arrayElements(studentsData, faker.number.int({ min: 1, max: 6 }));

    enrolledStudents.forEach((s) => {
      enrollmentsData.push({
        id: uuid(),
        classId: classItem.id,
        studentId: s.id,
      });
    });
  }

  await db.insert(enrollments).values(enrollmentsData);
  console.log("✔ enrollments inserted");

  // ----------------------------
  // 7) Plans
  // ----------------------------

  const plansData = [
    {
      id: uuid(),
      period: "MONTHLY" as const,
      frequency: "1x/semana",
      monthlyPriceInCents: 15000,
      totalPriceInCents: 15000,
    },
    {
      id: uuid(),
      period: "MONTHLY" as const,
      frequency: "2x/semana",
      monthlyPriceInCents: 26000,
      totalPriceInCents: 26000,
    },
    {
      id: uuid(),
      period: "QUARTERLY" as const,
      frequency: "2x/semana",
      monthlyPriceInCents: 25000,
      totalPriceInCents: 75000,
    },
    {
      id: uuid(),
      period: "ANNUAL" as const,
      frequency: "Ilimitado",
      monthlyPriceInCents: 20000,
      totalPriceInCents: 240000,
    },
  ];

  await db.insert(plans).values(plansData);
  console.log("✔ plans inserted");

  // ----------------------------
  // 8) Subscriptions
  // ----------------------------
  const subscriptionsData = studentsData.slice(0, 20).map((student) => {
    const plan = faker.helpers.arrayElement(plansData);

    const start = faker.date.recent();
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    return {
      id: uuid(),
      studentId: student.id,
      planId: plan.id,
      status: faker.helpers.arrayElement(["ACTIVE", "PENDING", "SUSPENDED"]),
      startDate: start,
      endDate: end,
    };
  });

  await db.insert(subscriptions).values(subscriptionsData);
  console.log("✔ subscriptions inserted");

  // ----------------------------
  // 9) Subscription Payments
  // ----------------------------
  const paymentsData = [];

  for (const sub of subscriptionsData) {
    const amount = faker.helpers.arrayElement(
      plansData.filter((p) => p.id === sub.planId).map((p) => p.totalPriceInCents),
    );

    paymentsData.push({
      id: uuid(),
      subscriptionId: sub.id,
      amountInCents: amount,
      dueDate: faker.date.soon(),
      paidAt: faker.datatype.boolean() ? faker.date.recent() : null,
      status: faker.helpers.arrayElement(["PENDING", "PAID", "OVERDUE"]),
      paymentMethod: faker.helpers.arrayElement(["PIX", "CASH", "CREDIT_CARD", "DEBIT_CARD"]),
    });
  }

  await db.insert(subscriptionsPayments).values(paymentsData);
  console.log("✔ subscription payments inserted");

  console.log("🌱 Seed finalizado com sucesso!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
