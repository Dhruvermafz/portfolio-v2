import React from "react";
import { Card, Input, Button, Form, Checkbox, message } from "antd";
import { PlusOutlined, DragOutlined } from "@ant-design/icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useReorderTodosMutation,
} from "../../api/todoApi";
import "./todo.css";

const DraggableCard = ({
  index,
  todo,
  moveCard,
  handleToggleComplete,
  handleDelete,
}) => {
  const ref = React.useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`todo-card-container ${
        isOver ? (index > 0 ? "drop-over-above" : "drop-over-below") : ""
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Card
        className="todo-card"
        hoverable
        actions={[
          <Checkbox
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo)}
          >
            {todo.completed ? "Completed" : "Mark Complete"}
          </Checkbox>,
          <Button type="link" danger onClick={() => handleDelete(todo._id)}>
            Delete
          </Button>,
        ]}
      >
        <div className="todo-card-content">
          <DragOutlined className="drag-handle" />
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.content}
          </span>
        </div>
      </Card>
    </div>
  );
};

const TodoList = () => {
  const { data: todos = [], isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [reorderTodos] = useReorderTodosMutation();
  const [form] = Form.useForm();

  const handleAddTodo = async (values) => {
    try {
      await addTodo({ content: values.content }).unwrap();
      form.resetFields();
      message.success("Todo added successfully");
    } catch (err) {
      message.error("Failed to add todo");
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await updateTodo({ _id: todo._id, completed: !todo.completed }).unwrap();
      message.success("Todo updated successfully");
    } catch (err) {
      message.error("Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap();
      message.success("Todo deleted successfully");
    } catch (err) {
      message.error("Failed to delete todo");
    }
  };

  const moveCard = async (dragIndex, hoverIndex) => {
    const dragCard = todos[dragIndex];
    const updatedTodos = update(todos, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });

    const reorderedTodos = updatedTodos.map((todo, index) => ({
      ...todo,
      order: index,
    }));

    try {
      await reorderTodos(reorderedTodos).unwrap();
      message.success("Todos reordered successfully");
    } catch (err) {
      message.error("Failed to reorder todos");
    }
  };

  return (
    <section className="todo-section py-5">
      <DndProvider backend={HTML5Backend}>
        <div className="todo-list-container">
          <Form form={form} onFinish={handleAddTodo} className="todo-form">
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Please enter a task" }]}
            >
              <Input placeholder="Add a new task" size="large" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              size="large"
            >
              Add Task
            </Button>
          </Form>
          <div className="todo-list">
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : todos.length === 0 ? (
              <div className="empty">No tasks yet. Add one above!</div>
            ) : (
              todos.map((todo, index) => (
                <DraggableCard
                  key={todo._id}
                  index={index}
                  todo={todo}
                  moveCard={moveCard}
                  handleToggleComplete={handleToggleComplete}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </DndProvider>
    </section>
  );
};

export default TodoList;
