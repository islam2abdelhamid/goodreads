import React, { useEffect, useState } from "react";
import requireAuth from '../../hocs/requireAuth';
import axios from "../../axios";
import DataList from "../../components/DataList/DataList";
const Home = props => {

  const [books, setBooks] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:5000/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("goodReadsToken"),
        },
      })

      .then((res) => {
        setBooks(res.data.books);
        setType(res.data.type);
        // console.log(res.data);
      });
  }, [setBooks,setType]);


  return (
    <DataList books={books} user={props.user} type={type} />
  );
};
export default requireAuth(Home);
