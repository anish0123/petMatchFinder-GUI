type User =  {
  id: string;
    user_name: string;
    email: string;
    password: string;
    role: 'adopter' | 'lister' | 'admin';
    streetAddress: string;
    postalCode: string;
    city: string;
  };

  export type { User };