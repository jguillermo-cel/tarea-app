import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { FormBuilder, Validators, AbstractControl  } from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  userData?: User;
  taskForm = this.formBuilder.group({
    txtTask: ['', [Validators.required, alphanumValidator]]
  });/*
  tasks = [{ id: 1, task: 'Tarea 01', select: false },
  { id: 2, task: 'Tarea 02', select: true },
  { id: 3, task: 'Tarea 03', select: false }]*/

  tasks : Task[] = [];

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      }
    });
  }

  get task() {
    return this.taskForm.controls.txtTask;
  }

  addTask(item: string): void {
    if (this.taskForm.valid) {
      let taskInit: Task = { id: 0, task: item, select: false };
      if(this.tasks.length != 0){
        taskInit.id = this.tasks[this.tasks.length - 1].id + 1;
      }
      this.tasks.push(taskInit);
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }

  }

  deleteTask(idTask: number){
    let taskfiltrado;
    taskfiltrado = this.tasks.filter(task => task.id != idTask);
    this.tasks = taskfiltrado;

  }

  changeCheck(checked: any){
    const taskToUpdate = this.tasks.find(task => task.id == checked.id);
    if (taskToUpdate) {
      taskToUpdate.select = checked.isChecked;
    }
  }

  
}

function alphanumValidator(control: AbstractControl) {
  const value = control.value;
  const isAlphanumeric =  /^[a-zA-Z0-9\s]*$/.test(value);
  if (!isAlphanumeric) {
    return { alphanum: true };
  }
  return null;
}