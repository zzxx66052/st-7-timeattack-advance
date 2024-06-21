import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../api/todos";

export default function TodoList({ todos, fetchData, setData }) {
  const navigate = useNavigate();
  const handleLike = async ({ id, currentLiked }) => {
    const previousTodos = [...todos];
    try {
      setData((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, liked: !todo.liked } : todo,
        ),
      );
      await todoApi.patch(`/todos/${id}`, {
        liked: !currentLiked,
      });
    } catch (err) {
      console.error(err);
      setData(previousTodos);
    } finally {
      await fetchData();
    }
  };
  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => navigate(`/detail/${todo.id}`)}>
              내용보기
            </button>
            {todo.liked ? (
              <FaHeart
                onClick={() =>
                  handleLike({ id: todo.id, currentLiked: todo.liked })
                }
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                onClick={() =>
                  handleLike({ id: todo.id, currentLiked: todo.liked })
                }
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
