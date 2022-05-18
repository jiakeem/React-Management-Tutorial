const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); //REST API로 데이터 주고받기 위함
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
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
  ]);
});

app.listen(port, () => console.log(`listening on port ${port}`));
