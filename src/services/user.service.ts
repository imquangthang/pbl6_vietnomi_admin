import instance from "../setup/axios";

const fetchAllUsers = (
  Username: string,
  CurrentPage: number,
  PageSize: number
) => {
  return instance.get("/user", {
    params: {
      Username: Username,
      CurrentPage: CurrentPage,
      PageSize: PageSize,
    },
  });
};


export {fetchAllUsers}
