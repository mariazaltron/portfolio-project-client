import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { updateSerieStatus } from "../store/watchList/thunks";

export const UpdateStatusButton = ({ serie }) => {
  const dispatch = useDispatch();
  const showIfNotInStatus = (current, status) => current !== status;

  const updateStatus = (sharedWatchListSeries, status) => {
    dispatch(
      updateSerieStatus(
        sharedWatchListSeries.sharedWatchListId,
        sharedWatchListSeries.serieId,
        status
      )
    );
  };
  return (
    <div>
      {serie && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {serie.sharedWatchListSeries.status}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {showIfNotInStatus(
              serie.sharedWatchListSeries.status,
              "watching"
            ) && (
              <Dropdown.Item
                onClick={() =>
                  updateStatus(serie.sharedWatchListSeries, "watching")
                }
              >
                watching
              </Dropdown.Item>
            )}
            {showIfNotInStatus(
              serie.sharedWatchListSeries.status,
              "plan to watch"
            ) && (
              <Dropdown.Item
                onClick={() =>
                  updateStatus(serie.sharedWatchListSeries, "plan to watch")
                }
              >
                plan to watch
              </Dropdown.Item>
            )}
            {showIfNotInStatus(
              serie.sharedWatchListSeries.status,
              "completed"
            ) && (
              <Dropdown.Item
                onClick={() =>
                  updateStatus(serie.sharedWatchListSeries, "completed")
                }
              >
                completed
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default UpdateStatusButton;
