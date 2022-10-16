import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addToWatchList } from "../store/watchList/thunks";
import { useNavigate } from "react-router-dom";

export const AddListButton = ({ sharedWatchListId, serieId, text }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToList = (status) => {
    dispatch(addToWatchList(sharedWatchListId, serieId, status));
    navigate("/mylists");
  };
  return (
    <div>
      {sharedWatchListId && serieId && (
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            {text}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => addToList("watching")}>
              {" "}
              watching
            </Dropdown.Item>
            <Dropdown.Item onClick={() => addToList("plan to watch")}>
              plan to watch
            </Dropdown.Item>
            <Dropdown.Item onClick={() => addToList("completed")}>
              completed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default AddListButton;
