import { useState } from 'react';
import axios from 'axios';
import './Mission.css';

function Mission() {
  const [data, setData] = useState({
    id: '',
    name: '',
    image: '',
    species: '',
    gender: '',
    origin: '',
    location: ''
  });

  const [showContainer, setShowContainer] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${data.id}`
      );
      setData({
        id: data.id,
        name: res.data.name,
        image: res.data.image,
        species: res.data.species,
        gender: res.data.gender,
        origin: res.data.origin.name,
        location: res.data.location.name
      });
      setShowContainer(true);
    } catch (err) {
      console.error('Error:', err);
      setData({
        id: '',
        name: 'No character',
        image: '',
        species: 'none',
        gender: 'none',
        origin: 'none',
        location: 'none'
      });
      setShowContainer(false); 
    }
  }

	const saveContract = async () => {
		try{
			const token = localStorage.getItem('token');
			await axios.post(
        `http://localhost:5000/user/acceptContract?
				name=${data.name}
				&image=${data.image}
				&species=${data.species}
				&gender=${data.gender}
				&origin=${data.origin}
				&location=${data.location}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
			window.location.reload();
		}
		catch(err){
				console.log(err);
		}
	}

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <h5>Assassination mission</h5>
      <form className="mt-3"  onSubmit={handleSubmit}>
        <input
          type='text'
          name='id'
          placeholder='Insert an id contract '
          value={data.id}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
      {showContainer && ( 
        <div className='div-container1'>
          <h1>{data.name}</h1>
          <img width='100px' height='100px' src={data.image} alt='Character' />
          <p>Species: <i>{data.species}</i></p>
          <p>Gender: <i>{data.gender}</i></p>
          <p>Origin: <i>{data.origin}</i></p>
          <p>Location: <i>{data.location}</i></p>
          <button onClick={saveContract}>Accept contract</button>
        </div>
      )}
    </div>
  );
}

export default Mission;
