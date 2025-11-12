import { StudentType, studentSchema } from "../schemas/studentSchema";
import { Model } from "./Model";

export class Student extends Model {
  private name!: string;
  private avatarUrl!: string | null;
  private birthDate!: Date;
  private cpf!: string;
  private email!: string;
  private phone!: string;
  private profession!: string;
  private registeredBy!: string;

  constructor({
    id,
    name,
    avatarUrl,
    birthDate,
    cpf,
    email,
    phone,
    profession,
    registeredBy,
    createdAt,
    updatedAt,
  }: StudentType) {
    super(id, createdAt, updatedAt);

    studentSchema.parse({ name, birthDate, cpf, email, phone, profession, registeredBy });
    this.name = name;
    this.avatarUrl = avatarUrl ?? null;
    this.birthDate = birthDate;
    this.cpf = cpf;
    this.email = email;
    this.phone = phone;
    this.profession = profession;
    this.registeredBy = registeredBy;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAvatarUrl() {
    return this.avatarUrl;
  }

  setAvatarUrl(avatarUrl: string) {
    this.avatarUrl = avatarUrl;
  }

  getBirthDate() {
    return this.birthDate;
  }

  setBirthDate(birthDate: Date) {
    this.birthDate = birthDate;
  }

  getCPF() {
    return this.cpf;
  }

  setCPF(cpf: string) {
    this.cpf = cpf;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPhone() {
    return this.phone;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  getProfession() {
    return this.profession;
  }

  setProfession(profession: string) {
    this.profession = profession;
  }

  getRegisteredBy() {
    return this.registeredBy;
  }

  setRegisteredBy(registeredBy: string) {
    this.registeredBy = registeredBy;
  }
}
