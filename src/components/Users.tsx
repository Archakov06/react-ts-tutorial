import React from 'react';
import { AppContext } from '../App';

type Options = {
  limit?: 10;
  removeSettings?: {
    isAdmin: boolean;
  };
};

interface UsersProps {
  onClickButton?: (idx: number) => void;
  options?: Options;
}

export const Users: React.FC<UsersProps> = ({ onClickButton, options }) => {
  const { users, removeUser } = React.useContext(AppContext);

  const handleClickButton = (idx: number) => {
    removeUser(idx);
    onClickButton?.(idx);
  };

  // console.log(options !== null && options !== undefined ? options.removeSettings : 'Нет опций');
  // console.log(options ? ... : 'Нет опций');

  return (
    <div>
      <ul>
        {users.map((obj, i) => (
          <li>
            {obj.company.name}
            <button onClick={() => handleClickButton(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
