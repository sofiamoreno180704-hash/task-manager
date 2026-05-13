import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:4000/api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, { headers })
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const createTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const res = await axios.post(`${API}/tasks`, { title, description }, { headers })
      setTasks([res.data, ...tasks])
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error(err)
    }
  }

  const toggleTask = async (task) => {
    try {
      const res = await axios.put(`${API}/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      }, { headers })
      setTasks(tasks.map(t => t.id === task.id ? res.data : t))
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`, { headers })
      setTasks(tasks.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Hola, {user?.name} 👋</h1>
        <button style={styles.logoutBtn} onClick={logout}>Cerrar sesión</button>
      </div>

      <form onSubmit={createTask} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Nueva tarea..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button style={styles.addBtn} type="submit">+ Agregar</button>
      </form>

      <div style={styles.taskList}>
        {tasks.length === 0 && (
          <p style={styles.empty}>No tienes tareas aún. ¡Agrega una!</p>
        )}
        {tasks.map(task => (
          <div key={task.id} style={{
            ...styles.taskCard,
            opacity: task.completed ? 0.6 : 1
          }}>
            <div style={styles.taskLeft}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
                style={styles.checkbox}
              />
              <div>
                <p style={{
                  ...styles.taskTitle,
                  textDecoration: task.completed ? 'line-through' : 'none'
                }}>{task.title}</p>
                {task.description && (
                  <p style={styles.taskDesc}>{task.description}</p>
                )}
              </div>
            </div>
            <button style={styles.deleteBtn} onClick={() => deleteTask(task.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { fontSize: '24px', color: '#1a1a2e', margin: 0 },
  logoutBtn: { background: 'none', border: '1px solid #ddd', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', color: '#666', fontSize: '13px' },
  form: { background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '1.5rem' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  addBtn: { width: '100%', padding: '0.75rem', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
  taskList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  taskCard: { background: '#fff', padding: '1rem 1.25rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  taskLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#6c63ff' },
  taskTitle: { margin: 0, fontSize: '15px', color: '#1a1a2e' },
  taskDesc: { margin: '3px 0 0', fontSize: '12px', color: '#999' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: '16px', padding: '4px 8px' },
  empty: { textAlign: 'center', color: '#aaa', fontSize: '14px', marginTop: '2rem' }
}

export default Tasks