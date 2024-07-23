import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/ApiRequests";
import { useSearchParams } from "react-router-dom";

export const useGetMails = () => {
  const { type = "inbox" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const s = searchParams.get("s") || "";
  const [mails, setMails] = useState([]);
  useEffect(() => {
    const getMails = async () => {
      const { data } = await Api.get(`/email/${type}?s=${s}`);
      setMails(data);
    };
    getMails();
  }, [type,s]);

  return { mails };
};
