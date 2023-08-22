import './Profil.css'
import logo from '../image/hitman-logo.png'
import {useState, useEffect} from 'react'
import verifyToken from '../tool/verifyToken';
import {useNavigate} from 'react-router-dom';
import Mission from './Mission';
import Dashboard from './Dashboard';
import axios, {AxiosError} from 'axios';
import {UserProfil} from "../interface"





function Profil(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isProfileVisible, setIsProfileVisible] = useState(false);
	const [phoneInput, setPhoneInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [pwdInput, setPwdInput] = useState('');
	const [btn, setBtn] = useState(true);
  const initialUser: UserProfil = {
    username: '',
    first_name: '',
    last_name: '',
    mail: '',
    pwd: '',
    phone: '',
  };
	const [userData, setUserData] = useState<UserProfil>(initialUser);
	const [editPhone, setEditPhone] = useState(false);
	const [editMail, setEditMail] = useState(false);
	const [editPwd, setEditPwd] = useState(false);
	const navigate = useNavigate();


	const fetchData = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get('http://localhost:5000/user/getData', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUserData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token)
        .then(isValid => {
          setIsAuthenticated(isValid);
        });
    } else {
      setIsAuthenticated(false);
			navigate('/sign-in')
    }
		fetchData();
  },[navigate]);

  const handleEditMail = () => {
    setEditMail(true);
  };

	const handleEditPhone = () => {
    setEditPhone(true);
  };
	const handleEditPwd = () => {
    setEditPwd(true);
  };

  const handleCancelEmail = () => {
    setEditMail(false);
  };
	const handleCancelPhone = () => {
    setEditPhone(false);
  };
	const handleCancelPwd = () => {
    setEditPwd(false);
  };

  const handleEmailChange = (event: any) => {
    setEmailInput(event.target.value);
  };
  const handlePwdChange = (event: any) => {
    setPwdInput(event.target.value);
  };
	const handlePhoneChange = (event: any) => {
    setPhoneInput(event.target.value);
  };

  const handleSaveEmail = async () => {
    try {
			const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/user/updateMail?mail=${emailInput}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
			const updatedUserData = {
				...userData,
				mail: res.data
			};
			setUserData(updatedUserData);
      setEditMail(false);
			console.log(res.data);
    } catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (axiosError.response) {
					alert(axiosError.response.data);
				} else {
					alert('An error occurred');
				}
			} else {
				alert('An error occurred');
			}
    }  
	};

	const handleSavePhone = async () => {
    try {
			const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/user/updatePhone?phone=${phoneInput}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
			const updatedUserData = {
				...userData,
				phone: res.data
			};
			setUserData(updatedUserData);
      setEditPhone(false);
			console.log(res.data);
    } catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (axiosError.response) {
					alert(axiosError.response.data);
				} else {
					alert('An error occurred');
				}
			} else {
				alert('An error occurred');
			}
    }  
	};

  const handleSavePwd = async () => {
    try {
			const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/user/updatePwd?pwd=${pwdInput}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
			const updatedUserData = {
				...userData,
				pwd: res.data
			};
			setUserData(updatedUserData);
      setEditPwd(false);
    } catch (error) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (axiosError.response) {
					alert(axiosError.response.data);
				} else {
					alert('An error occurred');
				}
			} else {
				alert('An error occurred');
			}
    }  
	};

	const  handleLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		navigate('/')
	}

	const handleDashboard = () =>{
		setBtn(true);
	}

	const handleMission = () => {
    setBtn(false); 
  };

  const toggleProfile = () => {
    setIsProfileVisible(prev => !prev);
  };

  if (!isAuthenticated) {
    return (
			<div className='d-flex justify-content-center align-items-center'>
				<h1>Loading...</h1>
			</div>
		)
  }
	return (
		<div style={{display:"flex", flexDirection:"row", width:'100%', height:"100%"}}>
    	<div className="profil-container">
    	  <button className="profil-toggle-button" onClick={toggleProfile}>
    	    <h1> {'≡'} </h1>
    	  </button>
    	  <div className={`profile ${isProfileVisible ? 'visible' : ''}`}>
					<div className='profil-data'>
						<h5>Identifier: </h5>
						<p>{userData.username}</p>
					</div>
					<div className='profil-data'>
						<h5>First name: </h5>
						<p>{userData.first_name}</p>
					</div>

					<div className='profil-data'>
						<h5>Last name: </h5>
						<p>{userData.last_name}</p>
					</div>
					<div className='profil-data'>
						<h5>Mail:</h5>
						{editMail ? (
         	 <div >
            <input type='text' value={emailInput} onChange={handleEmailChange} />
            <button onClick={handleSaveEmail}>Save</button>
            <button onClick={handleCancelEmail}>Cancel</button>
           </div>
       		 ) : (
       		   <div className='d-flex justify-content-between'>
       		     <p>{userData.mail}</p>
       		     <button className="profil-btn-edit"onClick={handleEditMail}>Edit</button>
       		   </div>
       		 )}
					</div>
					<div className='profil-data'>
						<h5>Password:</h5>
						{editPwd ? (
         	 <div >
            <input type='password' value={pwdInput} onChange={handlePwdChange} />
            <button onClick={handleSavePwd}>Save</button>
            <button onClick={handleCancelPwd}>Cancel</button>
           </div>
       		 ) : (
       		   <div className='d-flex justify-content-between'>
								<p>**********</p>
       		     <button className="profil-btn-edit"onClick={handleEditPwd}>Edit</button>
       		   </div>
       		 )}
					</div>
					<div className='profil-data'>
						<h5>Phone:</h5>
						{editPhone ? (
         	 <div >
            <input type='text' value={phoneInput} onChange={handlePhoneChange} />
            <button onClick={handleSavePhone}>Save</button>
            <button onClick={handleCancelPhone}>Cancel</button>
           </div>
       		 ) : (
       		   <div className='d-flex justify-content-between'>
       		     <p>{userData.phone}</p>
       		     <button className="profil-btn-edit"onClick={handleEditPhone}>Edit</button>
       		   </div>
       		 )}
					</div>

					<div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"30px", marginBottom:"30px"}}>
					<img className="logo" src={logo} alt="logo" />
					</div>
					<div style={{display:"flex", justifyContent:"center", alignItems:"center",  marginBottom:"30px"}}>
						<button onClick={handleLogout}> 🔴  Disconnect</button>
					</div>

    	  </div>
    	</div>
			<div className="profil-container2">
				<div className='d-flex'>
					<button 
						className={`dashboard-button ${btn ? "active" : ""}`}
						onClick={handleDashboard}
					> 
						Dashboard
					</button>
					<button 
						className={`dashboard-button ${!btn ? "active" : ""}`}
						onClick={handleMission}
					> 
						Mission
					</button>
				</div>
				<div className='profil-container-contract'>
					{btn ? <Dashboard/> :  <Mission/>}
				</div>
			</div>
		</div>
	);
}

export default Profil;