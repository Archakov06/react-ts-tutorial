import React from 'react';
import axios, { AxiosError } from 'axios';

import { Users } from './components/Users';
import { User } from './types';
import { Input } from './components/Input';

type AppContextProps = {
  users: User[];
  removeUser: (idx: number) => void;
};

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

function App() {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(data);
      } catch (error) {
        const respError = error as Error | AxiosError;

        if (axios.isAxiosError(respError)) {
          console.warn('Произошла серверная ошибка!', respError.code);
        } else {
          console.warn('Произошла ошибка в коде!', respError.message);
        }
      }
    }

    fetchUsers();
  }, []);

  const removeUser = (idx: number) => {
    if (window.confirm('Удалить пользователя?')) {
      setUsers(users.filter((_, i) => idx !== i));
    }
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          users,
          removeUser,
        }}>
        <Users />
      </AppContext.Provider>
      <Input label="Почта" autoFocus />
    </div>
  );
}

export default App;
