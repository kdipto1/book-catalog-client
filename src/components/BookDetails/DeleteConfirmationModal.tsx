/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { useDeleteBookMutation } from "../../redux/features/book/bookApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface DeleteConfirmationModalProps {
  bookId: string;
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ bookId, onDelete, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setIsError(false);
      await deleteBook(bookId).unwrap();
      setIsDeleting(false);
      onDelete();
      navigate("/");
    } catch (error) {
      setIsDeleting(false);
      setIsError(true);
      toast("Delete book error");
    }
  };
  const handleCancel = () => {
    onCancel();
    setIsError(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-base-200 border-2 border-red-400 text-red-400 w-96 rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete this book?</p>
        <div className="flex justify-end">
          <button
            className="btn bg-red-400 text-white hover:text-black mr-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            className="btn bg-green-400 text-white hover:text-black"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        {isError && (
          <div className="text-red-500 mt-4">
            Error occurred while deleting the book.
          </div>
        )}
      </div>
    </div>
  );
};
