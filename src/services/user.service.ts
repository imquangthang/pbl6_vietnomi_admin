import instance from "../setup/axios";

const fetchAllUsers = (
  Username: string,
  CurrentPage: number,
  PageSize: number,
) => {
  return instance.get("/user", {
    params: {
      keyWord: Username,
      page: CurrentPage,
      limit: PageSize,
    },
  });
};

const deleteUserById = (id: number) => {
  return instance.delete(`/user/${id}`);
};

const updateUserById = (id: number, data: any) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([u, v]) => u !== "id" && v !== null && v !== undefined && v !== "",
    ),
  );
  return instance.patch(`/user/${id}`, filteredData);
};

export { fetchAllUsers, deleteUserById, updateUserById };
