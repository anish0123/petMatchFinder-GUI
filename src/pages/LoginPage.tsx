import logo from '../assets/petMatchFinderLogo.png';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-8">
      <img
        src={logo}
        className="row-start-1 row-span-2 self-center justify-self-center pt-16"
      />
      <div className="w-2/5 h-3/4 bg-blue-800 border shadow-lg rounded-lg row-start-3 row-span-7 justify-self-center  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
