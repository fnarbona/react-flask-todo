function SignUp() {
  return (
	<div className="App-view">
		<h1>Sign Up</h1>
		<Form/>
	</div>
  );
}

function Form() {
	return (
		<div className="py-5 w-20">
			<form>
				<div className="mb-3">
					<label htmlFor="input-email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="input-email" placeholder="email"/>
				</div>
				<div className="mb-3">
					<label htmlFor="input-password" className="form-label">Password</label>
					<input type="password" className="form-control" id="input-password" placeholder="password"/>
				</div>
				<div className="mb-3">
					<label htmlFor="input-password" className="form-label">Confirm Password</label>
					<input type="password" className="form-control" id="input-password" placeholder="confirm password"/>
				</div>
				<div className="pt-4">
					<button className="btn btn-info btn-lg mx-1 w-100">Submit</button>
				</div>
			</form>
		</div>
	)
}

export default SignUp;
