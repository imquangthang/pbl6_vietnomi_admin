import instance from "../setup/axios";

const fetchAllTags = (Name: string, CurrentPage: number, PageSize: number) => {
  return instance.get("/tag", {
    params: {
      keyWord: Name,
      page: CurrentPage,
      limit: PageSize,
    },
  });
};

const addNewTag = (data: { name: string; image_url: string }) => {
  return instance.post("/tag", data);
};

const deleteTagById = (id: number) => {
  return instance.delete(`/tag/${id}`);
};

const updateTagById = (id: number, data: any) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([u, v]) =>
        u !== "id" &&
        ["name", "image_url"].includes(u) &&
        v !== null &&
        v !== undefined &&
        v !== "",
    ),
  );
  console.log(filteredData);

  return instance.patch(`/tag/${id}`, filteredData);
};

export { fetchAllTags, addNewTag, deleteTagById, updateTagById };
