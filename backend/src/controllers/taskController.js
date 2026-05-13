const pool = require('../config/db')

const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tareas', error: err.message })
  }
}

const createTask = async (req, res) => {
  const { title, description } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, title, description]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: 'Error al crear tarea', error: err.message })
  }
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description, completed, id, req.user.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: err.message })
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }
    res.json({ message: 'Tarea eliminada' })
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar tarea', error: err.message })
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask }