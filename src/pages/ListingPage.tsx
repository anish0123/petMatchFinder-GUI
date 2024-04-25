import {useEffect, useState} from 'react';
import {Animal} from '../types/Animal';
import {APIUrl} from '../constants';
import {getAllAnimals} from '../graphql/queries';
import {doGraphQLFetch} from '../graphql/fetch';
import NavBar from '../components/NavBar';
import AnimalContainer from '../components/AnimalContainer';

const ListingPage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const animalsResponse = await doGraphQLFetch(APIUrl, getAllAnimals, {});
        setAnimals(animalsResponse.animals);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className='grid'>
        <h1 className="text-4xl font-semibold text-gray-800 justify-self-center mt-8">
          Available Pets
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8 px-8 border-t pt-2">
          {animals.map((animal, i) => (
            <AnimalContainer key={i} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
