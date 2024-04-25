import logo from '../assets/petMatchFinderLogo.png';

const NavBar = () => {

  const onLogout = () => {
    console.log("working");
    localStorage.removeItem('token');
    window.open('/', '_self');
  };

  return (
    <>
      <div className="h-14 bg-gray-50 border-b-2 shadow-lg grid grid-flow-col grid-cols-8 px-8">
        <img src={logo} className="h-14 w-20 justify-self-center col-start-4" />
        <button className="mt-2 h-2/3 justify-self-end col-start-8 inline-flex items-center px-4 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110" onClick={() => onLogout()}>
          Log out
        </button>
      </div>
    </>
  );
};

export default NavBar;
