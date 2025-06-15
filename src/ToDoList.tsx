import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

type Sort = 'default' | 'asc' | 'desc';

const LOCAL_STORAGE_KEY = 'todo-list-tasks';

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('default');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Task cannot be empty.');
      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput('');
    setError('');
  };

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingId(id);
      setEditText(task.text);
    }
  };

  const handleSaveEdit = (id: number) => {
    if (!editText.trim()) {
      setError('Task cannot be empty.');
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText.trim() } : task
      )
    );
    setEditingId(null);
    setEditText('');
    setError('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks];
  if (sort === 'asc') sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
  if (sort === 'desc') sortedTasks.sort((a, b) => b.text.localeCompare(a.text));

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="todo-controls">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <label>Sort: </label>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="default">Default</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <ul className="todo-list">
        {sortedTasks.length === 0 ? (
          <li className="empty">No tasks to show.</li>
        ) : (
          sortedTasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editingId === task.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                </div>
              ) : (
                <>
                  <span
                    className="task-text"
                    onClick={() => handleToggleComplete(task.id)}
                    style={{ cursor: 'pointer', textDecoration: task.completed ? 'line-through' : 'none' }}
                  >
                    {task.text}
                  </span>
                  <div className="task-actions">
                    <button className="complete-btn" onClick={() => handleToggleComplete(task.id)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button className="edit-btn" onClick={() => handleEditTask(task.id)}>
                      Edit
                    </button>
                    <button className="remove-btn" onClick={() => handleRemoveTask(task.id)}>
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ToDoList; 