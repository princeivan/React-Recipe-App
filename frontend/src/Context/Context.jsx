import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);
  const [removeFavorite, SetRemoveFavorite] = useState(false);

  const Navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setSearchParam("");
    }
    Navigate("/");
  }

  function handleAddToFavorite(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList.splice(index);
    }
    setFavoritesList(cpyFavoritesList);
    SetRemoveFavorite(!removeFavorite);
  }
  console.log(favoritesList, "favoriteList");
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
        removeFavorite,
        SetRemoveFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
