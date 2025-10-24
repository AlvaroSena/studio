"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collaborator = void 0;
const Model_1 = require("./Model");
const collaboratorSchema_1 = require("../schemas/collaboratorSchema");
class Collaborator extends Model_1.Model {
    name;
    photoUrl;
    regionalCouncil;
    birthDate;
    email;
    phoneNumber;
    hiringDate;
    password;
    role;
    constructor({ id, name, photoUrl, regionalCouncil, birthDate, email, phoneNumber, hiringDate, password, role, createdAt, updatedAt, }) {
        super(id, createdAt, updatedAt);
        collaboratorSchema_1.collaboratorSchema.parse({ name, regionalCouncil, birthDate, email, phoneNumber, password, role });
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
    setName(name) {
        this.name = name;
    }
    getPhotoUrl() {
        return this.photoUrl;
    }
    setPhotoUrl(photoUrl) {
        this.photoUrl = photoUrl;
    }
    getRegionalCouncil() {
        return this.regionalCouncil;
    }
    setRegionalCouncil(regionalCouncil) {
        this.regionalCouncil = regionalCouncil;
    }
    getBirthDate() {
        return this.birthDate;
    }
    setBirthDate(birthDate) {
        this.birthDate = birthDate;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    getHiringDate() {
        return this.hiringDate;
    }
    setHiringDate(hiringDate) {
        this.hiringDate = hiringDate;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
}
exports.Collaborator = Collaborator;
