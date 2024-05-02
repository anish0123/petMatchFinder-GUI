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
        window.open(`/animals/${response.addAnimal.id}`, '_self');
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="px-10 py-16">
        <AnimalForm onSubmit={onSubmit} categories={categories} />
      </div>
    </div>
  );
};

export default AddAnimalPage;
