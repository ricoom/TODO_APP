import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest, combineLatestAll, forkJoin, observable, Observable } from 'rxjs';
import { TodoDao } from 'src/app/models/todo-dao';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
 
todosVisisble$:Observable<TodoDao[]>;
 task!:TodoDao
 constructor(private todoservice:TodoServiceService) {
  this.todosVisisble$=todoservice.todos$
  todoservice.getAllTodos()
  
  }


addTask(taskname:string){
  if(taskname!==''){
      this.todoservice.addTodo(taskname);

  }
  
}
taskDone(taskname:string){
this.todosVisisble$.subscribe(todo=>{
  todo.forEach(td=>{
   if(td.name===taskname ) {
    td.isComplete
        this.todoservice.markdone(taskname)

   }

  })
})

}

deleteTask(taskname:string){
  this.todosVisisble$.subscribe(todo=>{
    todo.forEach(td=>{
      if(td.name===taskname){
        todo.splice(todo.indexOf(td),1)
        this.todoservice.removeTask(taskname)
       console.log(todo.indexOf(td)) 

      }
    })
  })
}

 

  ngOnInit(): void {
    
  }

}
