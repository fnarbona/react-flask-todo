import {useState} from 'react';

function SignIn() {
  return (
	<div className="App-view">
		<h1>Sign In</h1>
		<Form/>
	</div>
  );
}

function Form() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email === "" || password === "") {
			alert("please fill in all fields before submitting!")
		} else {
			fetch("http://localhost:4000/user/signin", {
				method: "POST",
				body: JSON.stringify({
					"email": email,
					"password": password
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data.success)
				localStorage.setItem("token", data.token)
			})
			.catch(err => console.log(err))
		}
	}

	return (
		<div className="py-5 w-20">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="input-email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="input-email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div className="mb-3">
					<label htmlFor="input-password" className="form-label">Password</label>
					<input type="password" className="form-control" id="input-password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<div className="pt-4">
					<button className="btn btn-info btn-lg mx-1 w-100">Submit</button>
				</div>
			</form>
		</div>
	)
}

export default SignIn;
