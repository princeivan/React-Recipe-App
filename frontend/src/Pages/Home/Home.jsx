import React, { useContext } from "react";
import { GlobalContext } from "../../Context/Context";
import RecipeItem from "../../Components/Recipe-Item/RecipeItem";
import PacmanLoader from "react-spinners/PacmanLoader";
const Home = () => {
  const { loading, recipeList } = useContext(GlobalContext);
  // if (loading) {
  //   return <PacmanLoader color="#36d7b7" />;
  // }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {loading && <PacmanLoader color="#36d7b7" />}
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Recipe Not Found
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
