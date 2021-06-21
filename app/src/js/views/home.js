import logo from "../../images/logo.svg";

function Home() {
  return (
	<div className="App">
		<header className="App-view">
			<img src={logo} className="App-logo" alt="logo" />
			<h1>Welcome</h1>
			<div className="py-2">
				2Snooze helps you organize your daily tasks!
			</div>
		</header>
	</div>
  );
}

export default Home;
