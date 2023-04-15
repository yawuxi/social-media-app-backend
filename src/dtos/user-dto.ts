import { User } from "../models/user-model";

export class UserDto {
  id;
  sex;
  email;
  dateOfBirth;
  name;

  constructor({ sex, email, dateOfBirth, name, _id }: User) {
    this.sex = sex;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.name = name;
    this.id = _id;
  }
}
