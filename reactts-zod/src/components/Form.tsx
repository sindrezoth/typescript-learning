import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserWithAddress, UserSchemaWithAddress } from "../models/User";

export default function Form() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UserWithAddress>({
    resolver: zodResolver(UserSchemaWithAddress),
  });

  const onSubmit: SubmitHandler<UserWithAddress> = (data) => {
    console.log(data.name);
    console.log(data);
  };

  return (
    <>
      <button onClick={() => trigger()} className="">
        Display Data Requirements
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="your name"
        />
        {errors.name && (
          <p style={{ background: "red" }}>{errors.name?.message}</p>
        )}
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          placeholder="your username"
        />
        {errors.username && (
          <p style={{ background: "red" }}>{errors.username?.message}</p>
        )}
      </form>
    </>
  );
}
