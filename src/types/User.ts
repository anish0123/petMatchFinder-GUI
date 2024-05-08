type User =  {
  id: string;
    user_name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  };

  export type { User };