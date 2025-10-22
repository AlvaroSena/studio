import { Model } from "./Model";
import { collaboratorSchema, CollaboratorType } from "@shared/schemas/collaborator";
import { collaboratorRoleEnum } from "../database/schema";

export type CollaboratorRole = (typeof collaboratorRoleEnum.enumValues)[number];

export class Collaborator extends Model {
  private name!: string;
  private photoUrl!: string | null;
  private regionalCouncil!: string;
  private birthDate!: Date;
  private email!: string;
  private phoneNumber!: string;
  private hiringDate!: Date | null;
  private password!: string;
  private role!: CollaboratorRole;

  constructor({
    id,
    name,
    photoUrl,
    regionalCouncil,
    birthDate,
    email,
    phoneNumber,
    hiringDate,
    password,
    role,
    createdAt,
    updatedAt,
  }: CollaboratorType) {
    super(id, createdAt, updatedAt);

    collaboratorSchema.parse({ name, regionalCouncil, birthDate, email, phoneNumber, password, role });
    this.name = name;
    this.photoUrl = photoUrl ?? null;
    this.regionalCouncil = regionalCouncil;
    this.birthDate = birthDate;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.hiringDate = hiringDate ?? null;
    this.password = password;
    this.role = role;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getPhotoUrl() {
    return this.photoUrl;
  }

  setPhotoUrl(photoUrl: string) {
    this.photoUrl = photoUrl;
  }

  getRegionalCouncil() {
    return this.regionalCouncil;
  }

  setRegionalCouncil(regionalCouncil: string) {
    this.regionalCouncil = regionalCouncil;
  }

  getBirthDate() {
    return this.birthDate;
  }

  setBirthDate(birthDate: Date) {
    this.birthDate = birthDate;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  getHiringDate() {
    return this.hiringDate;
  }

  setHiringDate(hiringDate: Date | null) {
    this.hiringDate = hiringDate;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getRole() {
    return this.role;
  }

  setRole(role: CollaboratorRole) {
    this.role = role;
  }
}
