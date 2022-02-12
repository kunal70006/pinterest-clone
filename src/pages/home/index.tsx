import Home from '@components/Home/Home';
import Search from '@components/Search/Search';
import Navbar from '@components/Navbar/Navbar';
import { useState } from 'react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="flex flex-col lg:ml-60 sm:ml-0 w-full">
        <Search setSearchTerm={setSearchTerm} setToggle={setToggle} />
        <Home searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Index;
