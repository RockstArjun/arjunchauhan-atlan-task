import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import UserService from "../Services/UserService";
import type { User } from "@prisma/client";

@JsonController("/api/user")
@Authorized()
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  @Get("/:id")
  public async getUser(@Param("id") id: string) {
    const convertedId = parseInt(id, 10);
    return this.userService.getUser(convertedId);
  }
  @Post()
  public async createUser(@Body() body: User) {
    return this.userService.createUser(body);
  }
}
