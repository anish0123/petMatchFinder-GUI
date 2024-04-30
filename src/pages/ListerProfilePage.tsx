import {useEffect, useState} from 'react';
import {User} from '../types/User';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {checkToken, getAnimalsByOwner} from '../graphql/queries';
import NavBar from '../components/NavBar';
import {Animal} from '../types/Animal';
import AnimalContainer from '../components/AnimalContainer';

const ListerProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (response.checkToken) {
        setUser(response.checkToken.user);
      }
      const animalsResponse = await doGraphQLFetch(
        APIUrl,
        getAnimalsByOwner,
        {
          ownerId: response.checkToken.user.id,
        },
        token!,
      );
      
      console.log("animalsResponse: ", animalsResponse);
      if (animalsResponse.animalsByOwner) {
        
        setAnimals(animalsResponse.animalsByOwner);
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
          <h1 className="text-2xl font-semibold py-8">Listed Animals</h1>
          <div className="grid grid-cols-3 gap-8">
            {animals.length !== 0 &&
              animals.map((animal, i) => {
                return <AnimalContainer animal={animal} key={i} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListerProfilePage;