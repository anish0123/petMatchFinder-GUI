import {useEffect, useState} from 'react';
import {User} from '../types/User';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {checkToken, getAdoptionApplicationsByUser} from '../graphql/queries';
import {AdoptionApplication} from '../types/AdoptionApplication';
import AdoptionApplicationContainer from '../components/AdoptionContainer';
import NavBar from '../components/NavBar';

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      setUser(response.checkToken.user);
      const applicationsResponse = await doGraphQLFetch(
        APIUrl,
        getAdoptionApplicationsByUser,
        {
          adopterId: response.checkToken.user.id,
        },
        token!,
      );
      if (applicationsResponse.adoptionApplicationsByAdopter) {
        setApplications(applicationsResponse.adoptionApplicationsByAdopter);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="px-10 py-16">
        <div className="grid grid-cols-4">
          <div>
            <h1 className="text-2xl font-semibold">{user?.user_name}</h1>
            <h1 className="text-base font-semibold">{user?.email}</h1>
            <h1 className="text-base font-semibold">
              {user?.streetAddress}, {user?.postalCode} {user?.city}
            </h1>
          </div>
          <div>
            <button
              className=" mt-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              onClick={() => {
                window.open('/profile/update', '_self');
              }}
            >
              Update Profile
            </button>
          </div>
        </div>

        <div className="w-full h-full grid place-items-center">
          <h1 className="text-2xl font-semibold py-8">Adoption Applications</h1>
          <div className="grid grid-cols-3 gap-8">
            {applications.length !== 0 &&
              applications.map((application, i) => {
                return (
                  <AdoptionApplicationContainer
                    application={application}
                    key={i}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
