import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Eazy Rooms
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          {user != null ? (
            <div class="collapse navbar-collapse  ml-auto" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/profile"
                  >
                    {user.email}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/logout">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div class="collapse navbar-collapse  ml-auto" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/register"
                  >
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
