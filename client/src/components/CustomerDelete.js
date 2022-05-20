import React from "react";

const CustomerDelete = ({ id, stateRefresh }) => {
  const deleteCustomer = (event) => {
    event.preventDefault();
    const url = "/api/customers/" + event.target.value;
    fetch(url, {
      method: "DELETE",
    });
    stateRefresh();
  };

  return (
    <button onClick={deleteCustomer} value={id}>
      삭제
    </button>
  );
};

export default CustomerDelete;
