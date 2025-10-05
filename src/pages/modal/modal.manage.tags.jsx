import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { getTagByFoodId, updateTagByFoodId } from "@/services/food-tag.service";
import { useLoading } from "@/widgets/layout/loading-context/LoadingContext";
import { Skeleton } from "@mui/material";

export function ModalManageTags({ listtags, title, item, onHide }) {
  const { showLoading, hideLoading } = useLoading();
  const [selectedTags, setSelectedTags] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleCheckboxChange = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // Bỏ chọn tag
        return prevTags.filter((t) => t !== tag);
      } else {
        // Thêm tag
        return [...prevTags, tag];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      showLoading();
      let response = await updateTagByFoodId(item.id, selectedTags);
      if (response.code === 200) {
        toast.success("Tags updated successfully");
        onHide();
      } else {
        toast.error("Failed to update tags");
      }
    } catch (error) {
      toast.error("An error occurred while updating tags");
    } finally {
      hideLoading();
    }
  };

  const getFoodTags = async () => {
    try {
      setIsLoading(true);
      let response = await getTagByFoodId(item.id);
      if (response.code === 200) {
        const tagIds = response.data.map((item) => item.tag.id);
        setSelectedTags(tagIds);
      } else {
        toast.error("Failed to fetch food tags");
      }
    } catch (error) {
      toast.error("An error occurred while fetching food tags");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (item && item.id) {
      getFoodTags();
    }
  }, [item]);

  useEffect(() => {
    console.log("Selected Tags:", selectedTags);
    console.log("List Tags:", listtags);
  }, [selectedTags]);

  return (
    <Dialog open={true} handler={onHide} size="sm" className="z-40">
      <DialogHeader className="border-b border-gray-200">{title}</DialogHeader>
      <DialogBody divider>
        <Typography variant="h6" className="mb-4">
          Food: {item.dish_name} (ID: {item.id})
        </Typography>

        <div className="max-h-80 overflow-y-auto">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-semibold"
          >
            Select Tags:
          </Typography>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {isLoading
              ? [...Array(10)].map((_, index) => (
                  <div key={index} className="flex items-center p-1">
                    <Skeleton
                      variant="rectangular"
                      width={16}
                      height={16}
                      className="mr-2 rounded"
                    />
                    <Skeleton
                      variant="text"
                      width={Math.random() * (120 - 60) + 60}
                      height={20}
                    />
                  </div>
                ))
              : listtags.map((tag, key) => (
                  <div key={tag.id} className="flex items-center">
                    <Checkbox
                      id={key}
                      label={tag.name}
                      checked={selectedTags?.some(
                        (selectedTag) => selectedTag === tag.id,
                      )}
                      onChange={() => handleCheckboxChange(tag.id)}
                      ripple={false}
                      className="p-0 transition-all duration-150 hover:before:opacity-0"
                      containerProps={{ className: "p-1" }}
                    />
                  </div>
                ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onHide} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="blue" onClick={handleSubmit}>
          <span>Save Tags</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ModalManageTags;
