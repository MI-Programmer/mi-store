import { ReactNode } from "react";

import Button from "@/components/ui/Button";

interface ConfirmDeleteProps {
  children?: string | ReactNode;
  title?: string;
  confirmLabel: string;
  disabledLabel: string;
  onConfirm: any;
  onCloseModal?: any;
  disabled: boolean;
}

const ConfirmDelete = ({
  children,
  title,
  confirmLabel,
  disabledLabel,
  onConfirm,
  onCloseModal,
  disabled,
}: ConfirmDeleteProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-3xl font-medium">{title}</h3>
      <p className="mb-5 text-gray-500">{children}</p>

      <div className="flex justify-end gap-5">
        <Button type="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>

        <Button
          type="danger"
          disabled={disabled}
          onClick={async () => {
            await onConfirm();
            onCloseModal();
          }}
        >
          {disabled ? disabledLabel : confirmLabel}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
