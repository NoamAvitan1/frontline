import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MailHeader from "./MailHeader";

export default function Mail({ mails }) {
  const [selectedMail, setSelectedMail] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const mailId = searchParams.get("mail");
  useEffect(() => {
    setSelectedMail(mails.find((mail) => mail._id === mailId));
  }, [mailId,mails]);
  return (
    <article className="w-full overflow-y-auto h-[calc(100dvh-100px)] bg-slate-200">
      <MailHeader mail={selectedMail} />
    </article>
  );
}
