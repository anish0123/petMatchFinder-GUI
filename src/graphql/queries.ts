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

export {login, registerUser, checkToken, getAllAnimals, getAnimalById, addAdoptionApplication};
