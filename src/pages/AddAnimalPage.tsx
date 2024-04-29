import {useEffect, useState} from 'react';
import {User} from '../types/User';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {addAnimal, checkToken, getAllCategories} from '../graphql/queries';
import NavBar from '../components/NavBar';
import {Animal} from '../types/Animal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Category} from '../types/Category';
import {Point} from 'geojson';

const AddAnimalPage = () => {
  const [user, setUser] = useState<User>();
  const [categories, setCategories] = useState<Category[]>([]);
  const token = localStorage.getItem('token');

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Animal>();

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (response.checkToken) {
        setUser(response.checkToken.user);
        console.log('user: ', user);
      }
      const categories = await doGraphQLFetch(APIUrl, getAllCategories, {});
      if (categories.categories) {
        console.log('categories: ', categories.categories);
        setCategories(categories.categories);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onSubmit: SubmitHandler<Animal> = async (data) => {
    try {
      const location: Point = {type: 'Point', coordinates: [10, 10]};
      data.location = location;
      data.listedDate = new Date();
      data.weight = Number(data.weight);
      data.adoptionStatus = 'available';
      if (data.category === '') {
        data.category = categories[0].id;
      }
        const response = await doGraphQLFetch(
          APIUrl,
          addAnimal,
          {
            animal: data,
          },
          token!,
        );

      console.log(data);
        console.log('response: ', response);
    } catch (error) {
      console.error('error: ', error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="px-10 py-16">
        <form
          className="grid grid-flow-row mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="justify-self-center text-2xl font-semibold text-gray-800">
            Register
          </h1>
          <input
            type="text"
            {...register('animal_name', {required: true})}
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
            placeholder="Name"
          />
          {errors.animal_name && <span>Name is required</span>}
          <input
            type="date"
            {...register('birthdate', {required: true})}
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
          />
          {errors.birthdate && <span>Birthdate is required</span>}

          <div className="grid grid-flow-col">
            <select
              className="mx-8 my-2 px-4 h-10 border rounded-lg"
              {...register('gender')}
            >
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </select>
            {errors.category && (
              <span className="mx-8 text-red-500">Gender is required</span>
            )}
            <select
              className="mx-8 my-2 px-4 h-10 border rounded-lg"
              {...register('category')}
            >
              {categories.length > 0 &&
                categories.map((category, i) => {
                  return (
                    <option value={category.id} key={i}>
                      {category.category_name}
                    </option>
                  );
                })}
            </select>
            {errors.category && <span>Category is required</span>}
          </div>
          <input
            {...register('image', {required: true})}
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
            type="text"
          />
          {errors.image && <span>Image is required</span>}

          <input
            {...register('weight', {required: true, min: 0})}
            type="number"
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
          />
          {errors.weight && (
            <span>Weight is required & should be greater than 0</span>
          )}
          <textarea
            {...register('description', {required: true})}
            placeholder="description"
          />

          <div className="grid place-items-center">
            <button
              className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnimalPage;
