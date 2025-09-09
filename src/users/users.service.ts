import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { Model } from "mongoose";
import { RoleEnum } from "@/common/dto/role.dto";
import { ApplyQuery, QueryMethod } from "@/common/helpers/query.helper";
import { User } from "@/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>
  ) {}

  async create({ password, ...createUserDto }: CreateUserDto) {
    const newHash = await hash(password, 8);
    const newUser = new this.UserModel({
      ...createUserDto,
      password: newHash,
      role: RoleEnum.USER,
    });
    return await newUser.save();
  }

  async findAll(findUserDto?: FindUserDto, method?: QueryMethod) {
    return await this.UserModel.find(ApplyQuery(findUserDto, method))
      .select("-password")
      .exec();
  }

  async findOne(findUserDto?: FindUserDto) {
    return await this.UserModel.findOne(findUserDto).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.updateOne({ _id: id }, updateUserDto)
      .select("-password")
      .exec();
  }

  async remove(id: string) {
    return await this.UserModel.deleteOne({ _id: id })
      .select("-password")
      .exec();
  }
}
