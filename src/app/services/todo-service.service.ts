import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TodoDao } from '../models/todo-dao';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  url=`http://localhost:8080/api`
    todos$=new BehaviorSubject<TodoDao[]>([])


  constructor(private http:HttpClient) {
   }

  getAllTodos():void{
   
   this.http.get<TodoDao[]>(`${this.url}/alltasks`).subscribe(val=>{
    this.todos$.next(val);
   })
 
}


addTodo(taskname:string){
    const headers = { 'content-type': 'application/json'}  

  const newTask=new TodoDao(
    taskname,
    false)
    this.http.post<TodoDao>(`${this.url}/newtask`,newTask,{'headers': headers}).subscribe(val=>{
      if(val){
    const updateTodos=[...this.todos$.getValue(),newTask]

    this.todos$.next(updateTodos);

      }else{
        console.log(Error)
      }
      console.log(val)
    })

    
}
markdone(taskname:string){
   const headers = { 'content-type': 'application/json'}  
  this.http.put<TodoDao>(`${this.url}/markdone/${taskname}`,{'headers': headers}).subscribe(val=>{console.log(val)})
console.log(taskname+"new")
}
removeTask(taskname:string){
this.http.delete<TodoDao>(`${this.url}/remove/${taskname}`).subscribe(val=>{console.log(val)})
}
  
}
