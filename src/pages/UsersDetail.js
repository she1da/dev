import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

// import userItem from "../components/userItem";
import UsersList from "../components/UsersList";
import { getAuthToken } from "../util/auth";

function UsersDetailPage() {
  const { user, users } = useRouteLoaderData("user-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={user}>
          {(loadeduser) => <userItem user={loadeduser} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={users}>
          {(loadedusers) => <UsersList users={loadedusers} />}
        </Await>
      </Suspense>
    </>
  );
}

export default UsersDetailPage;

async function loaduser(id) {
  const response = await fetch("http://localhost:8080/users/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected user." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.user;
  }
}

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

export async function loader({ request, params }) {
  const id = params.userId;

  return defer({
    user: await loaduser(id),
    users: loadusers(),
  });
}

export async function action({ params, request }) {
  const userId = params.userId;

  const token = getAuthToken();
  const response = await fetch("https://reqres.in/api/users" + userId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete user." },
      {
        status: 500,
      }
    );
  }
  return redirect("/users");
}
