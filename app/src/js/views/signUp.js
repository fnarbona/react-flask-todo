import {useState} from 'react';

function SignUp() {
  return (
	<div className="App-view">
		<h1>Sign Up</h1>
		<Form/>
	</div>
  );
}

function Form() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		if (email === "" || password === "" || confirmPassword === "" ) {
			alert("please fill in all fields before submitting!")
		} else if (password.length < 6) {
			alert("please use at least 6 characters for your password")
		} else if (password !== confirmPassword) {
			alert("passwords do not match!")
		} else {
			fetch("http://localhost:4000/user/signup", {
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
			.then(data => console.log(data))
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
				<div className="mb-3">
					<label htmlFor="input-password" className="form-label">Confirm Password</label>
					<input type="password" className="form-control" id="input-password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
				</div>
				<div className="pt-4">
					<button className="btn btn-info btn-lg mx-1 w-100">Submit</button>
				</div>
			</form>
		</div>
	)
}

export default SignUp;
