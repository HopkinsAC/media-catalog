import { Request, Response, NextFunction } from 'express';
import { User } from '../models';

export class UsersController {
  private readonly users: User[];

  constructor() {
    this.users = [
      new User('12345', 'jmw5598', 'Jason', 'White', 'asdfaw'),
      new User('23456', 'djt2020', 'Daniel', 'Townswell', 'ewrfa'),
      new User('34567', 'dlw3512', 'Danielle', 'Whitmore', 'xzcvsaa'),
    ];
  }

  public async getAllUsers(request: Request, response: Response, next: NextFunction): Promise<any> {
    return response.status(200).send(this.users);
  }
}
