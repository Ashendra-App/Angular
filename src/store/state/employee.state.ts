import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Employee } from '../../app/interfaces/employee.interface';
import { Injectable } from '@angular/core';
import {
  AddEmployee,
  DeleteEmployee,
  GetEmployee,
  SetEmployeeById,
} from '../actions/employee.action';
import { HttpService } from '../../services/http-service';
import { tap } from 'rxjs';

// State Model
export class EmployeeStateModel {
  employees: Employee[] = [];
  isLoadedData = false;
  selectedEmployeeId = null;
  selectedEmployee!: Employee;
}

// State
@State<EmployeeStateModel>({
  name: 'employees',
  defaults: {
    employees: [],
    isLoadedData: false,
    selectedEmployeeId: null,
    selectedEmployee: {} as Employee,
  },
})
@Injectable()
export class EmployeeState {
  constructor(private httpService: HttpService) {}
  // Selectors have the logic to get state data
  @Selector()
  static getEmployeeList(state: EmployeeStateModel) {
    return state.employees;
  }

  // Fet data loaded info
  @Selector()
  static getLoadedInfo(state: EmployeeStateModel) {
    return state.isLoadedData;
  }

  @Selector()
  static getEmployeeById(state: EmployeeStateModel) {
    return state.selectedEmployeeId;
  }

  @Selector()
  static getEmployeeByIdData(state: EmployeeStateModel) {
    return state.selectedEmployee;
  }

  @Action(GetEmployee)
  getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
    return this.httpService.getData().pipe(
      tap((res) => {
        const state = getState();
        setState({
          ...state,
          employees: res,
          isLoadedData: true,
        });
      })
    );
  }

  @Action(SetEmployeeById)
  getEmpById(
    { getState, setState }: StateContext<EmployeeStateModel>,
    { id }: SetEmployeeById
  ) {
    const state = getState();
    const employee = state.employees.find((emp) => emp.id === +id);
    if (employee) {
      setState({
        ...state,
        selectedEmployee: employee,
      });
    } else {
      this.httpService.getDataById(id).subscribe((res) => {
        setState({
          ...state,
          selectedEmployee: res,
        });
      });
    }
  }

  @Action(AddEmployee)
  addEmployeeData(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { payload }: AddEmployee
  ) {
    this.httpService.postData(payload).subscribe(
      (res) => {
        const state = getState();
        patchState({
          employees: [...state.employees, res],
        });
      },
      (error) => {}
    );
  }

  @Action(DeleteEmployee)
  deleteEmployeeById(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { id }: DeleteEmployee
  ) {
    this.httpService.deleteData(id).subscribe((res) => {
      const state = getState();
      patchState({
        employees: state.employees.filter((emp) => emp.id !== id),
      });
    });
  }
}
