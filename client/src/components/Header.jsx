import React from 'react'
import { Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import { Link, useLocation} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <Navbar className="border border-b-2 dark:bg-[#0c12243f]">
        <Button className="w-12 h10 lg:hidden" pill>
          <AiOutlineSearch/>
        </Button>
      <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" >Home</Link>

          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>

          </Navbar.Link>
          <Navbar.Link active={path === "/search"} as={"div"}>
          <Link to="/search">All Posts</Link>
          </Navbar.Link>
          </Navbar.Collapse>

          
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Search..."
            className="hidden lg:inline bg-white dark:bg-black rounded-full text-left"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
  </Navbar>
  )
}
