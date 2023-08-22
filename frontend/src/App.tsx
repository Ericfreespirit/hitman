import './App.css';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Profil from './page/Profil';
import Home from './page/Home';
import Header from './component/Header'
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
		<div>
			<Header/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/sign-in" element={<SignIn/>}/>
				<Route path="/sign-up" element={<SignUp/>}/>
				<Route path="/profil" element={<Profil/>}/>

				<Route path="*" element={<h1>Error 404</h1>}/>
			</Routes>
		</div>
  );
}

export default App;
