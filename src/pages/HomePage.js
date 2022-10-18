import { PopularSeries } from "../components/PopularSeries/PopularSeries";
import { TrendingSeries } from "../components/TrendingSeries/TrendingSeries";
import "./index.css";
import { Container } from "react-bootstrap";

export const HomePage = () => {
  return (
    <Container fluid className="homepage-components">
      <PopularSeries />
      <TrendingSeries />
    </Container>
  );
};
