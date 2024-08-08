import React from 'react'

function TodoCard(props) {
  
  const { title, deleteTodo, isCompleted, handleCheckboxChange, editingIndex, editingValue, saveEdit, handleEditChange, startEditing, index} = props
  
  return (
    <li
      style={{ textDecoration: title.isCompleted ? "line-through" : "none" }}
      onDoubleClick={() => {
        startEditing(index, title.text);
      }}
    >

      <input
        type='checkbox'
        checked={isCompleted}
        onChange={() => {
          handleCheckboxChange(index);
        }}
      />

      {editingIndex === index ? (
        <input
          type='text'
          style={{ color: "black", borderColor: "black", width: '50px;'}}
          value={editingValue}
          onChange={handleEditChange}
          onBlur={() => saveEdit(index)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              saveEdit(index);
            }
          }}
        />
      ) : (
        title.text
      )}

      <button
        id='deleteTodo'
        onClick={() => {
          deleteTodo(index);
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoCard