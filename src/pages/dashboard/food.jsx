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
import {
  deleteFoodById,
  fetchAllFoods,
  updateFoodById,
} from "@/services/food.service";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import { Skeleton } from "@mui/material";
import { ModalDelete } from "../modal/modal.delete";
import { toast } from "react-toastify";
import { ModalUpdate } from "../modal/modal.update";
import { useLoading } from "@/widgets/layout/loading-context/LoadingContext";

export function Foods() {
  const { showLoading, hideLoading } = useLoading();
  const [listFoods, setListFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, _setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const getAllFoods = async () => {
    try {
      setLoading(true);
      const response = await fetchAllFoods("", currentPage, currentLimit);
      setListFoods(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, [currentPage, currentLimit]);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };

  const handleDeleteFood = async (id) => {
    try {
      showLoading();
      let response = await deleteFoodById(id);
      if (response) {
        toast.success(`Deleted item with ID: ${id}`);
        await getAllFoods();
        setOpenModalDelete(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error(`Error deleting item with ID: ${id}`);
    } finally {
      hideLoading();
    }
  };

  const handleOpenModalUpdate = (food) => {
    setSelectedFood(food);
    setOpenModalUpdate(true);
  };

  const handleUpdateFood = async (data) => {
    try {
      showLoading();
      let response = await updateFoodById(selectedFood.id, data);
      if (response) {
        toast.success(`Updated item with ID: ${selectedFood.id}`);
        await getAllFoods();
        setOpenModalUpdate(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error(`Error deleting item with ID: ${id}`);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div className="mb-8 mt-12 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Foods Management
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <div>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "ID",
                      "Dish Name",
                      "Dish Type",
                      "Serving Size",
                      "Cooking Time",
                      "Calories",
                      "Image",
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
                    Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index}>
                        {[
                          { variant: "text", width: 30 },
                          { variant: "text", width: 70 },
                          { variant: "text", width: 70 },
                          { variant: "text", width: 70 },
                          { variant: "text", width: 90 },
                          { variant: "text", width: 50 },
                          { variant: "circular", width: 40, height: 40 },
                          { variant: "rectangular", width: 50, height: 20 },
                        ].map((props, i) => (
                          <td className="px-5 py-3" key={i}>
                            <Skeleton {...props} />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : listFoods.length > 0 ? (
                    listFoods.map(
                      (
                        {
                          id,
                          dish_name,
                          dish_type,
                          serving_size,
                          cooking_time,
                          calories,
                          image_link,
                        },
                        key,
                      ) => {
                        const className = `py-3 px-5 ${
                          key === listFoods.length - 1
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
                                {dish_name}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {dish_type}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {serving_size}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {cooking_time} mins
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {calories}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Avatar
                                src={image_link}
                                alt="avatar"
                                size="sm"
                                variant="rounded"
                              />
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <PencilIcon
                                  className="h-4 w-4 cursor-pointer text-yellow-700"
                                  onClick={() =>
                                    handleOpenModalUpdate(listFoods[key])
                                  }
                                />
                                <TrashIcon
                                  className="h-4 w-4 cursor-pointer text-red-500"
                                  onClick={() => handleOpenModalDelete(id)}
                                />
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
                        No foods found
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
        {openModalDelete && (
          <ModalDelete
            title="Food"
            id={selectedId}
            onHide={() => setOpenModalDelete(false)}
            deleteItem={() => {
              handleDeleteFood(selectedId);
            }}
          />
        )}

        {openModalUpdate && (
          <ModalUpdate
            title="Food"
            item={selectedFood}
            onHide={() => setOpenModalUpdate(false)}
            updateItem={(data) => {
              handleUpdateFood(data);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Foods;
