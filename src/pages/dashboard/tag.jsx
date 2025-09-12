import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  addNewTag,
  deleteTagById,
  fetchAllTags,
  updateTagById,
} from "@/services/tag.service";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Skeleton } from "@mui/material";
import { ModalUpdate } from "../modal/modal.update";
import { ModalDelete } from "../modal/modal.delete";

export function Tags() {
  const [listTags, setListTags] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputAvatar, setInputAvatar] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, _setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const getAllTags = async () => {
    try {
      setLoading(true);
      const response = await fetchAllTags("", currentPage, currentLimit);
      setListTags(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddTag = async () => {
    let response = await addNewTag({
      name: inputName,
      image_url: inputAvatar,
    });

    if (response) {
      toast.success("Add new tag successfully!");
      setInputName("");
      setInputAvatar("");
      getAllTags();
    }
  };

  useEffect(() => {
    getAllTags();
  }, [currentPage, currentLimit]);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleOpenModalDelete = (id) => {
    setSelectedId(id);
    setOpenModalDelete(true);
  };

  const handleDeleteTag = async (id) => {
    try {
      let response = await deleteTagById(id);
      if (response.code === 200) {
        toast.success(`Deleted item with ID: ${id}`);
        await getAllTags();
        setOpenModalDelete(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`Error deleting item with ID: ${id}`);
    }
  };

  const handleOpenModalUpdate = (tag) => {
    setSelectedTag(tag);
    setOpenModalUpdate(true);
  };

  const handleUpdateTag = async (data) => {
    try {
      let response = await updateTagById(selectedTag.id, data);
      if (response && response.code === 200) {
        toast.success(`Updated item with ID: ${selectedTag.id}`);
        setOpenModalUpdate(false);
        await getAllTags();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`Error deleting item with ID: ${id}`);
    }
  };

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tags Management
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="m-6 flex max-w-4xl flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50 p-6 text-blue-800 shadow-md">
                <h2 className="text-lg font-semibold">Add New Tag</h2>

                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    required
                    className="min-w-[200px] flex-1 rounded-lg border border-blue-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Avatar URL"
                    value={inputAvatar}
                    onChange={(e) => setInputAvatar(e.target.value)}
                    required
                    className="min-w-[200px] flex-1 rounded-lg border border-blue-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600 active:bg-blue-700"
                    type="submit"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Image",
                    "Created At",
                    "Updated At",
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
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        {[
                          { variant: "text", width: 40 },
                          { variant: "text", width: 100 },
                          { variant: "circular", width: 40, height: 40 },
                          { variant: "text", width: 120 },
                          { variant: "text", width: 120 },
                          { variant: "rectangular", width: 50, height: 20 },
                        ].map((props, i) => (
                          <td className="px-5 py-3" key={i}>
                            <Skeleton {...props} />
                          </td>
                        ))}
                      </tr>
                    ))
                  : listTags.map(
                      ({ id, name, image_url, createdAt, updatedAt }, key) => {
                        const className = `py-3 px-5 ${
                          key === listTags.length - 1
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
                                {name}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Avatar
                                src={image_url}
                                alt="image"
                                size="sm"
                                variant="rounded"
                              />
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {new Date(createdAt).toLocaleString()}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {new Date(updatedAt).toLocaleString()}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <PencilIcon
                                  className="h-4 w-4 cursor-pointer text-yellow-700"
                                  onClick={() =>
                                    handleOpenModalUpdate(listTags[key])
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
          title="Tag"
          id={selectedId}
          onHide={() => setOpenModalDelete(false)}
          deleteItem={() => {
            handleDeleteTag(selectedId);
          }}
        />
      )}

      {openModalUpdate && (
        <ModalUpdate
          title="Tag"
          item={selectedTag}
          onHide={() => setOpenModalUpdate(false)}
          updateItem={(data) => {
            handleUpdateTag(data);
          }}
        />
      )}
    </div>
  );
}

export default Tags;
