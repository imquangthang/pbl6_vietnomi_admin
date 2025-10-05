import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { fetchAllFoods } from "@/services/food.service";
import { useEffect, useState } from "react";
import { TagIcon } from "@heroicons/react/24/solid"; // Icon mới
import ReactPaginate from "react-paginate";
import { Skeleton } from "@mui/material";

import { toast } from "react-toastify";
import { useLoading } from "@/widgets/layout/loading-context/LoadingContext";

import { ModalManageTags } from "../modal/modal.manage.tags";
import { fetchAllTags } from "@/services/tag.service";

export function FoodTag() {
  const { showLoading, hideLoading } = useLoading();
  const [listFoods, setListFoods] = useState([]);
  const [listTags, setListTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, _setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // *CHỈ GIỮ LẠI STATE CHO MODAL GÁN TAG*
  const [openModalTags, setOpenModalTags] = useState(false);
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

  const getAllTags = async (search, page, limit) => {
    try {
      setLoading(true);
      const response = await fetchAllTags("", currentPage, 1000);
      setListTags(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllFoods();
    getAllTags();
  }, [currentPage, currentLimit]);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleOpenModalTags = (food) => {
    setSelectedFood(food);
    setOpenModalTags(true);
  };

  const handleManageTags = async (tagsArray) => {
    if (!selectedFood) return;

    try {
      showLoading();
      const response = await updateFoodTags(selectedFood.id, tagsArray);

      if (response && response.success) {
        toast.success(`Tags updated for: ${selectedFood.dish_name}`);
        // Cập nhật lại danh sách để thấy thay đổi
        await getAllFoods();
        setOpenModalTags(false);
      } else {
        toast.error(response.message || "Failed to update tags.");
      }
    } catch (error) {
      console.error("Error managing tags:", error);
      toast.error(`Error managing tags for food: ${selectedFood.id}`);
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
              Food Tagging Management
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
                      "Calories",
                      "Image",
                      "Manage Tags", // <--- Cột hành động
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
                    // Cập nhật số lượng cột trong Skeleton
                    Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index}>
                        {[
                          { variant: "text", width: 30 },
                          { variant: "text", width: 70 },
                          { variant: "text", width: 70 },
                          { variant: "text", width: 50 },
                          { variant: "circular", width: 40, height: 40 },
                          { variant: "text", width: 150 },
                          { variant: "rectangular", width: 50, height: 20 },
                        ].map((props, i) => (
                          <td className="px-5 py-3" key={i}>
                            <Skeleton {...props} />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : listFoods.length > 0 ? (
                    listFoods.map((food, key) => {
                      const { id, dish_name, dish_type, calories, image_link } =
                        food;

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

                          {/* CỘT HÀNH ĐỘNG GÁN TAG */}
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <TagIcon
                                className="h-5 w-5 cursor-pointer text-blue-500 transition-colors hover:text-blue-700"
                                title="Manage Tags"
                                onClick={() => handleOpenModalTags(food)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-6 text-center text-sm text-blue-gray-500"
                      >
                        No foods found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Giữ nguyên logic phân trang */}
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

        {openModalTags && selectedFood && (
          <ModalManageTags
            title="Manage Food Tags"
            listtags={listTags}
            item={selectedFood}
            onHide={() => setOpenModalTags(false)}
          />
        )}
      </div>
    </>
  );
}

export default FoodTag;
