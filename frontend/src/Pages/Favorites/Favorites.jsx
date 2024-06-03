import React, { useContext } from "react";
import { GlobalContext } from "../../Context/Context";
import RecipeItem from "../../Components/Recipe-Item/RecipeItem";

const Favorites = () => {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            No Favorite found
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
