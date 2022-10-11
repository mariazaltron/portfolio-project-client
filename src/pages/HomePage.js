
import { PopularSeries } from "../components/PopularSeries/PopularSeries";
import { TrendingSeries } from "../components/TrendingSeries/TrendingSeries";
import { NavBar } from "../components/NavBar";

export const HomePage = () => {
  return (
    <div>
    <NavBar/>
      <PopularSeries/>
      <TrendingSeries/>
    </div>
  );
}

