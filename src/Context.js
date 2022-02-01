import React, { createContext, useState, useEffect } from "react";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

export const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [jobPosts, setJobPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});

  // use effect first time rendering take all value
  useEffect(() => {
    fetchVacancies()
      .then((fetchedVacancies) => {
        setJobPosts(fetchedVacancies);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }, []);

  // // current Post bulma
  // function handleCurrentPost(e) {
  //   //   const selectedPost = {
  //   //     positionName: e.positionName,
  //   //     location: e.location,
  //   //     publishDate: e.publishDate,
  //   //     closeDate: e.closeDate,
  //   //     typeOfContract: e.typeOfContract,
  //   //     jobDetails: e.jobDetails,
  //   //     reportsTo: e.reportsTo,
  //   //     responsibilities: e.responsibilities,
  //   //     essential: e.essential,
  //   //     desirable: e.desirable,
  //   //   };
  //   setCurrentPost(e);
  //   //   console.log(selectedPost);
  // }

  // .......Read Post  Documents.............

  async function fetchVacancies() {
    let fetchedVacancies = [];
    try {
      const response = await FirebaseFirestoreService.readDocumentsPost({
        collection: "jobposts",
      });
      const newVacancies = response.docs.map((vacanDoc) => {
        const id = vacanDoc.id;
        const data = vacanDoc.data();

        return { ...data, id };
      });

      fetchedVacancies = [...newVacancies];
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    return fetchedVacancies;
  }

  // ................................................

  // fetch apply form

  // Context Provider
  return (
    <Provider value={[jobPosts, setJobPosts, currentPost, setCurrentPost]}>
      {props.children}
    </Provider>
  );
};
