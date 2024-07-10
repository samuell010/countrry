import Login from "../routes/Login";
const Home = () => {
  const {VITE_FIREBASE_API} = import.meta.env;
  console.log(VITE_FIREBASE_API);
  return (
    <div>
      <h1>Home</h1>
      

    </div>
  );
};

export default Home;
