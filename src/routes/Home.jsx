import { useEffect, useState } from "react";
import { useFirestoreUrls } from "../hooks/useFirestoreUrls";
import { formValidate } from "../utils/formValidate";

import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { useForm } from "react-hook-form";
import { FormError } from "../components/FormError";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState({});
  const { data, error, getUrls, addUrl, deleteUrl, updateUrl } =
    useFirestoreUrls();
  const { required, patternUrl } = formValidate();
  const [url, setUrl] = useState("");
  const [newOriginId, setNewOriginId] = useState("");

  const {
    register,
    resetField,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginId) {
        await updateUrl(newOriginId, url);
      } else {
        await addUrl(url);
      }
      setUrl("");
    } catch (error) {
      console.log(error);
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
    resetField("url");
  };

  useEffect(() => {
    getUrls();
  }, []);

  const handleClickDelete = async (nanoid) => {
    await deleteUrl(nanoid);
  };

  const handleClickEdit = async (item) => {
    //setUrl(item.origin);
    setNewOriginId(item.nanoid);
    setValue("url", item.origin);
  };

  const handleClickCopy = async (item) => {
    setCopy({ [item.nanoid]: true });
    await navigator.clipboard.writeText(`${pathURL}${item.nanoid}`);
  };

  const pathURL = window.location.href;

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="https://example.com"
          {...register("url", {
            required,
            pattern: patternUrl,
          })}
          label="URL:"
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>
        <Button
          type="submit"
          text="Agregar URL"
          color="green"
          loading={loading.addUrl}
        />
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.uid}
          </p>
          <div className="flex space-x-2">
            <Button
              type="button"
              text="Delete"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              type="button"
              text="Edit"
              color="green"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              type="button"
              text={copy[item.nanoid] ? "copied" : "copy"}
              color={copy[item.nanoid] ? "gray" : "blue"}
              onClick={() => handleClickCopy(item)}
            />
          </div>
        </div>
      ))}
    </>
  );
};
