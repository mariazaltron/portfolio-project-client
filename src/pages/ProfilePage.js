
import { useEffect } from "react";
import { selectUsers } from "../store/profile/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../store/profile/thunks";
import ListGroup from "react-bootstrap/ListGroup";


export const ProfilePage = () => {

  const dispatch = useDispatch();
  const allProfiles = useSelector(selectUsers)
 
  
   useEffect(() => {
     dispatch(fetchProfiles());
   }, [dispatch]);

  return (
    <div>
      <ListGroup>
        {allProfiles.map((user) => (
        <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>
       ))}
       </ListGroup>
    </div>
  );
};
