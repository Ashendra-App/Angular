import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../interfaces/employee.interface';
import { Store } from '@ngxs/store';
import {
  DeleteEmployee,
  GetEmployee,
} from '../../../store/actions/employee.action';

import {
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  retry,
  Subscription,
  switchMap,
  take,
  throwError,
  withLatestFrom,
} from 'rxjs';

import { EmployeeState } from '../../../store/state/employee.state';

@Component({
  selector: 'app-employee-dashboard',
  imports: [],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.scss',
})
export class EmployeeDashboard {
  empData: Employee[] = [];
  private store = inject(Store);

  employees$: Observable<Employee[]> = this.store.select(
    EmployeeState.getEmployeeList
  );

  isEmpDataLoaded$: Observable<boolean> = this.store.select(
    EmployeeState.getLoadedInfo
  );
  constructor(private cd: ChangeDetectorRef, private _router: Router) {
    // this.implementationOfRxjsOperator();
    this.getEmpData();
    this.employees$.subscribe((res) => {
      this.empData = res;
      this.cd.markForCheck();
    });
  }

  getEmpData() {
    this.isEmpDataLoaded$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetEmployee());
      }
    });
  }

  editRow(obj: Employee) {
    this._router.navigate(['add-employee', obj.id]);
  }

  deleteRow(obj: Employee) {
    this.store.dispatch(new DeleteEmployee(obj.id));
  }

  addEmp() {
    this._router.navigate(['add-employee']);
  }

  implementationOfRxjsOperator() {
    const data = from([1, 2, 3]);
    // this.sub = interval(1000).subscribe(console.log);

    // data.pipe(map((x) => x ** 2)).subscribe((res) => {
    //   console.log(res);
    // });

    // data.pipe(filter((x) => x % 2 == 0)).subscribe((res) => {
    //   console.log(res);
    // });

    // from([1, 2, 3])
    //   .pipe(
    //     mergeMap((id) =>
    //       fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
    //         r.json()
    //       )
    //     )
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });

    // from([1, 2, 3])
    //   .pipe(
    //     concatMap((id) =>
    //       fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
    //         r.json()
    //       )
    //     )
    //   )
    //   .subscribe(console.log);

    // fromEvent(document, 'keyup')
    //   .pipe(
    //     debounceTime(300),
    //     map((e: any) => e.target.value),
    //     switchMap((query) =>
    //       fetch(`https://api.example.com/search?q=${query}`).then((r) =>
    //         r.json()
    //       )
    //     )
    //   )
    //   .subscribe(console.log);

    // interval(1000).pipe(take(3)).subscribe(console.log);
    // of(1, 11, 1, 2, 2, 3).pipe(distinctUntilChanged()).subscribe(console.log);

    // forkJoin({
    //   posts: fetch('https://jsonplaceholder.typicode.com/posts').then((r) =>
    //     r.json()
    //   ),
    //   users: fetch('https://jsonplaceholder.typicode.com/users').then((r) =>
    //     r.json()
    //   ),
    // }).subscribe(console.log);

    // interval(1000)
    //   .pipe(
    //     withLatestFrom(interval(500)),
    //     take(10)
    //   )
    //   .subscribe(console.log);

    // throwError(() => new Error('Bad Request!'))
    //   .pipe(catchError((err) => of('Fallback value')))
    //   .subscribe(console.log);

    from(fetch('https://jsonplaceholder.typicode.com/users'))
      .pipe(
        delay(100), // delay the subscription by 10 seconds
        retry(2)
      )
      .subscribe({
        next: (res) => res.json().then(console.log),
        error: (err) => console.error('Final Error:', err),
      });
  }

  // ngAfterViewInit() {
  //   const usernameInput = document.getElementById('username');
  //   const passwordInput = document.getElementById('password');

  //   if (usernameInput && passwordInput) {
  //     combineLatest([
  //       fromEvent(usernameInput, 'input').pipe(map((e: any) => e.target.value)),
  //       fromEvent(passwordInput, 'input').pipe(map((e: any) => e.target.value)),
  //     ]).subscribe(([user, pass]) => {
  //       console.log('Form:', user, pass);
  //     });
  //   }
  // }

  sub!: Subscription;
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
