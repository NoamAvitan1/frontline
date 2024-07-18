import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Api from "../services/ApiRequests";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const SignUpForm = ({ setAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.repeatPassword) {
        alert("Passwords do not match.");
        return;
      }

      const response = await Api.post("/user/signup", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      });

      setUserData(response.data); 
      navigate("/"); 
    } catch (error) {
      alert("Signup failed due to a conflict");
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="w-[450px] bg-white min-h-[580px] rounded-sm">
      <button onClick={() => setAuth("login")} className="text-2xl">
        <IoIosArrowRoundBack />
      </button>
      <form
        className="text-foreground p-4 flex w-full flex-col justify-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className="flex gap-4">
          <section className="flex flex-col w-1/2">
            <label className="font-bold">First Name</label>
            <input
              type="text"
              {...register("first_name", { required: "First name is required" })}
              placeholder="Noam"
              className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            />
            {errors.first_name && <p>{errors.first_name.message}</p>}
          </section>
          <section className="flex flex-col w-1/2">
            <label className="font-bold">Last Name</label>
            <input
              type="text"
              {...register("last_name", { required: "Last name is required" })}
              placeholder="Avitan"
              className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            />
            {errors.last_name && <p>{errors.last_name.message}</p>}
          </section>
        </article>
        <div className="flex flex-col gap-1">
          <label className="font-bold">Email</label>
          <input
            placeholder="noam@gmail.com"
            className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label className="font-bold">Password</label>
          <input
            placeholder="1234"
            className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label className="font-bold">Repeat Password</label>
          <input
            placeholder="1234"
            className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            type="password"
            {...register("repeatPassword", {
              required: "Repeat Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>
        <div className="flex gap-4 justify-center items-center">
          <button className="bg-blue-500 p-2 rounded-md" type="submit">
            Sign-up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
