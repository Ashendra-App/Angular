import { Employee } from '../../app/interfaces/employee.interface';

export class GetEmployee {
  static readonly type = '[Employee] Get';
}

export class AddEmployee {
  static readonly type = '[Employee] Add';
  constructor(public payload: Employee) {}
}

export class DeleteEmployee {
  static readonly type = '[Employee] Delete';
  constructor(public id: number | undefined) {}
}

export class UpdateEmployee {
  static readonly type = '[Employee] Update';
  constructor(public payload: Employee, public id: number) {}
}

export class SetEmployeeById {
  static readonly type = '[Employee] Set';
  constructor(public id: number) {}
}
