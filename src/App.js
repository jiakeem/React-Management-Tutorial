import React from "react";
import "./App.css";
import Customer from "./components/Customers";

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "신혜림",
    birthday: "961210",
    gender: "남자",
    job: "배달의민족",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "정가연",
    birthday: "970531",
    gender: "남자",
    job: "넥센타이어",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "이현주",
    birthday: "980218",
    gender: "남자",
    job: "더존",
  },
];

const App = () => {
  return (
    <div>
      {customers.map((c) => (
        <Customer
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
        />
      ))}
    </div>
  );
};

export default App;
