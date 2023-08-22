import logo from '../image/hitman-logo.png'
import "./SignUp.css"
import {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function SignUp(){
const navigate = useNavigate();
const [data, setData] = useState({
		username: '',
		phone:'',
		first_name:'',
		last_name:'',
		mail:'',
		conf_mail:'',
		pwd:'',
		conf_pwd:''
	});


  const validationRules = [
		{
      check: data.username !== '' && data.first_name !== '' && data.last_name !== '',
      message: 'Missing information',
    },
		{
			check: /^[0-9]{10}$/.test(data.phone),
			message: 'Phone format is incorrect',
		},
    {
      check: data.mail === data.conf_mail,
      message: 'Mail is different',
    },
		{
			check: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.mail),
			message: 'Mail format is incorrect',
		},
    {
      check: data.pwd === data.conf_pwd,
      message: 'Password is different',
    },
    {
      check: data.pwd.length >= 6 && data.pwd.length <= 16,
      message: 'Password should have 6 to 16 characters',
    },
  ];

  const validateForm = () => {
    const invalidRule = validationRules.find(rule => !rule.check);
    if (invalidRule) {
      alert(invalidRule.message);
      return false;
    }
    return true;
  };

	async function handleSubmit(e :any){
		e.preventDefault();
		if (!validateForm())
			return;
		try {
			const res = await axios.post(`http://localhost:5000/auth/register?
				username=${data.username}
				&first_name=${data.first_name}
				&last_name=${data.last_name}
				&mail=${data.mail}
				&pwd=${data.pwd}
				&phone=${data.phone}`
			)
			console.log(res)
			if (res.status === 201) {
				console.log('Registration successful');
				navigate('/sign-in')
			} else {
				console.log(res);
				alert('Registration failed:');
			}
		}
		catch(err){
			console.error('Error:', err);
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
		<div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
			<div className='signup-container'>
				<img className="logo" src={logo} alt="logo" />
				<h3>Create an account</h3>
			</div>
			<div >
			<form className='signup-form' onSubmit={handleSubmit}>
				<div className='signup-form-input'>
					<div className='signup-form-input-content'>
						<label> Identifier</label>
						<input
							type="text"
							name="username"
							value={data.username}
							onChange={handleChange}
						/>
						<label> First name</label>
						<input
							type="text"
							name="first_name"
							value={data.first_name}
							onChange={handleChange}
						/>
						<label> E-mail</label>
						<input
							type="text"
							name="mail"
							value={data.mail}
							onChange={handleChange}
						/>
						<label> Password</label>
						<input
							type="password"
							name="pwd"
							value={data.pwd}
							onChange={handleChange}
						/>
					</div>
					<div className='signup-form-input-content'>
						<label> Phone</label>
						<input
							type="text"
							name="phone"
							value={data.phone}
							onChange={handleChange}
							/>
						<label> Last Name</label>
						<input
							type="text"
							name="last_name"
							value={data.last_name}
							onChange={handleChange}
							/>
						<label> Confirm mail</label>
						<input 
							type="text"
							name="conf_mail"
							value={data.conf_mail}
							onChange={handleChange}
							/>
							<label> Confirm password</label>
						<input
							type="password"
							name="conf_pwd"
							value={data.conf_pwd}
							onChange={handleChange}
							/>
					</div>
				</div>
					<button style={{margin:"20px"}}type="submit"> Submit </button>
				</form>
			</div>

		</div>
	);
}

export default SignUp;