import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./UsersNavigation.module.css";

function UsersNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All users
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/users/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New user
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default UsersNavigation;
