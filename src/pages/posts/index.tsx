import Posts from '@components/Posts/Posts';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import Head from 'next/head';
import { useState } from 'react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Head>
        <title>Share Me</title>
      </Head>
      <div className="flex">
        <Navbar toggle={toggle} setToggle={setToggle} />
        <div className="flex flex-col lg:ml-60 sm:ml-0 w-full">
          <Search setSearchTerm={setSearchTerm} setToggle={setToggle} />
          <Posts searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};

export default Index;
