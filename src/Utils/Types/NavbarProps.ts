import { Dispatch, SetStateAction } from 'react';

export default interface NavbarProps {
  toggle?: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
}
