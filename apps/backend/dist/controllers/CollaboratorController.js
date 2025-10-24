"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorController = void 0;
class CollaboratorController {
    collaboratorService;
    constructor(collaboratorService) {
        this.collaboratorService = collaboratorService;
    }
    async listAll(request, response) {
        const collaborators = await this.collaboratorService.listAll();
        return response.json(collaborators);
    }
    async create(request, response) {
        const data = request.body;
        const user = await this.collaboratorService.create(data);
        return response.status(201).json({
            userId: user.getId(),
        });
    }
    async getById(request, response) {
        const id = request.params.id;
        const collaborator = await this.collaboratorService.getById(id);
        return response.json(collaborator);
    }
    async getProfile(request, response) {
        const { sub } = request.user;
        const collaborator = await this.collaboratorService.getById(sub);
        return response.json(collaborator);
    }
    async delete(request, response) {
        const id = request.params.id;
        await this.collaboratorService.remove(id);
        return response.status(204).send();
    }
}
exports.CollaboratorController = CollaboratorController;
