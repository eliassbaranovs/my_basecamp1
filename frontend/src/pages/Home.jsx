import Login from '../components/Login'
import Register from '../components/Register'


function Home
() {
  return (
    <div className="h-full flex justify-center items-center">
      <Login />
      <Register />
    </div>
  );
}

export default Home;
