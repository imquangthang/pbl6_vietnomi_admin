import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createPortal } from "react-dom";

export function ModalUpdate({ title, item, onHide, updateItem }) {
  const [formData, setFormData] = useState(item || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateAccountLayout = () => {
    return (
      <>
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter first name"
            value={formData?.first_name || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter last name"
            value={formData?.last_name || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="avatar_url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Avatar
          </label>
          <input
            type="text"
            id="avatar_url"
            name="avatar_url"
            placeholder="Enter avatar"
            value={
              formData?.avatar_url !== "string" ? formData?.avatar_url : ""
            }
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData?.role || "USER"}
            onChange={(e) => handleChange(e)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter first name"
            value={formData?.password || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </>
    );
  };

  const updateTagLayout = () => {
    return (
      <>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData?.name}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            placeholder="Enter image"
            value={formData?.image_url}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </>
    );
  };

  const updateFoodLayout = () => {
    return (
      <>
        <div>
          <label
            htmlFor="dish_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dish Name
          </label>
          <input
            type="text"
            id="dish_name"
            name="dish_name"
            placeholder="Enter dish name"
            value={formData?.dish_name || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData?.description || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="dish_type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dish Type
          </label>
          <input
            type="text"
            id="dish_type"
            name="dish_type"
            placeholder="Enter dish type"
            value={formData?.dish_type || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="serving_size"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Serving Size
          </label>
          <input
            type="text"
            id="serving_size"
            name="serving_size"
            placeholder="Enter serving size"
            value={formData?.serving_size || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="cooking_time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Cooking Time
          </label>
          <input
            type="text"
            id="cooking_time"
            name="cooking_time"
            placeholder="Enter cooking time"
            value={formData?.cooking_time + " mins" || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            placeholder="Enter ingredients"
            value={formData?.ingredients || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="cooking_method"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Cooking Method
          </label>
          <textarea
            id="cooking_method"
            name="cooking_method"
            placeholder="Enter cooking method"
            value={formData?.cooking_method || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="calories"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Calories
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            placeholder="Enter calories"
            value={formData?.calories || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="fat"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Fat
          </label>
          <input
            type="number"
            id="fat"
            name="fat"
            placeholder="Enter fat"
            value={formData?.fat || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="fiber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Fiber
          </label>
          <input
            type="number"
            id="fiber"
            name="fiber"
            placeholder="Enter fiber"
            value={formData?.fiber || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="sugar"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sugar
          </label>
          <input
            type="number"
            id="sugar"
            name="sugar"
            placeholder="Enter sugar"
            value={formData?.sugar || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="protein"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Protein
          </label>
          <input
            type="number"
            id="protein"
            name="protein"
            placeholder="Enter protein"
            value={formData?.protein || ""}
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="image_link"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image
          </label>
          <input
            type="text"
            id="image_link"
            name="image_link"
            placeholder="Enter image"
            value={
              formData?.image_link !== "string" ? formData?.image_link : ""
            }
            onChange={(e) => handleChange(e)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
          <img
            src={formData?.image_link}
            alt={`Ảnh xem trước của ${formData?.dish_name}`} // Giả sử `formData` có thuộc tính `name`
            className="h-50 w-50 mt-2 object-cover"
          />{" "}
        </div>
      </>
    );
  };

  const layouts = {
    Account: updateAccountLayout(),
    Tag: updateTagLayout(),
    Food: updateFoodLayout(),
  };

  return (
    <div>
      <Dialog open={true} onClose={onHide} className="relative z-10">
        <DialogBackdrop
          transition
          className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/50"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pb-4 pt-5 dark:bg-gray-800 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="size-12 sm:size-10 mx-auto flex shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10 sm:mx-0">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600 dark:text-red-400"
                    />
                  </div>

                  <form className="mt-3 w-full space-y-4">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900 dark:text-white"
                    >
                      Update {title}
                    </DialogTitle>
                    {layouts[title] || null}
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 dark:bg-gray-700/25 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => updateItem(formData)}
                  className="shadow-xs inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 dark:bg-blue-500 dark:shadow-none dark:hover:bg-blue-400 sm:ml-3 sm:w-auto"
                >
                  Update
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={onHide}
                  className="shadow-xs inset-ring inset-ring-gray-300 dark:inset-ring-white/5 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:hover:bg-white/20 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
