import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TodoDao } from 'src/app/models/todo-dao';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
@Output() newtaskEvent=new EventEmitter<string>();
  @ViewChild('newTask')newTask!: ElementRef;


addNewTask(taskname:string){
this.newtaskEvent.emit(taskname);
this.newTask.nativeElement.value=''
console.log(taskname)

}

  constructor() { }

  ngOnInit(): void {
  }

}
