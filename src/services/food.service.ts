import instance from "../setup/axios";

const fetchAllFoods = (
  Foodname: string,
  CurrentPage: number,
  PageSize: number,
) => {
  return instance.get("/food", {
    params: {
      keyWord: Foodname,
      page: CurrentPage,
      limit: PageSize,
    },
  });
};

const fetchAllFoodsNoPosted = (
  Foodname: string,
  CurrentPage: number,
  PageSize: number,
) => {
  return instance.get("/food/no-posted", {
    params: {
      keyWord: Foodname,
      page: CurrentPage,
      limit: PageSize,
    },
  });
};

const deleteFoodById = (id: number) => {
  return instance.delete(`/food/${id}`);
};

const handleAcviteFood = (id: number) => {
  return instance.post(`/food/post/${id}`);
};

const updateFoodById = (id: number, data: any) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([u, v]) =>
        u !== "id" &&
        ![
          "createdAt",
          "updatedAt",
          "deletedAt",
          "user_id",
          "posted",
          "delFlag",
        ].includes(u) &&
        v !== null &&
        v !== undefined &&
        v !== "",
    ),
  );

  filteredData["calories"] = Number(filteredData["calories"]);
  filteredData["fat"] = Number(filteredData["fat"]);
  filteredData["fiber"] = Number(filteredData["fiber"]);
  filteredData["sugar"] = Number(filteredData["sugar"]);
  filteredData["protein"] = Number(filteredData["protein"]);
  return instance.patch(`/food/${id}`, filteredData);
};

export {
  fetchAllFoods,
  deleteFoodById,
  updateFoodById,
  fetchAllFoodsNoPosted,
  handleAcviteFood,
};
