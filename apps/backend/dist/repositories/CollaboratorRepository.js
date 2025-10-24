"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorRepository = void 0;
const database_1 = require("../database");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const Collaborator_1 = require("../models/Collaborator");
class CollaboratorRepository {
    async save(collaborator) {
        const [createdCollaborator] = await database_1.db
            .insert(schema_1.collaborators)
            .values({
            id: collaborator.getId(),
            name: collaborator.getName(),
            regionalCouncil: collaborator.getRegionalCouncil(),
            birthDate: collaborator.getBirthDate().toString(),
            email: collaborator.getEmail(),
            phoneNumber: collaborator.getPhoneNumber(),
            password: collaborator.getPassword(),
            role: collaborator.getRole(),
        })
            .returning();
        return new Collaborator_1.Collaborator({
            id: createdCollaborator.id,
            name: createdCollaborator.name,
            photoUrl: createdCollaborator.photoUrl,
            regionalCouncil: createdCollaborator.regionalCouncil,
            birthDate: new Date(createdCollaborator.birthDate),
            email: createdCollaborator.email,
            phoneNumber: createdCollaborator.phoneNumber,
            password: createdCollaborator.password,
            role: createdCollaborator.role,
            createdAt: createdCollaborator.createdAt,
            updatedAt: createdCollaborator.updatedAt,
        });
    }
    async findAll() {
        const result = await database_1.db
            .select({
            id: schema_1.collaborators.id,
            name: schema_1.collaborators.name,
            photoUrl: schema_1.collaborators.photoUrl,
            email: schema_1.collaborators.email,
            role: schema_1.collaborators.role,
            createdAt: schema_1.collaborators.createdAt,
            updatedAt: schema_1.collaborators.updatedAt,
        })
            .from(schema_1.collaborators);
        return result.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });
    }
    async findById(id) {
        const [collaborator] = await database_1.db.select().from(schema_1.collaborators).where((0, drizzle_orm_1.eq)(schema_1.collaborators.id, id));
        if (!collaborator) {
            return null;
        }
        return new Collaborator_1.Collaborator({
            id: collaborator.id,
            name: collaborator.name,
            photoUrl: collaborator.photoUrl,
            regionalCouncil: collaborator.regionalCouncil,
            birthDate: new Date(collaborator.birthDate),
            email: collaborator.email,
            phoneNumber: collaborator.phoneNumber,
            password: collaborator.password,
            role: collaborator.role,
            createdAt: collaborator.createdAt,
            updatedAt: collaborator.updatedAt,
        });
    }
    async findByEmail(email) {
        const [collaborator] = await database_1.db.select().from(schema_1.collaborators).where((0, drizzle_orm_1.eq)(schema_1.collaborators.email, email));
        if (!collaborator) {
            return null;
        }
        return new Collaborator_1.Collaborator({
            id: collaborator.id,
            name: collaborator.name,
            photoUrl: collaborator.photoUrl,
            regionalCouncil: collaborator.regionalCouncil,
            birthDate: new Date(collaborator.birthDate),
            email: collaborator.email,
            phoneNumber: collaborator.phoneNumber,
            password: collaborator.password,
            role: collaborator.role,
            createdAt: collaborator.createdAt,
            updatedAt: collaborator.updatedAt,
        });
    }
    update(collaborator) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        await database_1.db.delete(schema_1.collaborators).where((0, drizzle_orm_1.eq)(schema_1.collaborators.id, id));
    }
}
exports.CollaboratorRepository = CollaboratorRepository;
