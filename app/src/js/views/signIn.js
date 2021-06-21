function SignIn() {
  return (
	<div className="App-view">
		<h1>Sign In</h1>
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
					<input type="email" className="form-control" id="input-email" placeholder="name@example.com"/>
				</div>
				<div className="mb-3">
					<label htmlFor="input-password" className="form-label">Password</label>
					<input type="email" className="form-control" id="input-password" placeholder="name@example.com"/>
				</div>
				<div className="pt-4">
					<button className="btn btn-info btn-lg mx-1 w-100">Submit</button>
				</div>
			</form>
		</div>
	)
}

export default SignIn;
