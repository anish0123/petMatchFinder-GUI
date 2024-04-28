import logo from '../assets/petMatchFinderLogo.png';

const NavBar = () => {
  const onLogout = () => {
    localStorage.removeItem('token');
    window.open('/', '_self');
  };

  const viewProfile = () => {
    window.open('/profile', '_self');
  }

  return (
    <>
      <div className="h-14 bg-gray-50 border-b-2 shadow-lg grid grid-flow-col grid-cols-8 px-8">
        <img src={logo} className="h-14 w-20 justify-self-center col-start-4" />
        <div className='justify-self-end col-start-7 col-span-2 gap-4 grid grid-cols-2'>
          <button className="mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100" onClick={viewProfile}>
             Profile
          </button>
          <button
            className="mt-2 h-3/5 inline-flex items-center px-4 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
            onClick={() => onLogout()}
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
