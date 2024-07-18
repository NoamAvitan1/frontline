import React from "react";
import { getUserTag } from "../utils/getUserTag";
import { MdMarkEmailUnread } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export default function MailList({ mails }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (id) => {
    searchParams.set("mail", id);
    setSearchParams(searchParams);
  };
  return (
    <ul
      className="min-w-[300px] pt-px  max-w-[400px] overflow-y-auto  h-[calc(100dvh-100px)]
     border-r border-slate-700 "
    >
      {mails.map((mail) => (
        <li
          onClick={() => handleClick(mail._id)}
          key={mail._id}
          className="flex items-center cursor-pointer border-b border-slate-400 hover:bg-slate-300 duration-150 px-2"
        >
          <div className="size-10 min-w-10  bg-blue-500 border rounded-full border-slate-700 flex items-center justify-center">
            {getUserTag(mail.sender)}
          </div>
          <div className="grow w-px px-2 py-1">
            <h3 className="flex justify-between">
              <span className="font-bold">
                {mail.sender.first_name + " " + mail.sender.last_name}
              </span>
              {/* <MdMarkEmailUnread/> */}
            </h3>
            <div className="flex justify-between items-center truncate w-full gap-2">
              <span className="font-bold text-sky-500 truncate">
                {mail.subject}
              </span>
              <span className="text-slate-500">
                {dayjs(mail.created_at).format("HH:mm A")}
              </span>
            </div>
            <footer className="truncate text-slate-500">{mail.body}</footer>
          </div>
        </li>
      ))}
    </ul>
  );
}
