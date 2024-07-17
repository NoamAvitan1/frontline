import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import MailList from "../components/MailList";
import { useGetMails } from "../hooks/useGetMails.jsx";
import Mail from "../components/Mail.jsx";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext.jsx";
import Api from "../services/ApiRequests.jsx";

export default function Home() {
  const { mails } = useGetMails();
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await Api.post("/user/staylogin");
        if (Array.isArray(data) && data.length === 0) {
          navigate("/auth");
        } else {
          setUserData(data);
        }
      } catch (error) {
        navigate("/auth");
      }
    };
    if (!userData) {
      getUser();
    }
  }, [userData]);
  return (
    <main>
      <NavBar />
      <div className="flex w-full">
        <MailList mails={mails} />
        <Mail mails={mails} />
      </div>
    </main>
  );
}
