import Home from '@components/Home/Home';
import Search from '@components/Search/Search';
import Navbar from '@components/Navbar/Navbar';
import { useState } from 'react';
import Head from 'next/head';

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
          <Home searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};

export default Index;
