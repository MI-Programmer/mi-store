"use client";

import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";

import defaultUserImg from "@/public/default-user.jpg";
import { User } from "@/app/admin/users/page";
import FormRow from "@/components/ui/FormRow";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import useStatusAction from "@/hooks/useStatusAction";
import { updateUserRole } from "@/actions/user";

const UpdateRoleForm = ({ user }: { user: User }) => {
  const { id, name, email, image, role } = user;
  const { isPending, handleAction } = useStatusAction(
    updateUserRole,
    "Successfully updated user role",
    "Updating...",
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await handleAction(formData);
  };

  return (
    <Modal>
      <Modal.Open opens="roleForm">
        <Button>
          Edit
          <PencilIcon className="h-5 w-5" />
        </Button>
      </Modal.Open>

      <Modal.Window name="roleForm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 sm:flex-row sm:items-start"
        >
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-50">
            <Image
              src={image ?? defaultUserImg}
              fill
              alt="User image"
              className="object-cover"
            />
          </div>

          <div className="grow space-y-4">
            <FormRow label="Name :">
              <input
                type="text"
                value={name ?? "No name"}
                className="input"
                disabled
              />
            </FormRow>

            <FormRow label="Email :">
              <input type="text" value={email} className="input" disabled />
            </FormRow>

            <FormRow label="Role :">
              <select
                name="role"
                defaultValue={role}
                className="inputSelect"
                disabled={isPending}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </FormRow>

            <input type="hidden" name="id" value={id} />

            <div className="flex justify-end">
              <Button disabled={isPending}>Update</Button>
            </div>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default UpdateRoleForm;
