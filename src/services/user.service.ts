import instance from "../setup/axios";

const fetchAllUsers = (
  Username: string,
  CurrentPage: number,
  PageSize: number
) => {
  return instance.get("/user", {
    params: {
      keyWord: Username,
      page: CurrentPage,
      limit: PageSize,
    },
  });
};


export {fetchAllUsers}
