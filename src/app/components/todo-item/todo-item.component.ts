import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo: Todo = new Todo;
  // if not working, remove initializer
  // I believe the version of Angular I'm using
  // is different from the one in the video,
  // hence the need for initializers
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  // set dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo: any){
    // Toggles in UI
    todo.completed = !todo.completed;
    // Toggles in Server
    this.todoService.toggleCompleted(todo).subscribe(todo);
  }

  onDelete(todo: any){
    this.deleteTodo.emit(todo);
  }
}
