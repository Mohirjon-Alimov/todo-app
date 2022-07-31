import './App.css';
import { useState, useRef } from 'react';
import { List } from './components/list';
import { ListItem } from './components/list-item';

function App() {
  let inpRef = useRef()
  let localStorage =JSON.parse(window.localStorage.getItem('todos'))
  let [todos, setTodos] = useState( localStorage || [])

  let catchInputvalue = (evt) => {
    
    if (inpRef.current.value !== null && inpRef.current.value !== ""){
 
      evt.preventDefault();
      let todo = {
        // id: todos[todos.length - 1]?.id + 1 || 0,
        id: todos.at(-1)?.id ? todos.at(-1).id + 1 : 1,
        content: inpRef.current.value,
        isCompleted: false
      };
      setTodos([...todos, todo]);
      inpRef.current.value = null;
      
    }else{
      evt.preventDefault();
    }
    
  }

  window.localStorage.setItem('todos', JSON.stringify(todos));

  if(todos.length === 0){
    window.localStorage.removeItem("todos");
  }

  let allTodos = ()=> {
    // console.log(todos);
    return (todos)
  }
  
  let uncompletedTodos = ()=> {
    let uncompleted = todos.filter(todo => todo.isCompleted === false)
    
    setTodos([...todos, ...uncompleted]);
    // renderingTodos([])
    renderingTodos(setTodos([...todos]))
    console.log(todos);
  }
  let renderingTodos = (todos)=>{
    return(
    todos.map(e => (
      <ListItem localStorage={localStorage} todos={todos} setTodos={setTodos} key={e.id || e.id * 2} item={e} >{e.content}</ListItem>
    )))
  }
  
  return (
    
    <div className="container">
      <form className="d-flex form align-items-center justify-content-around" onSubmit={catchInputvalue}>
        <input ref={inpRef} type="text"className="my-4"  placeholder="todo"/>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className=" buttons d-flex justify-content-around">
        <button className="btn btn-primary" onClick={allTodos}>All</button>
        <button className="btn btn-primary">Completed</button>
        <button className="btn btn-warning" onClick={uncompletedTodos}>Uncompleted</button>
       

      </div>
      
      {todos.length !==0 && 
      <List>
        {renderingTodos(todos)}
        </List>
      }
     
    </div>
  );
}

export default App;