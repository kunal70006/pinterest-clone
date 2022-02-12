import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import SearchProps from 'src/Utils/Types/SearchProps';
import { userStateProps } from 'src/Utils/Types/User';
import CreatePin from '@components/CreatePin/CreatePin';

const Search: NextPage<SearchProps> = ({ setSearchTerm, setToggle }) => {
  const [user, setUser] = useState<userStateProps>({
    name: '',
    email: '',
    iconURL: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const tempUser = JSON.parse(localStorage.getItem('user'));
    if (tempUser !== null) {
      setUser(tempUser);
    }
    return () =>
      setUser({
        name: null,
        email: null,
        iconURL: null,
      });
  }, []);

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <CreatePin isModalOpen={isModalOpen} handleClose={handleClose} />
      <div className="flex items-center mt-4 lg:text-xl sm:text-sm text-slate-800 justify-center">
        <div
          className="lg:hidden sm:flex flex-col mr-6 ml-2 cursor-pointer"
          onClick={() => setToggle(true)}
        >
          <div className="bg-slate-800 w-8 h-1 mb-1 rounded-2xl"></div>
          <div className="bg-slate-800 w-8 h-1 mb-1 rounded-2xl"></div>
          <div className="bg-slate-800 w-8 h-1 mb-1 rounded-2xl"></div>
        </div>
        <input
          type="text"
          className="w-2/3 pl-4 py-2 rounded-2xl outline-none bg-slate-100"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for pins by title..."
        />
        {user.iconURL !== '' ? (
          <div className="ml-4">
            <Image
              src={user.iconURL}
              height={48}
              width={48}
              alt="profile icon"
              className=" rounded-full"
            />
          </div>
        ) : null}
        <div
          onClick={() => setIsModalOpen(true)}
          className="lg:ml-8 sm:ml-4 bg-slate-400 flex items-center lg:text-4xl sm:text-2xl rounded-full pb-2 px-4 cursor-pointer sm:-mt-1"
        >
          &#43;
        </div>
      </div>
    </>
  );
};

export default Search;
