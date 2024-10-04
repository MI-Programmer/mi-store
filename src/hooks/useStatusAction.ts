import { useTransition } from "react";
import toast from "react-hot-toast";

type ActionFn = (data: any) => Promise<any>;

const useStatusAction = <T>(
  action: ActionFn,
  success: string,
  pending: string,
) => {
  const [isPending, startTransition] = useTransition();

  const handleAction = (data: T) => {
    const serverAction = action(data);
    const actionPromise = new Promise((resolve, reject) =>
      serverAction
        .then((data) => {
          if (data.status === "error") reject(data.message);

          resolve("");
        })
        .catch(({ message }: any) => reject(message)),
    );
    startTransition(() => serverAction.catch(() => console.log("Error")));

    toast.promise(actionPromise, {
      loading: pending,
      success: success,
      error: (error: any) => error,
    });
  };

  return { isPending, handleAction };
};

export default useStatusAction;
