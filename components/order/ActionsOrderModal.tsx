"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmMessage from "@/components/ui/ConfirmMessage";
import ButtonAction from "@/components/ui/ButtonAction";
import useStatusAction from "@/hooks/useStatusAction";
import { updateOrderStatus } from "@/actions/order";

interface ActionsOrderModalProps {
  id: string;
  status: string;
  isAdmin?: boolean;
}

const ActionsOrderModal = ({ id, status, isAdmin }: ActionsOrderModalProps) => {
  const { isPending, handleAction } = useStatusAction(
    updateOrderStatus,
    "Order has been successfully canceled.",
    "Canceling...",
  );

  const onCancelOrder = async () =>
    await handleAction({ id, status: "CANCELED" });

  const onShipOrder = async () =>
    await updateOrderStatus({ id, status: "SHIPPED" });

  const onDeliverOrder = async () =>
    await updateOrderStatus({ id, status: "DELIVERED" });

  return (
    <div className="flex justify-end gap-4">
      {isAdmin && (
        <ButtonAction
          action={status === "PROCESSING" ? onShipOrder : onDeliverOrder}
          size="large"
          pending="Loading..."
          success={
            status === "PROCESSING"
              ? "Order has been successfully shipped."
              : "Order has been successfully delivered."
          }
        >
          {status === "PROCESSING" ? "Ship order" : "Deliver order"}
        </ButtonAction>
      )}

      <Modal>
        <Modal.Open opens="cancel">
          <Button type="danger" disabled={isPending} size="large">
            Cancel order
          </Button>
        </Modal.Open>

        <Modal.Window name="cancel">
          <ConfirmMessage
            title="Cancel order"
            confirmLabel="Confirm cancel order"
            disabledLabel="Canceling..."
            onConfirm={onCancelOrder}
            disabled={isPending}
          >
            Are you certain you want to proceed with canceling this order? This
            action cannot be undone.
          </ConfirmMessage>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default ActionsOrderModal;
