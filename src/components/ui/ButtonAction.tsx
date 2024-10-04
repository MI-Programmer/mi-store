"use client";

import Button from "@/components/ui/Button";
import useStatusAction from "@/hooks/useStatusAction";

type ActionFn = (data: any) => Promise<any>;

interface ButtonActionProps {
  children: any;
  type?: string;
  size?: string;
  action: ActionFn;
  data?: any;
  success: string;
  pending: string;
}

const ButtonAction = ({
  children,
  type,
  size,
  action,
  data,
  success,
  pending,
}: ButtonActionProps) => {
  const { isPending, handleAction } = useStatusAction(action, success, pending);

  const onAction = async () => await handleAction(data);

  return (
    <Button type={type} size={size} onClick={onAction} disabled={isPending}>
      {isPending ? pending : children}
    </Button>
  );
};

export default ButtonAction;
