import React, {useEffect, useState} from 'react';
import {User} from '../types/User';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {
  checkToken,
  getAdoptionApplicationsByUser,
  getAnimalsByOwner,
} from '../graphql/queries';
import {AdoptionApplication} from '../types/AdoptionApplication';
import AdoptionApplicationContainer from '../components/AdoptionContainer';
import NavBar from '../components/NavBar';
import {Tab, Tabs} from '@mui/material';
import {Animal} from '../types/Animal';
import AnimalContainer from '../components/AnimalContainer';

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const token = localStorage.getItem('token');
  const [value, setValue] = React.useState<
    'listedAnimals' | 'adoptionApplications'
  >('listedAnimals');

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: 'listedAnimals' | 'adoptionApplications',
  ) => {
    setValue(newValue);
  };

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
      const animalsResponse = await doGraphQLFetch(
        APIUrl,
        getAnimalsByOwner,
        {
          ownerId: response.checkToken.user.id,
        },
        token!,
      );

      console.log('animalsResponse: ', animalsResponse);
      if (animalsResponse.animalsByOwner) {
        console.log("working");
        setAnimals(animalsResponse.animalsByOwner);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="">
        <div className="grid grid-cols-4 border-b shadow-lg px-10 py-16">
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

        <div className="w-full h-full grid place-items-center px-10 pt-4">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            centered
          >
            <Tab value="listedAnimals" label="Listed Animals" wrapped />
            <Tab value="adoptionApplications" label="Adoption Applications" />
          </Tabs>
          {value === 'listedAnimals' && (
            <div className="grid grid-cols-3 gap-8 pt-4">
              {animals.length !== 0 ? (
                animals.map((animal, i) => {
                  return <AnimalContainer animal={animal} key={i} />;
                })):(
                  <h1 className='pt-2 font-semibold text-xl uppercase justify-self-center col-start-1 col-span-3'>No animals listed</h1>
                )}
            </div>
          )}
          {
            value === 'adoptionApplications' && (
              <div className="grid grid-cols-3 gap-8 pt-4">
            {applications.length !== 0 ? (
              applications.map((application, i) => {
                return (
                  <AdoptionApplicationContainer
                  showAdopterDetails={false}
                    application={application}
                    key={i}
                  />
                );
              })) :(
                <h1 className='pt-2 font-semibold text-xl uppercase justify-self-center col-start-1 col-span-3'>No adoption applications</h1>
              )}
          </div>
            )

          }
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
