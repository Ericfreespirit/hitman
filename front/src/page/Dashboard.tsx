import {useState, useEffect} from 'react'
import axios from 'axios'
import './Dashboard.css'

export interface DataContract {
	id : number;
  name: string;
  image: string;
	location: string;
	origin: string;
  species: string;
  gender: string;
}



function Dashboard(){
	const[isContract, setContract] = useState(false);
	const [dataContract, setDataContract] = useState<DataContract[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		async function getUserContract (){
			try{
				await axios.get('http://localhost:5000/user/whoami', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const response = await axios.get(`http://localhost:5000/user/contracts`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response.data);
				setDataContract(response.data);
				if (response.data.length !== 0)
					setContract(true);
			}
			catch(err){
				console.error('Error fetching data:', err);
			}
		}
			getUserContract();
	},[])

	const deleteContract = async (contract_id : number) =>{
		const token = localStorage.getItem('token');
		try {
			await axios.delete(`http://localhost:5000/user/${contract_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			window.location.reload();
		}
		catch(err){
			console.error('Error:', err);	
		}
	};

	return (
		<div className='d-flex flex-column align-items-center'>
		<h5> Your assassination contract(s)</h5>
		<div className=''>
			{isContract &&
				dataContract.map((item: DataContract) => (
						<div className="dashboard-contract" key={item.id}>
							<h3>{item.name}</h3>
							<img width='100px' height='100px'  src={item.image} alt={item.name}/>
							<p>Species: <i>{item.species}</i></p>
							<p>Gender: <i>{item.gender}</i></p>
							<p>Origin: <i>{item.origin}</i></p>
							<p>Location: <i>{item.location}</i></p>
							<button onClick={() => deleteContract(item.id)}>Delete</button>
						</div>
				))
			}
		</div>
	</div>
	

	);
}

export default Dashboard;