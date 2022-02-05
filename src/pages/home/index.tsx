import Home from '@components/Home/Home';
import Search from '@components/Search/Search';

const Index = () => {
  return (
    <div className="flex flex-col w-screen">
      <Search />
      <Home />
    </div>
  );
};

export default Index;
