import React,{ useState,useEffect } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false)
  const [allTodos, setTodos] = useState([])//empty array intially
  const [newTitle,setNewTitle] = useState("")
  const [newDecription, setNewDescription] = useState("")
  const [completedTodos,setCompletedTodos]=useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDecription
    }
  const updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr)
    localStorage.setItem('todoList',JSON.stringify(updatedTodoArr))
  }

  const handleDeleteTodoItem = (index) => {
    const updatedTodoArr = allTodos.filter((_, i) => i !== index);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoArr));
    setTodos(updatedTodoArr);
  };
/*
he filter method is used on the allTodos array to create a new array called updatedTodoArr.
In the filter method, we iterate through each item in allTodos, and the callback function (item, i) => i !== index checks if the current index i is not equal to the provided index. If it's not equal, the item is included in the new array; otherwise, it's excluded.
*/
  const handleCompleteDeleteTodoItem = (index) => {
    const updatedCompletedArr = completedTodos.filter((_, i) => i !== index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    setCompletedTodos(updatedCompletedArr);
  };

    const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + '@' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }
      
    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodoItem(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  useEffect(() => {
    let savedTodoItems = JSON.parse(localStorage.getItem('todoList'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    
    if (savedTodoItems) {
      setTodos(savedTodoItems)
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo)
    }
  },[])

  return (
    <div className="App">
      <h1>My Todo</h1>
      <div className='todo-wrapper'>
        
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What is the task?' />
          </div> 
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDecription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='What is the task description?' />
          </div>
          <div className='todo-input-item'>
           <button type='button'onClick={handleAddTodo} className='primaryBtn' >Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>setCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>setCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
            <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodoItem(index)} />
              <BsCheckLg className='check-icon'onClick={()=>handleComplete(index)}/>
            </div>
          </div>
          )
          })}
           {isCompleteScreen===true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
            <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><i>Completed on:{item.completedOn}</i></p>
            </div>
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleCompleteDeleteTodoItem(index)} />
              </div>
          </div>
          )
        })}
        </div>

      </div>
    </div>
  );
}

export default App;
