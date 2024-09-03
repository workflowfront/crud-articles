import "./App.css";
import ArticleContainer from "./components/articleContainer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/actionCreatorsUsers";
import { fetchOldUsers } from "./store/reducers/actionCreatorsOldUsers";

function App() {
  const dispatch = useAppDispatch();
  const { users, oldUsers, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOldUsers());
  }, []);

  return (
    <div className="App">
      {isLoading && <h2>Загрузка ...</h2>}
      {error && <h2>{error}</h2>}
      <h2>Новые участники</h2>
      {JSON.stringify(users, null, 2)}
      <h2>Старые участники</h2>
      {JSON.stringify(oldUsers, null, 2)}
      <div style={{ display: "flex" }}>
        <ArticleContainer />
      </div>
    </div>
  );
}

export default App;
