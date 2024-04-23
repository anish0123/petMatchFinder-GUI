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

export {login};
