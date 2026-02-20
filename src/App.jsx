// Importing useState allows us to use states.
// This is important because states allow us to maintain data from
// a previous render while re-rendering.
import { useState } from 'react'

function App() {

  {/* VARIABLES */}

  // Creates todos array (list of things to do).
  // The todos array starts empty.
  // setTodos is a function that is a byproduct
  // of creating todos.
  // The purpose of setTodos is to update todos
  // when the user adds a todo.
  // The state then renders after running setTodos.
  const [todos, setTodos] = useState([])

  // Creats inputValue as an String.
  // inputValue starts out as an empty String
  // in the useState argument. ('')
  // setInputValue is a byproduct of creating inputValue.
  // The purpose of setInputValue is to let the user 
  // input a value that will be stored in inputValue.
  // The state then renders after setInputValue is called.
  const [inputValue, setInputValue] = useState('')

  // Tracks which todo is being edied with an editingIndex state.
  // Initialized as null.
  const [editIndex, setEditIndex] = useState(null)

  // editValue is the value that todo is being changed to.
  // Initialized as empty string.
  const[editValue, setEditValue] = useState('')

  // Create a state that handles the mode we are in (Normal, Delete, Edit)
  const[mode, setMode] = useState('normal')

  {/* FUNCTIONS */}

  // Create a function to add user input todo to todos.
  // Declares a function named addTodo with no parameters.
  // Directly accesses todos and inputValue from the component.
  // [...] creates a new array
  // ...todos - the spread operator which spreads all existings todos into the new array
  // , inputValue appends the new input value to todos.
  // Each time the function is called, a new todos array is created where the contents
  // of the previous todos array is put into the new one.
  // setInputValue('') clears the text box so the user can add a new todo after submitting a todo.
  function addTodo() {
    setTodos([...todos, inputValue])
    setInputValue('')
  }

  // Create a function that deletes a todo from todos.
  // Takes index as a paramter and uses setTodos.
  // Calls setTodos and sets it as a new todos with all the indexes except the parameter index.
  // Filter method automatically returns a new array.
  // _ is a convention that means "I don't need this parameter" - it replaces the paramter that 
  // represents the actual string.
  // The correct syntax is array.filter((String, index) => index != param)
  function deleteTodo(index){
    setTodos(todos.filter((_, i) => i != index))
    setMode('normal')
  }

  // Create a function to update a todo from todos.
  // Takes index as param.
  function updateTodo(index, value){
    // todos.map loops through each value in todos => checks if it's the index in the param.
    // If yes replace with the value param, if not keep the current todo.
    setTodos(todos.map((todo, i) => i === index ? value : todo))
    setEditIndex(null)
    setEditValue('')
    setMode('normal')
  }

  return (
    <div>
      <h1>My Todo List</h1>
      {/* Create a bar to enter input values.
          Input is a self-closing tag so it can't have any children. */}

      {/* Establishes inputValue as a controlled variable
            that can be used only in the return statement. */}

      {/* e is automatically passed in by the browser when an event happens.
            The browser creates it and hands it to your function as a param. 
            You could call it anything.
            Uses setInputValue to get the current text in the input (e.target.value). 
            React then re-renders, input value is updated, then the input shows the new text. */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}

        // if Enter key is pressed it will call addTodo
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTodo()
        }}
      />

      {/* Create a button to submit the input value to todos. 
          Adds special syntax so that when the button is clicked it calls addTodo. */}
      <button onClick={addTodo}>Add Todo</button>

      {/* Buttons to change which mode we are in */}
      <button onClick={() => setMode('delete')}>Delete</button>
      <button onClick={() => setMode('edit')}>Edit</button>


      {/* Display the todos list 
          Use the map method.
          Wraps delete button in an arrow function so it doesn't call the function immediately when rendering. */}
      <ul>
        {todos.map((todo, index) => (
            <li key={index}>
              {mode === "edit" ? (
                // if it equals edit it goes into edit mode
                <>
                  {editIndex === index ? (
                    <>
                      <input 
                        value = {editValue} 
                        onChange={(e) => setEditValue(e.target.value)} 

                        onKeyDown={(e) => {
                          if (e.key === 'Enter') updateTodo(index, editValue)
                        }}
                      />
                      <button onClick={() => updateTodo(index, editValue)}>Save</button>
                    </>
                  ) : (
                    <span onClick={() => { setEditIndex(index); setEditValue(todo) }}>{todo}</span>
                  )}
                </>
              ) : mode === 'delete' ? (
                // if not it goes into delete mode
                <>
                  {/* Wraps todo in a clickable span. 
                      When clicked, it calls deleteTodo with the current index, 
                      which removes that todo from the array. */}
                  <span onClick={() => deleteTodo(index)}>{todo}</span>
                </>  
              ) : (
                <>{todo}</> // in normal mode it should just display the todo
              )}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default App