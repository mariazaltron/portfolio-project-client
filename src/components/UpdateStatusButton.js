import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { updateSerieStatus } from "../store/watchList/thunks";

export const UpdateStatusButton = ({ serie }) => {
  // console.log("serie button", serie);
  const dispatch = useDispatch();

  const updateStatus = (serie, status) => {
    dispatch(updateSerieStatus(serie.serieId, serie.watchListId, status));
  };
  return (
    <div>
      {serie && (
        <Dropdown size="sm">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {serie.status}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => updateStatus(serie, "watching")}>
              watching
            </Dropdown.Item>
            <Dropdown.Item onClick={() => updateStatus(serie, "plan to watch")}>
              plan to watch
            </Dropdown.Item>
            <Dropdown.Item onClick={() => updateStatus(serie, "completed")}>
              completed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default UpdateStatusButton;
