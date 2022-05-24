import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import {TodosService} from '../shared/todos.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  private _loading: boolean = true;
  public get loading(): boolean {
    return this._loading;
  }
  public set loading(value: boolean) {
    this._loading = value;
  }


  constructor(public todosService: TodosService) { }

  ngOnInit() {
    this.todosService.fetchTodos()
      .pipe(delay(2000))
      .subscribe( () => {
        this.loading = false;
    })
  }

  onChange(id: number) {
    this.todosService.onToggle(id)
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
  }

}
