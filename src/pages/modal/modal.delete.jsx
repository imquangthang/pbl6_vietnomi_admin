import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

export function ModalDelete({ title, id, onHide, deleteItem }) {
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
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900 dark:text-white"
                    >
                      Delete {title}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this {title} with ID =
                        {" " + id}?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 dark:bg-gray-700/25 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={deleteItem}
                  className="shadow-xs inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400 sm:ml-3 sm:w-auto"
                >
                  Delete
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
