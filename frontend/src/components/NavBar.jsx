import React, { useContext, useState } from "react";
import Search from "./Search";
import UserContext from "./UserContext";
import { MdEmail } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { RiInbox2Line } from "react-icons/ri";
import { TbLayoutBottombarCollapse } from "react-icons/tb";
import { getUserTag } from "../utils/getUserTag";
import Modal from "./Modal";

export default function NavBar() {
  const { userData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const { type = "inbox" } = useParams();
  return (
    <>
      <header className="h-[100px] bg-slate-300 grid grid-cols-3 items-center p-2">
        <section className="flex items-center gap-2">
          <NavLink
            to={"/mail/inbox"}
            className={`flex items-center p-2 rounded-md gap-2 font-bold duration-300 ${
              type === "inbox" ? "bg-slate-700 text-white" : "bg-slate-400/40"
            }`}
          >
            <RiInbox2Line />
            Inbox
          </NavLink>
          <NavLink
            to={"/mail/outbox"}
            className={`flex items-center p-2 rounded-md gap-2 font-bold duration-300 ${
              type === "outbox" ? "bg-slate-700 text-white" : "bg-slate-400/40"
            }`}
          >
            <MdEmail />
            OutBox
          </NavLink>
          <NavLink
            to={"/mail/draft"}
            className={`flex items-center p-2 rounded-md gap-2 font-bold duration-300 ${
              type === "draft" ? "bg-slate-700 text-white" : "bg-slate-400/40"
            }`}
          >
            <TbLayoutBottombarCollapse />
            Draft
          </NavLink>
        </section>
        <Search />
        <section className="flex items-center space-x-2 ml-auto">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-400 rounded-md text-white p-2"
          >
            <MdEmail />
            New Email
          </button>
          <p className="bg-yellow-600 p-2 rounded-full">
            {getUserTag(userData)}
          </p>
        </section>
      </header>
      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
