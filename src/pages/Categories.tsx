import {useEffect, useState} from 'react';
import {Category} from '../types/Category';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  modifyCategory,
} from '../graphql/queries';
import NavBar from '../components/NavBar';
import {useForm} from 'react-hook-form';
import {Socket, io} from 'socket.io-client';
import {ClientToServerEvents, ServerToClientEvents} from '../types/Socket';
import CategoryContainer from '../components/CategoryContainer';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchCategories, setFetchCategories] = useState<boolean>(true);

  // socket.io client
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    import.meta.env.VITE_SOCKET_URL,
  );

  socket.on('addCategory', (message) => {
    console.log('message: ', message);
    setFetchCategories(!fetchCategories);
  });

  socket.on('deleteCategory', (message) => {
    console.log('message: ', message);
    setFetchCategories(!fetchCategories);
  });

  socket.on('modifyCategory', (message) => {
    console.log('message: ', message);
    setFetchCategories(!fetchCategories);
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Category>();
  const token = localStorage.getItem('token');

  const onSubmitForm = async (data: Category) => {
    try {
      console.log('data: ', data);
      const response = await doGraphQLFetch(
        APIUrl,
        addCategory,
        {
          category: data,
        },
        token!,
      );
      if (response.addCategory) {
        reset();
        alert('Category added successfully!');
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCategory = async (category: Category) => {
    try {
      const text = `Are you sure you want to delete cateory: ${category.category_name}?`;
      if (confirm(text)) {
        const response = await doGraphQLFetch(
          APIUrl,
          deleteCategory,
          {
            deleteCategoryId: category.id,
          },
          token!,
        );
        if (response.deleteCategory) {
          alert('Category deleted successfully!');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEditCategory = async (categoryId: string, category: Omit<Category, "id">) => {
    try {
      const response = await doGraphQLFetch(
        APIUrl,
        modifyCategory,
        {
          modifyCategoryId: categoryId,
          category: category,
        },
        token!,
      );
      if(response.modifyCategory) {
        alert('Category modified successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const categories = await doGraphQLFetch(APIUrl, getAllCategories, {});
      if (categories.categories) {
        setCategories(categories.categories);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategories]);

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="mx-12 my-8 p-4 border shadow-lg rounded-lg grid grid-flow-row">
        <h1 className="font-semibold text-2xl justify-self-center">
          Categories
        </h1>
        <div className="pt-4 pl-8">
          {categories.length &&
            categories.map((category, i) => (
              <CategoryContainer
                key={i}
                category={category}
                onDeleteCategory={onDeleteCategory}
                onEditCategory={onEditCategory}
              />
            ))}
        </div>
        <div className="pt-8 pl-8 grid">
          <h1 className="font-semibold text-2xl justify-self-center pb-4">
            Add categories
          </h1>

          <form
            className="grid grid-cols-6 gap-8"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <input
              type="text"
              placeholder="Category Name"
              className="border-2 border-gray-300 rounded-md p-2 grid-start-1 col-span-4"
              {...register('category_name', {
                required: true,
                setValueAs: (value) => value || undefined,
              })}
            />
            {errors.category_name && <span>Name is required</span>}
            <button className="col-span-1 content-center my-2 ml-4 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 pl-2 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
