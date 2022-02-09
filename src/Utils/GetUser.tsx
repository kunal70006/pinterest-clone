const GetUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

export default GetUser;
