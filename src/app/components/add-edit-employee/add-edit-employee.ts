import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AddEmployee,
  SetEmployeeById,
} from '../../../store/actions/employee.action';
import { Observable } from 'rxjs';
import { Employee } from '../../interfaces/employee.interface';
import { EmployeeState } from '../../../store/state/employee.state';

@Component({
  selector: 'app-add-edit-employee',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-employee.html',
  styleUrl: './add-edit-employee.scss',
})
export class AddEditEmployee {
  form!: FormGroup;
  id!: number;
  private store = inject(Store);
  empData$: Observable<Employee | null> = this.store.select(
    EmployeeState.getEmployeeByIdData
  );
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this._fb.group({
      name: [''],
      deptName: [''],
      email: [''],
    });
    this.activatedRoute.params.subscribe((res) => {
      if (res['id']) {
        this.id = res['id'];
        this.store.dispatch(new SetEmployeeById(this.id));
      }
    });
    if (this.id) {
      this.empData$.subscribe((res) => {
        if (res) {
          this.form.patchValue(res);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  resetData() {
    this.form.reset();
  }

  saveData() {
    this.store.dispatch(new AddEmployee(this.form.value));
    this.goBack();
  }
}
