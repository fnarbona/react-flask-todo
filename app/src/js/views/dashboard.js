import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

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
	const [redirect, setRedirect] = useState(false)
	const todosRef = useRef([])

	// get and update todos on clean up
	useEffect(() => {
		console.log("mounting")
		getTodos();
	}, []);

	const getTodos = () => {
		fetch("http://localhost:4000/get_todos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token")
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.success == true) {
				setTodos(data.todos)
			} else {
				setRedirect(true);
			}
		})
		.catch(err => console.log(err))
	}

	const addTodo = (e) => {
		console.log("add todo")

		if (e.key === 'Enter') {
			const new_todo = {
				title: e.target.value,
				text: "test",
				created_at: new Date(),
				due_date: null,
				complete: false,
				status: "new"
			}

			fetch("http://localhost:4000/add_todo", {
				method: "POST",
				body: JSON.stringify({"todo": new_todo}),
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			})
			.then(res => res.json())
			.then(data => {
				if (data.success == true) {
					getTodos();
					e.target.value = ""
				} else {
					setRedirect(true);
				}
			})
			.catch(err => console.log(err))
		}		
	};

	const editTodo = (e, id, setEditing) => {
		console.log("edit todo")

		if (e.key === 'Enter') {
			let updated_todo = todos.filter(todo => id === todo.id)[0]
			updated_todo.title = e.target.value
			console.log(updated_todo)
			fetch("http://localhost:4000/update_todo", {
				method: "POST",
				body: JSON.stringify({"todo": updated_todo}),
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			})
			.then(res => res.json())
			.then(data => {
				if (data.success == true) {
					getTodos();
				} else {
					setRedirect(true);
				}
				setEditing(false);
			})
			.catch(err => console.log(err))
		}
	};

	const deleteTodo = (id) => {
		console.log("delete todo:", id)
		
		fetch("http://localhost:4000/delete_todo", {
			method: "POST",
			body: JSON.stringify({"todo_id": id}),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token")
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.success == true) {
				getTodos();
			} else {
				setRedirect(true);
			}
		})
		.catch(err => console.log(err))
	}

	const completeTodo = (index) => {
		console.log("complete todo")
		let complete_todos = [...todos]

		complete_todos[index].complete = true;
		setTodos(complete_todos) 
		todosRef.current = complete_todos
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
				{
					todos
					.map((todo, index) => {
						return (
							<Todo
								key={index}
								index={index}
								todo={todo}
								editTodo={editTodo}
								deleteTodo={deleteTodo}
								completeTodo={completeTodo}
							/>
						)
				})}
			</ul>
			{redirect ? <Redirect to="/sign_in" /> : null}
		</div>
	);
}

const Todo = ({ index, todo, editTodo, deleteTodo, completeTodo }) => {
	const [edit, setEdit] = useState(false)
	const [title, setTitle] = useState(todo.title)

	const handleChange = (e) => {
		setTitle(e.target.value)
	}

	return (
		<li
			className="todo-item list-group-item bg-dark text-info"
		>
			<div className="d-flex py-1 justify-content-between align-items-center">
				<div className="todo-title">
					{
						edit ?
							<input
								className="form-control ms-4 bg-dark border-0 border-bottom border-info rounded-0 text-info"
								type="text"
								value={title}
								onChange={handleChange}
								onKeyDown={e => editTodo(e, todo.id, setEdit)}
								aria-label="..." 
							/> :
							<div>
								<input className="form-check-input me-2 bg-dark border-info" type="checkbox" value="" aria-label="..." onChange={() => completeTodo(index)}/>
								{title}
							</div>
					}
				</div>
				<div className="dropdown">
					<button className="todo-button btn btn-sm" type="button" id={`dropdownMenuButton${index}`} data-bs-toggle="dropdown" aria-expanded="false">
						<i className="fas fa-ellipsis-v"></i>
					</button>
					<ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
						<li><div className="dropdown-item" onClick={() => setEdit(!edit)}>Edit</div></li>
						<li><div className="dropdown-item">Set Due Date</div></li>
						<li><div className="dropdown-item text-danger" onClick={() => deleteTodo(todo.id)}>Delete</div></li>
					</ul>
				</div>
			</div>
		</li>
	)
}

export default Dashboard;
