import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { IoIosLogOut } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

import { UserContext } from "../context/userContext";
import { ReviewerContext } from "../context/reviewerContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const reviewerContext = useContext(ReviewerContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    userContext.setUser(null);
    reviewerContext.setReviewer(null);
    navigate("/");
  };

  return (
    <Navbar color="success" light expand="md" className="container-fluid">
      <NavbarBrand>
        <Link to="/" className="text-white">
          Brewery Review App
        </Link>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {userContext.user ? (
            <>
              <NavbarText className="text-white">
                <VscAccount size={30} />{" "}
                {userContext.user?.email ? userContext.user.email : ""}
              </NavbarText>
              <NavItem className="float-end navbar-end">
                <NavLink
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Sign Out"
                  onClick={handleSignOut}
                  className="text-white"
                >
                  Sign Out <IoIosLogOut size={30} />
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/signup"
                  className="text-white"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Sign Up"
                >
                  Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/signin"
                  className="text-white"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Sign In"
                >
                  Sign In
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
