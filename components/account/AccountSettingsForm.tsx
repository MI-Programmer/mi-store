"use client";

import useStatusAction from "@/hooks/useStatusAction";
import { useForm } from "react-hook-form";

import FormRow from "@/components/ui/FormRow";
import Button from "@/components/ui/Button";
import { updateUserData } from "@/actions/user";
import { UserData } from "@/app/account/settings/page";

const AccountSettingsForm = ({ userData }: { userData: UserData }) => {
  const defaultValues = userData;
  delete defaultValues.image;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: userData });
  const { isPending, handleAction } = useStatusAction(
    updateUserData,
    "Account changes saved successfully",
    "Saving...",
  );

  const onSubmit = async (data: object) => await handleAction(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md grow space-y-4">
      <FormRow label="Name :" errors={errors?.name?.message as string}>
        <input
          type="text"
          {...register("name", { required: "This field is require" })}
          className="input"
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Email :">
        <input
          type="email"
          defaultValue={userData.email}
          className="input"
          disabled={true}
        />
      </FormRow>

      <FormRow label="Phone number :" errors={errors?.phone?.message as string}>
        <input
          type="number"
          {...register("phone", { required: "This field is require" })}
          className="input"
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Shipping address :"
        errors={errors?.shippingAddress?.message as string}
      >
        <input
          type="text"
          {...register("shippingAddress", {
            required: "This field is require",
          })}
          className="input"
          disabled={isPending}
        />
      </FormRow>

      <div className="flex justify-end">
        <Button disabled={isPending}>Save</Button>
      </div>
    </form>
  );
};

export default AccountSettingsForm;
