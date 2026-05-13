import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/tasks')
    } catch (err) {
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar sesión</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit">Entrar</button>
        </form>
        <p style={styles.link}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  card: { background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: '380px' },
  title: { marginBottom: '1.5rem', textAlign: 'center', color: '#1a1a2e' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  error: { color: 'red', marginBottom: '1rem', fontSize: '14px' },
  link: { textAlign: 'center', marginTop: '1rem', fontSize: '14px' }
}

export default Login