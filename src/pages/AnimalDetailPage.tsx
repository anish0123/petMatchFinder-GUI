import {useEffect, useState} from 'react';
import {Animal} from '../types/Animal';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {getAnimalById} from '../graphql/queries';
import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';

const AnimalDetailPage = () => {
  const [animal, setAnimal] = useState<Animal>();
  const {animalId} = useParams();

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, getAnimalById, {
        animalByIdId: animalId,
      });
      setAnimal(response.animalById);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalId]);

  const onAdopt =  () => {
    window.open(`/animals/${animalId}/adopt`, '_self');
  };

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="mx-12 my-8 p-4 border shadow-lg rounded-lg grid grid-flow-row">
        <h1 className="text-2xl font-semibold justify-self-center">
          {animal?.animal_name}
        </h1>
        <div className="grid grid-cols-3">
          <div className="pt-4">
            <img src={animal?.image} alt={animal?.animal_name} />
            <p>{animal?.category.category_name}</p>
          </div>
          <div className="grid place-items-center col-start-3">
            <button
              className="relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              onClick={onAdopt}
            >
              <span className="relative text-white font-bold px-8 py-8">
                {' '}
                Adopt Me{' '}
              </span>
            </button>
          </div>
        </div>

        <p>{animal?.description}</p>
        <p>
          Currently at: {animal?.owner.user_name}, {animal?.owner.streetAddress}
        </p>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
