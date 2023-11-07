import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  displayBtn: boolean = true;
  @Input() taskInput: any;
  @Output() taskDeleteEvent = new EventEmitter<number>();
  @Output() taskCheckedEvent = new EventEmitter<any>();

  constructor() {
    this.taskInput = '';
  }

  onChangeTask($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    let dataCheckbox = {id: id, isChecked:isChecked}
    this.displayBtn = isChecked;
    this.taskCheckedEvent.emit(dataCheckbox);
    console.log('check en tarea: ' + id + ' estado del check: ' + isChecked);

  }

  deleteTask($event: any) {
    const id = $event.target.value;
    this.taskDeleteEvent.emit(id);
    console.log('eliminar tarea: ' + id);
  }

  ngOnInit(): void {
    if (this.taskInput.select) {
      this.displayBtn = false; 
    }
  }
}
