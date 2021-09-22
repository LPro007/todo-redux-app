import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarCompletados, toggle, toggleAll } from './todo.actions';
 
export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Abrazar a peter'),
  new Todo('Matar a thanos')
];
 
const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [  ...state, new Todo(texto)  ]),
  on(toggle, (state, { id }) => {

    return state.map( todo => {

      if(todo.id === id){
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {

    return state.map( todo => {

      if(todo.id === id){
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) => state.filter( todo => todo.id !== id)),
  on(toggleAll, (state, { completado }) => state.map(todo => { return { ...todo, completado: completado }})),
  on(limpiarCompletados, (state) => state.filter( todo => !todo.completado))
);
 
export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}