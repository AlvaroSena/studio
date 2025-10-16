import { CreateUserDTO } from "../dtos/UserDTO";
import { ConflictException } from "../exceptions/ConflictException";
import { User } from "../models/UserModel";
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
  constructor(private repository: IUserRepository) {}

  async listAll() {
    const users = await this.repository.findAll();

    return users;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.repository.findByEmail(dto.email);

    if (userAlreadyExists) {
      throw new ConflictException("Email already in use.");
    }

    const user = new User({
      email: dto.email,
      name: dto.name,
      password: dto.password,
      role: dto.role,
    });

    const createdUser = await this.repository.save(user);

    return createdUser;
  }
}
