import React from 'react';

const Dashboard = () => {
	return (
		<div className="App-view">
			<h1>Dashboard</h1>
			<TodoList />
		</div>
	);
}

const TodoList = () => {
	const [todos, setTodos] = React.useState([]);

	React.useEffect(() => {
		setTodos([
			{
				title: 'item 1',
				text: 'this is a todo'
			},
			{
				title: 'item 2',
				text: 'this is a todo'
			},
			{
				title: 'item 3',
				text: 'this is a todo'
			}
		]);
	}, []);

	const addTodo = (e) => {
		if (e.key === 'Enter') {
			setTodos(todos.concat({title: e.target.value, text: ""}))
			e.target.value = ""
		}
	};

	const deleteTodo = (key) => {
		setTodos(todos.filter((todo, index) => {
			return key !== index
		}))
	}

	return (
		<div className="w-50 my-3 fs-5">
			<div className="mb-3">
				<input
					type="email"
					className="form-control"
					id="input-email"
					placeholder="enter a new todo"
					aria-label="enter-todo"
					onKeyDown={addTodo}
				/>
			</div>
			<ul className="list-group">
				{todos.map((todo, index) => {
					return (
						<Todo key={index} todo={todo} handleClick={() => deleteTodo(index)} />	
					)
				})}
			</ul>
		</div>
	);
}

const Todo = ({todo, key, handleClick}) => (
	<li
		key={key}
		className="todo-item list-group-item bg-dark text-info"
	>
		<div className="d-flex py-1 justify-content-between align-items-center">
			<div className="todo-title">
				<input class="form-check-input me-2 bg-dark border-info" type="checkbox" value="" aria-label="..." />
				{todo.title}
			</div>
			<button className="todo-button btn btn-sm" onClick={handleClick}>
				<span><i class="fas fa-times"></i></span>
			</button>
		</div>
	</li>
)

export default Dashboard;
