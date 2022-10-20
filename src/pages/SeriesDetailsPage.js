import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAppLoading } from "../store/appState/selectors";
import { SeriesDetails } from "../components/SeriesDetails/SeriesDetails";

export const SeriesDetailsPage = () => {
  const loading = useSelector(selectAppLoading);

  return (
    <div>
      <div>
        <SeriesDetails />
      </div>
    </div>
  );
};
