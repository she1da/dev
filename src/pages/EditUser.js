import { useRouteLoaderData } from "react-router-dom";

import CreateUserForm from "../components/CreateUserForm";

function EditUserPage() {
  const data = useRouteLoaderData("user-detail");

  return <CreateUserForm method="patch" user={data.user} />;
}

export default EditUserPage;
