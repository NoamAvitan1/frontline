import React, { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import Api from "../services/ApiRequests";
import { AiOutlineEnter } from "react-icons/ai";

export default function Modal({ isOpen, onClose }) {
  const [recipients, setRecipients] = useState([]);
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(e.target.value)) {
        alert("Please enter a valid email address");
        return;
      }
      const value = e.target.value;
      setRecipients((prev) => [...prev, value]);
      e.target.value = "";
    }
  };
  const handleDelete = (index) => {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (route) => {
    if (recipients.length === 0 && route !== "draft") {
      alert("Please enter at least one recipient");
      return;
    }
    if (route === "draft" && !confirm("Save to draft?")) {
      onClose();
      return;
    }
    const payload = {
      ...getValues(),
      recipients,
    };
    Api.post(`/email/${route}`, payload);
    onClose();
    alert(route === "send" ? "Email sent" : "Draft saved");
    window.location.reload();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <article className="max-w-[550px] container bg-white rounded-xl p-4">
          <header className="space-y-2">
            <section className="flex items-center border-b border-b-slate-400 pb-2 ">
              <div className="flex items-center justify-between grow">
                <button
                  onClick={() => handleSubmit("send")}
                  className="flex items-center gap-2 p-2 px-3 bg-blue-500 rounded-full text-white"
                >
                  <IoMdSend className="text-xl" />{" "}
                  <span className="font-bold">Send</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 p-2 px-3 bg-red-600 rounded-full text-white"
                >
                  <MdDelete className="text-xl" />{" "}
                  <span className="font-bold">Cancel</span>
                </button>
              </div>
              <button
                onClick={() => handleSubmit("draft")}
                className="ml-3 text-xl text-slate-800"
              >
                <IoMdClose />
              </button>
            </section>
            <section className="space-y-2">
              <div className="flex items-center gap-2 border-b border-b-slate-400 pb-2 w-full overflow-x-auto">
                <span className="size-10 min-w-10 rounded-xl border border-slate-400 flex items-center justify-center">
                  To:
                </span>
                {recipients.map((recipient, index) => (
                  <span
                    key={index}
                    className="rounded-xl p-1 bg-slate-200 gap-1 flex items-center justify-center"
                  >
                    {recipient}
                    <IoMdClose
                      className="cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </span>
                ))}
                <input
                  onKeyDown={handleKeyDown}
                  className="grow py-1 focus:outline-none"
                  autoFocus
                  type="text"
                />
                <AiOutlineEnter />
              </div>
              <div className="flex items-center gap-2 border-b border-b-slate-400 pb-2">
                <span className="size-10 rounded-xl border border-slate-400 flex items-center justify-center">
                  Cc:
                </span>
              </div>
            </section>
          </header>
          <section className="space-y-2 py-1 flex flex-col">
            <input
              {...register("subject", { required: true })}
              className="p-2 focus:outline-none border-b border-b-slate-600"
              type="text"
              placeholder="subject"
            />
            <textarea
              {...register("body", { required: true })}
              className="!h-[300px] border border-slate-400 outline-none p-2"
            ></textarea>
          </section>
        </article>
      </div>
    )
  );
}
