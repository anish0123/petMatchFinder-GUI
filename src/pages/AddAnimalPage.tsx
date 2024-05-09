import {useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {addAnimal, getAllCategories} from '../graphql/queries';
import NavBar from '../components/NavBar';
import {Animal} from '../types/Animal';
import {Category} from '../types/Category';
import AnimalForm from '../components/AnimalForm';

const AddAnimalPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      const categories = await doGraphQLFetch(APIUrl, getAllCategories, {});
      if (categories.categories) {
        setCategories(categories.categories);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSubmit = async (data: Animal) => {
    try {
      data.listedDate = new Date();
      const response = await doGraphQLFetch(
        APIUrl,
        addAnimal,
        {
          animal: data,
        },
        token!,
      );
      if (response.addAnimal) {
        alert('Animal added successfully!');
        window.open(`/petMatchFinder-GUI/animals/${response.addAnimal.animal.id}`, '_self');
      } else {
        alert('Failed to add animal');
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };
  const onClickBack = () => {
    window.open('/petMatchFinder-GUI/', '_self');
  }

  return (
    <div className="w-screen h-screen">
      <NavBar backFuntion={onClickBack} />
      <div className="px-10 py-16 grid">
        <h1 className="justify-self-center text-2xl font-semibold text-gray-800 pb-4">
          Add Animal
        </h1>
        <AnimalForm
          onSubmit={onSubmit}
          categories={categories}
          editForm={false}
        />
      </div>
    </div>
  );
};

export default AddAnimalPage;
