import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/filtro/filtro.actions';
import * as todoActions from '../todo.actions';
import { filtroReducer } from 'src/app/filtro/filtro.reducer';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos;
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0; 

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    // this.store.select('filtro').subscribe( filtro => {
    //     console.log(filtro);
    //     this.filtroActual = filtro;
    // });
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado).length;
    });
  }
  cambiarFiltro(filtro: actions.filtrosValidos) {
    this.store.dispatch( actions.setFiltro( { filtro: filtro } ))
  }

  limpiarCompletados(){
    this.store.dispatch( todoActions.limpiarCompletados() )
  }
}
