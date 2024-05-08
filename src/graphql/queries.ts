const login = `
mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      message
      token
      user {
        id
        user_name
        email
      }
    }
  }
`;

const registerUser = `
mutation registerUser($user: UserInput!) {
  register(user: $user) {
    message
    user {
      id
      email
      user_name
    }
  }
}

`;

const checkToken = `
query CheckToken {
  checkToken {
    message
    user {
      email
      id
      user_name
      role
    }
  }
}
`;

const getAllAnimals = `
query Animals {
  animals {
    adoptionStatus
    animal_name
    birthdate
    description
    category {
      category_name
      id
    }
    gender
    id
    image
    listedDate
    location {
      coordinates
      type
    }
    owner {
      email
      id
      user_name
    }
    weight
    price
  }
}`;

const getAnimalById = `
query AnimalById($animalByIdId: ID!) {
  animalById(id: $animalByIdId) {
    adoptionStatus
    animal_name
    birthdate
    category {
      category_name
      id
    }
    description
    gender
    id
    image
    listedDate
    location {
      coordinates
      type
    }
    owner {
      email
      id
      user_name
    }
    weight
    price
  }
}
`;

const addAdoptionApplication = `
mutation addAdoptionApplication($input: AdoptionApplicationInput!) {
  addAdoptionApplication(input: $input) {
    adoptionApplication {
      adopter {
        id
      }
      animal {
        id
      }
      appliedDate
      description
      id
    }
    message
  }
}
`;

const getUserById = `
query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    email
    id
    user_name
  }
}
`;

const getAdoptionApplicationsByUser = `
query Adopter($adopterId: ID!) {
  adoptionApplicationsByAdopter(adopterId: $adopterId) {
    adopter {
      id
    }
    animal {
      animal_name
      id
      image
    }
    description
    appliedDate
    id
    applicationStatus
  }
}
`;

const updateUser = `
mutation UpdateUser($user: UserModify!) {
  updateUser(user: $user) {
    message
    user {
      email
      id
      user_name
    }
    token
  }
}
`;
const getAdoptionApplicationById = `
query AdoptionApplicationById($adoptionApplicationByIdId: ID!) {
  adoptionApplicationById(id: $adoptionApplicationByIdId) {
    adopter {
      id
    }
    animal {
      animal_name
      birthdate
      id
      description
      image
      category {
        category_name
        id
      }
      owner {
        id
        user_name
      }
    }
    applicationStatus
    appliedDate
    description
    id
  }
}
`;

const modifyAdoptionApplication = `
mutation modifyApplication($modifyAdoptionApplicationId: ID!, $input: AdoptionApplicationModify!) {
  modifyAdoptionApplication(id: $modifyAdoptionApplicationId, input: $input) {
    adoptionApplication {
      description
    appliedDate
    applicationStatus
    animal {
      id
    }
    }
    message
  }
}
`;

const deleteAdoptionApplication = `
mutation DeleteAdoptionApplication($deleteAdoptionApplicationId: ID!) {
  deleteAdoptionApplication(id: $deleteAdoptionApplicationId) {
    adoptionApplication {
      applicationStatus
    appliedDate
    description
    id
    animal {
      id
    }
    adopter {
      id
    }
    }
    message
  }
}
`;

const getAnimalsByOwner = `
query getAnimalsByOwner($ownerId: ID!) {
  animalsByOwner(ownerId: $ownerId) {
    adoptionStatus
    animal_name
    birthdate
    category {
      category_name
      id
    }
    description
    gender
    id
    image
    listedDate
    location {
      coordinates
    }
    owner {
      id
      email
      user_name
    }
    weight
    price
  }
}
`;

const getAllCategories = `
query Query {
  categories {
    category_name
    id
  }
}
`;

const addAnimal = `
mutation addAnimal($animal: AnimalInput!) {
  addAnimal(animal: $animal) {
    message
    animal {
      animal_name
      birthdate
      weight
      price
      category {
        category_name
        id
      }
      gender
      image
      id
      listedDate
      location {
        coordinates
        type
      }
      owner {
        id
      }
    }
   
  }
}
`;

const modifyAnimal = `
mutation modifyAnimal($modifyAnimalId: ID!, $animal: AnimalModify!) {
  modifyAnimal(id: $modifyAnimalId, animal: $animal) {
    message
    animal {
      description
    adoptionStatus
    animal_name
    birthdate
    category {
      category_name
      id
    }
    gender
    id
    image
    listedDate
    location {
      coordinates
      type
    }
    owner {
      id
    }
    weight
    price
    }
  }
}
`;

const getAdoptionApplicationByAnimal = `
query Query($animalId: ID!) {
  adoptionApplicationsByAnimal(animalId: $animalId) {
    adopter {
      id
      email
      user_name
    }
    animal {
      id
    }
    applicationStatus
    appliedDate
    description
    id
  }
}`;

const addCategory = `
mutation AddCategory($category: CategoryInput!) {
  addCategory(category: $category) {
    category {
      category_name
      id
    }
    message
  }
}
`;

const deleteCategory = `
mutation DeleteCategory($deleteCategoryId: ID!) {
  deleteCategory(id: $deleteCategoryId) {
    category {
      category_name
      id
    }
    message
  }
}
`;

const modifyCategory = `
mutation ModifyCategory($modifyCategoryId: ID!, $category: CategoryModifyInput!) {
  modifyCategory(id: $modifyCategoryId, category: $category) {
    category {
      category_name
      id
    }
  }
}
`;


const getRatingsByRatedToUser = `
query RatedTo($ratedTo: ID!) {
  ratingByRatedToUser(ratedTo: $ratedTo) {
    id
    description
    ratedBy {
      id
      email
      user_name
    }
    ratedDate
    ratedTo {
      id
      email
      user_name
    }
    rating
  }
}
`;

const addRating = `
mutation addRating($rating: RatingInput!) {
  addRating(rating: $rating) {
    message
    rating {
      description
      id
      ratedBy {
        id
        email
      }
      ratedDate
      ratedTo {
        id
        email
      }
      rating
    }
  }
}
`;

const modifyRating =`
mutation ModifyRating($modifyRatingId: ID!, $rating: RatingModify!) {
  modifyRating(id: $modifyRatingId, rating: $rating) {
    message
    rating {
      description
    }
  }
}
`;

const deleteRating = `
mutation DeleteRating($deleteRatingId: ID!) {
  deleteRating(id: $deleteRatingId) {
    message
    rating {
      id
    }
  }
}
`;

const deleteAnimal = `
mutation DeleteAnimal($deleteAnimalId: ID!) {
  deleteAnimal(id: $deleteAnimalId) {
    animal {
      adoptionStatus
      animal_name
      birthdate
      id
    }
    message
  }
}
`;

export {
  login,
  registerUser,
  checkToken,
  getAllAnimals,
  getAnimalById,
  addAdoptionApplication,
  getUserById,
  getAdoptionApplicationsByUser,
  updateUser,
  getAdoptionApplicationById,
  modifyAdoptionApplication,
  deleteAdoptionApplication,
  getAnimalsByOwner,
  getAllCategories,
  addAnimal,
  modifyAnimal,
  getAdoptionApplicationByAnimal,
  addCategory,
  deleteCategory,
  modifyCategory,
  getRatingsByRatedToUser,
  addRating,
  modifyRating,
  deleteRating,
  deleteAnimal
};
