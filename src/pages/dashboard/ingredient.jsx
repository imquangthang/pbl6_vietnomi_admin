import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { addNewIngredien, fetchAllIngrediens } from "@/services/ingredient.service";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

export function Ingredients() {
    const [listIngrediens, setListIngrediens] = useState([]);
    const [inputName, setInputName] = useState("");
    const [inputAvatar, setInputAvatar] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, _setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);


    const getAllIngrediens = async () => {
        try {
        const response = await fetchAllIngrediens("", currentPage, currentLimit);
        setListIngrediens(response.data);
        setTotalPages(response.pagination.totalPages);
        } catch (error) {
        console.error("Error fetching users:", error);
        } 
    }

    const handleAddIngredient = async () => {
        let response = await addNewIngredien({
            name: inputName,
            image_url: inputAvatar
        });
        
        if (response) {
            toast.success("Add new ingredient successfully!");
            setInputName("");
            setInputAvatar("");
            getAllIngrediens();
        }
    }

    useEffect(() => {
        getAllIngrediens();
    }, [currentPage, currentLimit]);

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
                Ingredients Management
            </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div>
                <form onSubmit={(e) => {
                e.preventDefault()
                }}>
                <div className="flex flex-col gap-4 m-6 p-6 border border-blue-200 rounded-xl bg-blue-50 text-blue-800 shadow-md w-full max-w-4xl">
                <h2 className="text-lg font-semibold">Add New Ingredient</h2>
                
                <div className="flex flex-wrap items-center gap-4">
                    <input 
                    type="text" 
                    placeholder="Name" 
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    required
                    className="flex-1 min-w-[200px] p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                    type="text" 
                    placeholder="Avatar URL" 
                    value={inputAvatar}
                    onChange={(e) => setInputAvatar(e.target.value)}
                    required
                    className="flex-1 min-w-[200px] p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button 
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition"
                    type="submit"
                    onClick={handleAddIngredient}
                    >
                    Add
                    </button>
                </div>
                </div>
                </form>
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                    <tr>
                        {["ID", "Name", "Image", "Created At", "Action"].map((el) => (
                        <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
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
                    {listIngrediens.map(
                        ({ id, name, image_url, createdAt }, key) => {
                        const className = `py-3 px-5 ${
                            key === listIngrediens.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                            <tr key={id}>
                            <td className={className}>
                                <div className="flex items-center gap-4">
                                <div>
                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                    {id}
                                    </Typography>
                                </div>
                                </div>
                            </td>
                            <td className={className}>
                                <div className="flex items-center gap-4">
                                <div>
                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                    {name}
                                    </Typography>
                                </div>
                                </div>
                            </td>
                            <td className={className}>
                                <div className="flex items-center gap-4">                            
                                <Avatar src={image_url} alt={"image"} size="sm" variant="rounded" />
                                </div>
                            </td>  
                            <td className={className}>
                                <div className="flex items-center gap-4">
                                <div>
                                    <Typography className="text-xs font-normal text-blue-gray-500">
                                    {new Date(createdAt).toLocaleString()}
                                    </Typography>
                                </div>
                                </div>
                            </td>
                            <td className={className}>
                                <div className="flex items-center gap-4">                            
                                <PencilIcon className="h-4 w-4 cursor-pointer text-yellow-700" />
                                <TrashIcon className="h-4 w-4 cursor-pointer text-red-500" />
                                </div>
                            </td>                        
                            </tr>
                        );
                        }
                    )}
                    </tbody>
                </table>
            </div>
            <div className="py-1 px-4">
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

export default Ingredients;