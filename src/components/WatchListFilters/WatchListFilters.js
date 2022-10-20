import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { filterMyList } from "../../store/user/slice";
import { selectActiveFilter } from "../../store/user/selectors";
import "./index.css";

export const WatchListFilters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);

  const filterList = (filter) => {
    dispatch(filterMyList(filter));
  };

  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item
        action
        onClick={() => filterList("all")}
        active={activeFilter === "all"}
        variant="light"
      >
        All
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => filterList("watching")}
        active={activeFilter === "watching"}
        variant="light"
      >
        Watching
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => filterList("completed")}
        active={activeFilter === "completed"}
        variant="light"
      >
        Completed
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => filterList("plan to watch")}
        active={activeFilter === "plan to watch"}
        variant="light"
      >
        Plan to watch
      </ListGroup.Item>
    </ListGroup>
  );
};

export default WatchListFilters;
