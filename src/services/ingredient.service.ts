import instance from "../setup/axios";

const fetchAllIngrediens = (
  Name: string,
  CurrentPage: number,
  PageSize: number
) => {
  return instance.get("/ingredient", {
    params: {
      keyWord: Name,
      page: CurrentPage,
      limit: PageSize,
    },
  });
};

const addNewIngredien = (data: { name: string; image_url: string }
) => {
  return instance.post("/ingredient", data);
};


export {fetchAllIngrediens, addNewIngredien}
