export let  ListItem = ({children, item, todos, setTodos, localStorage}) => {

  let { id, isCompleted} = item;

 
  

  let delBtn = (todoId) => {
    let filteredTodos = todos.filter(todo => todo.id !== todoId);
    setTodos([...filteredTodos]);
    window.localStorage.setItem('todos', JSON.stringify(todos));

    if(localStorage.length === 0){
      window.localStorage.removeItem("todos");
    }
  }

  let editTodo = (todoId) => {
    let editText = prompt('Edit todo');
    let findedTodo = todos.find(e => e.id === todoId);
    findedTodo.content = editText;
    setTodos([...todos])
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }



  let changeTodo = (todoId) => {
    let findedTodo = todos.find(e => e.id === todoId);
    findedTodo.isCompleted = !findedTodo.isCompleted;
    setTodos([...todos])
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }
  return (
    <li className='d-flex align-items-center justify-content-between my-2'>
      <div className='d-flex align-items-between'>
        <input onChange={()=> changeTodo(id)} className='form-check-input mx-2' type="checkbox" defaultChecked={isCompleted}/>
        <span className='mx-3'>id:{id} </span>
        <span className={isCompleted ? "text-decoration-line-through" : ""}>{children}</span>
      </div>
      {/* {console.log(todos)} */}
      <div className='align-self-end'>
        <button onClick={() => editTodo(id)} className="btn my-2  btn-success">Edit</button>
        <button onClick={() => delBtn(id)} className="btn btn-danger mx-3">Delete</button>
      </div>
      
    </li>
  )
}
