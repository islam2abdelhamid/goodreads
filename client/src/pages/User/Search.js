import React, { useEffect, useState } from "react";
import requireAuth from '../../hocs/requireAuth';
import axios from "../../axios";
import DataList2 from "../../components/DataList/DataList2";
const Home = props => {

  const [books, setBooks] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:5000/Search?q="+props.location.search.split("=")[1], {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("goodReadsToken"),
        },
      })

      .then((res) => {
        setBooks(res.data.books);
        setType(res.data.type);
      });
  }, [setBooks,setType]);


  return (
    <DataList2 books={books} user={props.user} type={type} />
  );
};
export default requireAuth(Home);
