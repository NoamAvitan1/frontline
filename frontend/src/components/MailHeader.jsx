import React from "react";
import { getUserTag } from "../utils/getUserTag";
import dayjs from "dayjs";

export default function MailHeader({ mail }) {
  return (
    mail?._id && (
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center cursor-pointer border-b  gap-2 p-4">
          <div className="size-10 min-w-10  bg-blue-500 border rounded-full border-slate-700 flex items-center justify-center">
            {getUserTag(mail.sender)}
          </div>
          <div className="flex flex-col w-full">
            <h3 className="font-bold text-blue-600 w-full truncate">
              {mail.sender.first_name + " " + mail.sender.last_name}
            </h3>
            <span>
              To:{" "}
              {mail.recipients
                .map(
                  (recipient) =>
                    `${recipient.first_name} ${recipient.last_name}`
                )
                .join(", ")}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 pt-0 w-full">
          <h3 title={mail.subject} className="font-bold truncate w-2/3">{mail.subject}</h3>
          <span className="text-blue-600 font-bold">{dayjs(mail.created_at).format("ddd M/D/YY h:mm A")}</span>
        </div>
        <div className="h-full p-2 overflow-y-auto">
          <p className="p-4 pt-10 border border-slate-500 bg-white rounded-xl max-h-full ">{mail.body}</p>
        </div>
      </div>
    )
  );
}
