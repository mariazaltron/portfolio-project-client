import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addToWatchList } from "../store/watchList/thunks";

export const AddListButton = ({ sharedWatchListId, serie, text }) => {
  const dispatch = useDispatch();

  const addToList = (status) => {
    dispatch(addToWatchList(sharedWatchListId, serie, status));
  };
  return (
    <div>
      {sharedWatchListId && serie && (
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
