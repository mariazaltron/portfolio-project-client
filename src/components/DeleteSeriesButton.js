import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteSerieFromWatchlist } from "../store/watchList/thunks";

export const DeleteSeriesButton = () => {
    const dispatch = useDispatch();

    const deleteSerie = (id) => {
      dispatch(deleteSerieFromWatchlist(id));
    };


  return (
    <div>
      <Button variant="danger" onClick={() => deleteSerie()}>Delete</Button>
    </div>
  );
};

export default DeleteSeriesButton;
