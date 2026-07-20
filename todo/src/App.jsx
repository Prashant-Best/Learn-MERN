import { useEffect, useMemo, useState } from 'react';
import './App.css';

const initialTasks = [
  { id: 1, title: 'Learn React', description: 'Build a small todo app', completed: false },
  { id: 2, title: 'Drink water', description: 'Stay hydrated', completed: true },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('react-todo-tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('react-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const remainingCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: trimmedTitle,
        description: description.trim(),
        completed: false,
      },
    ]);

    setTitle('');
    setDescription('');
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-shell">
      <div className="todo-card">
        <h1>React Todo List</h1>
        <p className="subtitle">Add, complete, and remove tasks in one place.</p>

        <form onSubmit={addTask} className="input-area">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a task"
            required
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter a description"
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="task-header">
          <h2>Tasks</h2>
          <span>{remainingCount} remaining</span>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'task-item completed' : 'task-item'}>
              <label>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                <span>
                  <strong>{task.title}</strong>
                  {task.description ? <small>{task.description}</small> : null}
                </span>
              </label>
              <button onClick={() => deleteTask(task.id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
