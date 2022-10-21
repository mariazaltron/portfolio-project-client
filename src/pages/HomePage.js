import { PopularSeries } from "../components/PopularSeries/PopularSeries";
import { TrendingSeries } from "../components/TrendingSeries/TrendingSeries";
import "./index.css";

export const HomePage = () => {
  return (
    <div className="homepage-components">
      <PopularSeries />
      <TrendingSeries />
    </div>
  );
};
