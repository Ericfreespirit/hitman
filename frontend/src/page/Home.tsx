import './Home.css'

function Home (){

	return(
		<div className="home-container">
			<h1 className='home-slogan'> BE DISCREET.</h1>
				<div className="home-btn">
					<a className='home-btn-signin' href='http://localhost:3000/sign-in'>
						Connection
					</a>
					<a className='home-btn-signup' href="http://localhost:3000/sign-up">
						Sign Up
					</a>
				</div>
		</div>
	);
}

export default Home;