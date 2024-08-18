"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ConfirmDelete from "@/components/ui/ConfirmMessage";
import { deleteProduct } from "@/actions/products";
import useStatusAction from "@/hooks/useStatusAction";

const DeleteProduct = ({ id, name }: { id: string; name: string }) => {
  const { isPending, handleAction } = useStatusAction(
    deleteProduct,
    `Sucessfully delete product "${name}"`,
    "Deleting",
  );

  return (
    <Modal>
      <Modal.Open opens="confirmDelete">
        <Button type="danger" size="small">
          Delete <TrashIcon className="h-4 w-4" />
        </Button>
      </Modal.Open>

      <Modal.Window name="confirmDelete">
        <ConfirmDelete
          title={`Delete product "${name}"`}
          confirmLabel="Delete"
          disabledLabel="Deleting..."
          onConfirm={() => handleAction(id)}
          disabled={isPending}
        >
          Are you sure you want to delete this {name} permanently? This action
          cannot be undone.
        </ConfirmDelete>
      </Modal.Window>
    </Modal>
  );
};

export default DeleteProduct;
