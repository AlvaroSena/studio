"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorService = void 0;
const ConflictException_1 = require("../exceptions/ConflictException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const Collaborator_1 = require("../models/Collaborator");
const bcryptjs_1 = require("bcryptjs");
class CollaboratorService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async listAll() {
        const collaborators = await this.repository.findAll();
        return collaborators;
    }
    async create(dto) {
        const collaboratorAlreadyExists = await this.repository.findByEmail(dto.email);
        if (collaboratorAlreadyExists) {
            throw new ConflictException_1.ConflictException("Email already in use.");
        }
        const collaborator = new Collaborator_1.Collaborator({
            name: dto.name,
            regionalCouncil: dto.regionalCouncil,
            birthDate: dto.birthDate,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            password: await (0, bcryptjs_1.hash)(dto.password, 12),
            role: dto.role,
        });
        const createdCollaborator = await this.repository.save(collaborator);
        return createdCollaborator;
    }
    async getById(id) {
        const collaborator = await this.repository.findById(id);
        if (!collaborator) {
            throw new NotFoundException_1.NotFoundException("Collaborator not found.");
        }
        return {
            collaborator: {
                id: collaborator.getId(),
                name: collaborator.getName(),
                photoUrl: collaborator.getPhotoUrl(),
                role: collaborator.getRole(),
            },
        };
    }
    async remove(id) {
        const collaborator = await this.repository.findById(id);
        if (!collaborator) {
            throw new NotFoundException_1.NotFoundException("Collaborator not found.");
        }
        await this.repository.delete(id);
    }
}
exports.CollaboratorService = CollaboratorService;
