import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {addAdoptionApplication, getAnimalById} from '../graphql/queries';
import {Animal} from '../types/Animal';
import NavBar from '../components/NavBar';
import AdoptionForm, {AdoptionFormInput} from '../components/AdoptionForm';

const AnimalAdoptionPage = () => {
  const [animal, setAnimal] = useState<Animal>();
  const {animalId} = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, getAnimalById, {
        animalByIdId: animalId,
      });
      if (response?.animalById) {
        setAnimal(response.animalById);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalId]);

  const onSubmit = async (data: AdoptionFormInput) => {
    const response = await doGraphQLFetch(
      APIUrl,
      addAdoptionApplication,
      {
        input: {
          description: data.description,
          animal: animalId,
          appliedDate: new Date(),
        },
      },
      token!,
    );
    if (response.addAdoptionApplication) {
      alert('Adoption application submitted successfully!');
      window.open(
        `/animal-adoption/${response.addAdoptionApplication.adoptionApplication.id}`,
        '_self',
      );
    } else {
      alert('Failed to submit adoption application');
    }
  };
  
  const onClickBack = () => {
    window.open(`/animals/${animalId}`, '_self');
  }

  return (
    <div>
      <NavBar backFuntion={onClickBack} />
      <div className="grid w-screen h-screen justify-items-center grid-rows-12">
        <h1 className="row-start-2 text-2xl font-semibold">
          Adoption form for {animal?.animal_name}
        </h1>
        <div className="w-1/2 h-1/2 bg-green-500 border shadow-lg rounded-lg row-start-3 row-span-10  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <AdoptionForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AnimalAdoptionPage;
