// import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";

import classes from "./UsersList.module.css";

function UsersList({ users }) {
  // const users = useLoaderData();

  return (
    <div className={classes.users}>
      <h1>All users</h1>
      <ul className={classes.list}>
        {users.map((user) => (
          <li key={user.id} className={classes.item}>
            <Link to={`/users/${user.id}`}>
              <img src={user.image} alt={user.title} />
              <div className={classes.content}>
                <h2>{user.title}</h2>
                <time>{user.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
