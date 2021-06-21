import MenuAppBar from './js/components/nav';
import Home from './js/views/home';
import SignUp from './js/views/signUp';
import SignIn from './js/views/signIn';
import Dashboard from './js/views/dashboard';

import './stylesheets/sass/App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<MenuAppBar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/sign_up">
						<SignUp />
					</Route>
					<Route path="/sign_in">
						<SignIn />
					</Route>
					<Route path="/todos">
						<Dashboard />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
