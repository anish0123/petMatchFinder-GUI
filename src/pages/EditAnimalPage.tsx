import {useEffect, useState} from 'react';
import AnimalForm from '../components/AnimalForm';
import NavBar from '../components/NavBar';
import {Category} from '../types/Category';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {modifyAnimal, getAllCategories, getAnimalById} from '../graphql/queries';
import {Animal} from '../types/Animal';
import {useParams} from 'react-router-dom';

const EditAnimalPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [animal, setAnimal] = useState<Animal>();
  const token = localStorage.getItem('token');
  const animalId = useParams().animalId;

  useEffect(() => {
    (async () => {
      const categories = await doGraphQLFetch(APIUrl, getAllCategories, {});
      if (categories.categories) {
        setCategories(categories.categories);
      }
      const animalResponse = await doGraphQLFetch(APIUrl, getAnimalById, {
        animalByIdId: animalId,
      });
      if (animalResponse?.animalById) {
        setAnimal(animalResponse.animalById);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSubmit = async (data: Animal) => {
    try {
      if (!data.weight && animal?.weight) {
        data.weight = animal?.weight;
      }
      if (!data.price && animal?.price) {
        data.price = animal?.price;
      }
      if (data.image === '' && animal?.image) {
        data.image = animal?.image;
      }
      const response = await doGraphQLFetch(
        APIUrl,
        modifyAnimal,
        {
          modifyAnimalId: animalId,
          animal: data,
        },
        token!,
      );
      if (response.modifyAnimal) {
        alert('Animal edited successfully!');
        window.open(`/animals/${response.modifyAnimal.animal.id}`, '_self');
      } else {
        alert('Failed to edit animal');
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="px-10 py-16 grid">
        <h1 className="justify-self-center text-2xl font-semibold text-gray-800 pb-4">
          Edit {animal?.animal_name}
        </h1>
        <AnimalForm onSubmit={onSubmit} categories={categories} editForm animal={animal} />
      </div>
    </div>
  );
};

export default EditAnimalPage;
