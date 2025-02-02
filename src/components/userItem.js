import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

import classes from "./userItem.module.css";

function userItem({ user }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.user}>
      <img src={user.image} alt={user.title} />
      <h1>{user.title}</h1>
      <time>{user.date}</time>
      <p>{user.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default userItem;
