import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import UsersList from "../components/UsersList";

function UsersPage() {
  const { users } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={users}>
        {(loadedUsers) => <UsersList users={loadedUsers} />}
      </Await>
    </Suspense>
  );
}

export default UsersPage;

async function loadusers() {
  const response = await fetch("https://reqres.in/api/users");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch users.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch users.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch users." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.users;
  }
}

export function loader() {
  return defer({
    users: loadusers(),
  });
}
