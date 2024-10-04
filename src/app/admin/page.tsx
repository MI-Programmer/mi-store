import { redirect } from "next/navigation";

const Admin = () => {
  return redirect("/admin/user-orders");
};

export default Admin;
