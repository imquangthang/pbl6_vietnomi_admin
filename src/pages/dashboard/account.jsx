import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { fetchAllUsers } from "@/services/user.service";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import { Skeleton } from "@mui/material";

export function Accounts() {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, _setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchAllUsers("", currentPage, currentLimit);
      setListUsers(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [currentPage, currentLimit]);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Authors Management
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <div>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "ID",
                    "First Name",
                    "Last Name",
                    "Username",
                    "Email",
                    "Role",
                    "Avatar",
                    "Action",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 px-5 py-3 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      {[
                        { variant: "text", width: 40 },
                        { variant: "text", width: 80 },
                        { variant: "text", width: 80 },
                        { variant: "text", width: 80 },
                        { variant: "text", width: 120 },
                        { variant: "text", width: 60 },
                        { variant: "circular", width: 40, height: 40 },
                        { variant: "rectangular", width: 50, height: 20 },
                      ].map((props, i) => (
                        <td className="px-5 py-3" key={i}>
                          <Skeleton {...props} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : listUsers.length > 0 ? (
                  listUsers.map(
                    (
                      {
                        id,
                        first_name,
                        last_name,
                        username,
                        email,
                        role,
                        avatar_url,
                      },
                      key,
                    ) => {
                      const className = `py-3 px-5 ${
                        key === listUsers.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={id}>
                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {id}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {first_name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {last_name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {username}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {role}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Avatar
                              src={avatar_url}
                              alt="avatar"
                              size="sm"
                              variant="rounded"
                            />
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <PencilIcon className="h-4 w-4 cursor-pointer text-yellow-700" />
                              <TrashIcon className="h-4 w-4 cursor-pointer text-red-500" />
                            </div>
                          </td>
                        </tr>
                      );
                    },
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-6 text-center text-sm text-blue-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-1">
            {totalPages > 0 && (
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="<"
                previousLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                nextLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                breakLabel="..."
                breakClassName="flex items-center justify-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                breakLinkClassName="text-gray-700 dark:text-gray-300"
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center gap-2 my-6"
                pageClassName="flex items-center justify-center"
                pageLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                activeClassName="bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                previousClassName="flex items-center justify-center"
                nextClassName="flex items-center justify-center"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Accounts;
