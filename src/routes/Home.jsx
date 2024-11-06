import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { useFirestoreUrls } from "../hooks/useFirestoreUrls";
import { Button } from "../components/Button";

export const Home = () => {
  const { data, error, loading, getUrls, addUrl, deleteUrl, updateUrl } =
    useFirestoreUrls();
  const [url, setUrl] = useState("");
  const [newOriginId, setNewOriginId] = useState("");

  useEffect(() => {
    getUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url);

    if (newOriginId) {
      await updateUrl(newOriginId, url);
      setNewOriginId("");
    } else {
      await addUrl(url);
    }
    setUrl("");
  };

  const handleClickDelete = async (nanoid) => {
    await deleteUrl(nanoid);
  };

  const handleClickEdit = async (item) => {
    //await UpdateUrl(nanoid, newUrl);
    setUrl(item.origin);
    setNewOriginId(item.nanoid);
  };

  if (loading.getUrls) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="https://example.com"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {newOriginId ? (
          <Button
            type="submit"
            text="Agregar URL"
            color="green"
            loading={loading.addUrl}
          />
        ) : (
          <Button
            type="submit"
            text="Agregar URL"
            color="green"
            loading={loading.addUrl}
          />
        )}
      </form>

      {data.map((item) => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
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
        </div>
      ))}
    </>
  );
};
