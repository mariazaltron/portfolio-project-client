import { useParams } from "react-router-dom";
import { SeriesDetails } from "../components/SeriesDetails";

export const SeriesDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <div>
        <SeriesDetails serieId={id} />
      </div>
    </div>
  );
};
