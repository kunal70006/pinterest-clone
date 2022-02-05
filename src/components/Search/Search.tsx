import { useState, useEffect } from 'react';
import Image from 'next/image';
import { userStateProps } from 'src/Utils/Types/User';
import CreatePin from '@components/CreatePin/CreatePin';

const Search = () => {
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
      <div className="flex items-center mt-4 text-xl text-slate-800 justify-center">
        <input
          type="text"
          className="w-2/3 pl-4 py-2 rounded-2xl outline-none bg-slate-100"
          placeholder="Search"
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
          className="ml-8 bg-slate-400 flex items-center text-4xl rounded-full pb-2 px-4 cursor-pointer"
        >
          &#43;
        </div>
      </div>
    </>
  );
};

export default Search;
