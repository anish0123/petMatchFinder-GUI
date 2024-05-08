import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/petMatchFinderLogo.png';
import {useEffect, useState} from 'react';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {checkToken} from '../graphql/queries';

type NavBarProps = {
  disableBackButton?: boolean;
};

const NavBar = ({disableBackButton}: NavBarProps) => {
  const [userRole, setUserRole] = useState<string>();
  const token = localStorage.getItem('token');
  const onLogout = () => {
    localStorage.removeItem('token');
    window.open('/', '_self');
  };

  const viewProfile = () => {
    window.open('/profile', '_self');
  };

  const addAnimal = () => {
    window.open('/animals/add', '_self');
  };

  const onClickBack = () => {
    history.back();
  };

  const onLogoClick = () => {
    window.open('/animals', '_self');
  };

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (response.checkToken.user.role) {
        setUserRole(response.checkToken.user.role);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <div className="h-14 bg-gray-50 border-b-2 shadow-lg grid grid-flow-col grid-cols-8 px-8">
        {disableBackButton ? (
          <></>
        ) : (
          <button
            className="col-start-1 font-semibold w-fit underline"
            onClick={onClickBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
            Back
          </button>
        )}

        <img src={logo} className="h-14 w-20 justify-self-center col-start-4 hover:cursor-pointer" onClick={onLogoClick}/>
        <div
          className={`justify-self-end  gap-4 grid ${userRole === 'admin' ? ' col-start-6 col-span-3 grid-cols-4' : 'col-start-7 col-span-2 grid-cols-3'}`}
        >
          {userRole === 'admin' && (
            <button
              className=" pl-4 content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 pl-2 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              onClick={addAnimal}
            >
              Categories
            </button>
          )}
          <button
            className="content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 pl-2 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            onClick={addAnimal}
          >
            Add Animal
          </button>

          <button
            className="content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            onClick={viewProfile}
          >
            Profile
          </button>
          <button
            className="content-center mt-2 h-3/5 inline-flex items-center pl-8 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
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
