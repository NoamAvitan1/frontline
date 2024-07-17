import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/ApiRequests";

export const useGetMails = () => {
  const { type = "inbox" } = useParams();
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const getMails = async () => {
      const { data } = await Api.get(`/email/${type}`);
      setMails(data);
    };
    getMails();
  }, [type]);

  return { mails };
};
