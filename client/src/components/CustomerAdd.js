import React, { useState } from "react";
import { post } from "axios";

const CustomerAdd = ({ stateRefresh }) => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addCustomer().then((response) => {
      console.log(response.data);
      stateRefresh();
    });
    setFile(null);
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.value);
  };
  const handleValueChange = (event) => {
    if (event.target.name === "userName") {
      setUserName(event.target.value);
    } else if (event.target.name === "birthday") {
      setBirthday(event.target.value);
    } else if (event.target.name === "gender") {
      setGender(event.target.value);
    } else {
      setJob(event.target.value);
    }
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지 :{" "}
      <input
        type="file"
        name="file"
        file={file}
        value={fileName}
        onChange={handleFileChange}
      />
      <br />
      이름:{" "}
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={handleValueChange}
      />
      <br />
      생년원일:
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={handleValueChange}
      />
      <br />
      성별:
      <input
        type="text"
        name="gender"
        value={gender}
        onChange={handleValueChange}
      />
      <br />
      직업:
      <input type="text" name="job" value={job} onChange={handleValueChange} />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
};

export default CustomerAdd;
