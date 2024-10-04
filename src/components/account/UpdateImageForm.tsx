"use client";

import Image, { StaticImageData } from "next/image";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import FormRow from "@/components/ui/FormRow";
import { updateUserImage } from "@/actions/user";
import useStatusAction from "@/hooks/useStatusAction";

const UpdateImageForm = ({ image }: { image: string | StaticImageData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { isPending, handleAction } = useStatusAction(
    updateUserImage,
    "Successfully updated profile image",
    "Updating...",
  );

  const onSubmit = async (data: object, e: any) => {
    const formData = new FormData(e.target);
    await handleAction(formData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="inline-flex flex-col items-center space-y-4 sm:max-w-sm"
    >
      <div className="relative h-60 w-60 overflow-hidden rounded-full p-1 ring-2 ring-gray-300">
        <Image
          src={image}
          fill
          alt="Profile image"
          className="inline-block object-cover"
        />
      </div>

      <FormRow errors={errors?.image?.message as string}>
        <input
          type="file"
          {...register("image", { required: "This field is required" })}
          className="inputFile"
          accept="image/*"
          disabled={isPending}
        />
      </FormRow>

      <Button type="secondary" disabled={isPending}>
        Update profile
      </Button>
    </form>
  );
};

export default UpdateImageForm;
