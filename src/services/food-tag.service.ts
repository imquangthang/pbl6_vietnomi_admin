import instance from "../setup/axios";

const getTagByFoodId = (id: number) => {
  return instance.get(`/foodTag/food/${id}`);
};

const updateTagByFoodId = (id: number, tagIds: number[]) => {
  return instance.put(`/foodTag/food`, { food_id: id, tag_ids: tagIds });
};

export { getTagByFoodId, updateTagByFoodId };
