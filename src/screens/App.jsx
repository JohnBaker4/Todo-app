import './App.css'
import axios from 'axios'
import Row from '../components/Row';
import { useEffect, useState } from 'react'
import { useUser } from '../context/useUser'

const url = 'http://localhost:3001'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user } = useUser()

  useEffect(() => {
 axios.get(url)
 .then(response => {
 setTasks(response.data)
 })
 .catch(error => {
 alert(error.response.data ? error.response.data.message : error)
 })
 }, [])

  const addTask = () => {
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };
    const newTask = { description: task }

 axios.post(`${url}/create`, { task: newTask }, headers)
 .then(response => {
 setTasks([...tasks,response.data])
 setTask('')
 })
 .catch(error => {
      const errMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Unknown error';
      alert(errMsg);
    })
} 

const deleteTask = (deleted) => {
  const headers = { headers: { Authorization: `Bearer ${user.token}` } };
  console.log(headers)  
  axios.delete(`${url}/delete/${deleted}`, headers)
    .then(() => {
      setTasks(prevTasks => prevTasks.filter(item => item.id !== deleted));
    })
    .catch(error => {
      const errMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Unknown error';
      alert(errMsg);
    })
}


  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input 
        placeholder='Add a new task'
        value={task ?? ''}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
          } 
        }}
      >
      </input>
      </form>
     <ul>
  {tasks.map((item) => (
    <Row item={item} key={item.id} deleteTask={deleteTask} />
  ))}
</ul>
     <footer>
       <p>{tasks.length} task{tasks.length !== 1 ? 's' : ''} remaining</p>
     </footer>
    </div>

  )

}

export default App;
