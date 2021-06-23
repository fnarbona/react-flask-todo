import {useState, useEffect} from 'react';

const Dashboard = () => {
	return (
		<div className="App-view">
			<h1>Dashboard</h1>
			<TodoList />
		</div>
	);
}

const TodoList = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/get_todos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token")
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		})
		.catch(err => console.log(err))

		return () => {
			fetch("https://localhost:4000/set_todos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				},
				body: JSON.stringify({"todos": todos})
			})
			.then(res => res.json())
			.then(data => console.log(data.success))
			.catch(err => console.log(err))
		}
	}, []);

	const addTodo = (e) => {
		if (e.key === 'Enter') {
			const todo = {
				title: e.target.value, 
				text: "test",
				created_at: Date.now(),
				due_date: null
			}
			setTodos(todos.concat(todo))
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
						<Todo index={index} todo={todo} handleDelete={() => deleteTodo(index)} />	
					)
				})}
			</ul>
		</div>
	);
}

const Todo = ({index, todo, handleDelete}) => (
	<li
		key={index}
		className="todo-item list-group-item bg-dark text-info"
	>
		<div className="d-flex py-1 justify-content-between align-items-center">
			<div className="todo-title">
				<input className="form-check-input me-2 bg-dark border-info" type="checkbox" value="" aria-label="..." />
				{todo.title}
			</div>
			<div className="dropdown">
				<button className="todo-button btn btn-sm" type="button" id={`dropdownMenuButton${index}`} data-bs-toggle="dropdown" aria-expanded="false">
					<i className="fas fa-ellipsis-v"></i>
				</button>
				<ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
					<li><div className="dropdown-item">Action</div></li>
					<li><div className="dropdown-item">Another action</div></li>
					<li><div className="dropdown-item text-danger" onClick={handleDelete}>Delete</div></li>
				</ul>
			</div>
		</div>
	</li>
)

export default Dashboard;
