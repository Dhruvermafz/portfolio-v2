import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import FeatherIcon from "feather-icons-react"; // Assuming you're using feather-icons-react for icons
import { useGetUsersQuery } from "../api/userApi";
const AllUsers = () => {
  // Fetch users using the useGetUsersQuery hook
  const { data: users, isLoading, error } = useGetUsersQuery();
  console.log(users);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>All Users</h5>
                <form className="d-inline-flex">
                  <Link
                    to="/users/add" // Updated to navigate to /users/add
                    className="align-items-center btn btn-theme d-flex"
                  >
                    <FeatherIcon icon="plus" size="16" /> Add New
                  </Link>
                </form>
              </div>

              <div className="table-responsive table-product">
                <table className="table all-package theme-table" id="table_id">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th> {/* Adjusted to match backend fields */}
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="5">
                          Error: {error.data?.message || "Failed to load users"}
                        </td>
                      </tr>
                    ) : users && users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="table-image">
                              <img
                                src={
                                  user.photo ||
                                  "assets/images/users/default.jpg"
                                } // Fallback image
                                className="img-fluid"
                                alt={user.username}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="user-name">
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <ul>
                              <li>
                                <Link to={`/users/${user.id}`}>
                                  <FeatherIcon icon="eye" size="16" />
                                </Link>
                              </li>
                              AREAS
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
