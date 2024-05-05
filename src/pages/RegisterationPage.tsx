import logo from '../assets/petMatchFinderLogo.png';
import RegisterationForm from '../components/RegisterationForm';

const RegisterationPage = () => {
  return (
    <div className="w-screen h-screen grid grid-rows-8">
      <img
        src={logo}
        className="row-start-1 row-span-2 self-center justify-self-center pt-16"
      />
      <div className={`w-3/5 h-4/5 border shadow-lg rounded-lg row-start-3 row-span-6 justify-self-center  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100`}>
      <RegisterationForm/>
      </div>
    </div>
  );
};

export default RegisterationPage;
