import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { filterMyList, shareListMenuAction } from "../store/user/slice";
import { selectActiveFilter } from "../store/user/selectors";
import { RiUserSharedLine } from "react-icons/ri";

export const WatchListFilters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(selectActiveFilter);

  const filterList = (filter) => {
    dispatch(filterMyList(filter));
  };
  const shareList = () => {
    dispatch(shareListMenuAction());
  };
  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item
        action
        onClick={() => filterList("all")}
        active={activeFilter === "all"}
      >
        All
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => filterList("watching")}
        active={activeFilter === "watching"}
      >
        Watching
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => filterList("completed")}
        active={activeFilter === "completed"}
      >
        Completed
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => filterList("plan to watch")}
        active={activeFilter === "plan to watch"}
      >
        Plan to watch
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={shareList}
        active={activeFilter === "share"}
      >
        Share <RiUserSharedLine />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default WatchListFilters;
