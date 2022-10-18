import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAppLoading } from "../store/appState/selectors";
import { SeriesDetails } from "../components/SeriesDetails";

export const SeriesDetailsPage = () => {
  const loading = useSelector(selectAppLoading);

  const { id } = useParams();
  return loading ? (
    <p> Loading...</p>
  ) : (
    <div>
      <div>
        <SeriesDetails serieId={id} />
      </div>
    </div>
  );
};
