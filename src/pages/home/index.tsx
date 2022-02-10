import Home from '@components/Home/Home';
import Search from '@components/Search/Search';
import Navbar from '@components/Navbar/Navbar';

const Index = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-60 w-full">
        <Search />
        <Home />
      </div>
    </div>
  );
};

export default Index;
