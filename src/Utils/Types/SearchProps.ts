import { Dispatch, SetStateAction } from 'react';

export default interface SearchProps {
  setSearchTerm?: Dispatch<SetStateAction<string>>;
  setToggle?: Dispatch<SetStateAction<boolean>>;
}
