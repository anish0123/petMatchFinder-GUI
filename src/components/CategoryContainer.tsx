import {useState} from 'react';
import {Category} from '../types/Category';

type CategoryContainerProps = {
  category: Category;
  onDeleteCategory: (category: Category) => void;
  onEditCategory: (categoryId: string, category: Omit<Category, "id">) => void;
};

const CategoryContainer = ({
  category,
  onDeleteCategory,
  onEditCategory
}: CategoryContainerProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(category.category_name);

  const onModifyCategory = () => {
    setEditMode(false);
    onEditCategory(category.id,  {category_name: categoryName});
  }
  return (
    <div className="grid grid-cols-8 border-b capitalize">
      {editMode ? (
        <>
          <input
            type="text"
            className="col-span-3 px-2 py-1 border rounded mr-4"
            defaultValue={category.category_name}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            className="mr-4 content-center mt-2 h-3/5 inline-flex items-center px-2 bg-gray-600 transition ease-in-out delay-75 hover:bg-gray-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
            onClick={onModifyCategory}
          >
            Edit Category
          </button>
          <button
            className="content-center mt-2 py-2 h-3/5 inline-flex items-center pl-6 bg-gray-600 transition ease-in-out delay-75 hover:bg-gray-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="font-semibold py-2">{category.category_name}</h2>
          <div>
            <button
              className="content-center mt-2 h-3/5 inline-flex items-center px-2 bg-gray-600 transition ease-in-out delay-75 hover:bg-gray-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              onClick={() => setEditMode(true)}
            >
              Edit Category
            </button>
          </div>
          <div>
            <button
              className="content-center mt-2 h-3/5 inline-flex items-center px-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              onClick={() => onDeleteCategory(category)}
            >
              Delete Category
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryContainer;
