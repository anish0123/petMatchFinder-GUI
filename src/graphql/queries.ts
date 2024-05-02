const login = `
mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      message
      token
      user {
        id
        postalCode
        user_name
        streetAddress
        email
        city
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
      city
      postalCode
      streetAddress
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
      city
      id
      postalCode
      streetAddress
      user_name
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
      city
      email
      id
      postalCode
      streetAddress
      user_name
    }
    weight
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
      city
      email
      id
      postalCode
      streetAddress
      user_name
    }
    weight
  }
}
`;

const addAdoptionApplication = `
mutation addAdoptionApplication($input: AdoptionApplicationInput!) {
  addAdoptionApplication(input: $input) {
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
}
`;

const getUserById = `
query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    city
    email
    id
    postalCode
    streetAddress
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
      city
      postalCode
      streetAddress
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
      category {
        category_name
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
    description
    appliedDate
    applicationStatus
    animal {
      id
    }
  }
}
`;

const deleteAdoptionApplication = `
mutation DeleteAdoptionApplication($deleteAdoptionApplicationId: ID!) {
  deleteAdoptionApplication(id: $deleteAdoptionApplicationId) {
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
      city
      email
      postalCode
      streetAddress
      user_name
    }
    weight
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
    }
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
  modifyAnimal
};
