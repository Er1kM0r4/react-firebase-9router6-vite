import { Outlet, useParams } from "react-router-dom";
import { useFirestoreUrls } from "../../hooks/useFirestoreUrls";
import { useEffect, useState } from "react";
import { Title } from "../Title";

export const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const { searchData } = useFirestoreUrls();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchData(nanoid).then((docSnap) => {
      console.log(docSnap);
      if (docSnap.exists()) {
        window.location.href = docSnap.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title title="Cargando redireccionamiento" />;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};
