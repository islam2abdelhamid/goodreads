import React, { useEffect, useState } from "react";
import requireAuth from '../../hocs/requireAuth';
import axios from "../../axios";
import DataList from "../../components/DataList/DataList";
const Home = props => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:5000/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("goodReadsToken"),
        },
      })

      .then((res) => {
        setBooks(res.data);
        // console.log(res.data);
      });
  }, [setBooks]);


  return (
    <DataList books={books} user={props.user} />
  );
};
export default requireAuth(Home);
