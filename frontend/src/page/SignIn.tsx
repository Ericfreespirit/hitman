import logo from '../image/hitman-logo.png'
import "./SignIn.css"
import {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import verifyToken from '../tool/verifyToken';
import Profil from "../page/Profil"



function SignIn(){
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [authCheckCompleted, setAuthCheckCompleted] = useState(false);
const [data, setData] = useState({
		username: '',
		pwd:''
	});
	const navigate = useNavigate();

	useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token)
        .then(isValid => {
          setIsAuthenticated(isValid);
					setAuthCheckCompleted(true);
        });
    } else {
      setIsAuthenticated(false);
			setAuthCheckCompleted(true);
    }
  },[isAuthenticated]);


	const handleLogin = (newToken : string) => {
		localStorage.setItem('token', newToken);
  };

	async function handleSubmit(e :any){
		e.preventDefault();
		try {
      const res = await axios.post(`http://localhost:5000/auth/login?username=${data.username}&password=${data.pwd}`);
			if (res.status === 200) {
				console.log('Login successful');
				handleLogin(res.data.accessToken);
				navigate('/profil')
			} else {
				console.log('Login failed');
			}
		} catch (err) {
			console.error('Error:', err);
			alert(err);
		}
	};

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
		
	return(
	<>
		{authCheckCompleted ? (
		isAuthenticated ? <Profil/> :
		<div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
		<div className='signin-container'>
			<img className="logo" src={logo} alt="logo" />
			<h3>Connection</h3>
		</div>
		<div >
		<form className='signin-form' onSubmit={handleSubmit}>
				<label> Identifier</label>
				<input
					type="text"
					name="username"
					value={data.username}
					onChange={handleChange}
				/>
				<label> Password</label>
				<input
					type="password"
					name="pwd"
					value={data.pwd}
					onChange={handleChange}
				/>
				<button style={{margin:"20px"}}type="submit"> Submit </button>
			</form>
		</div>

	</div>
		): (
			<div className='d-flex justify-content-center align-items-center'>
				<h1>Loading...</h1>
			</div>			
			)}
		</>
	);
}

export default SignIn;