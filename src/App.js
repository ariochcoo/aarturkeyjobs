import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlideBar from "./components/utils/SlideBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { Navigation } from "./components/utils/Navigation";
import AdminPanel from "./components/pages/AdminPanel";
import LoginPage from "./components/pages/LoginPage";
import JobPage from "./components/pages/JobPage";
import { AppProvider } from "./Context.js";
import AddApplyForm from "./components/form/AddApplyForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import FirebaseAuthService from "./FirebaseAuthService";

function App() {
  const [jobPosts, setJobPosts] = useState([]);
  const [user, setUser] = useState();
  // eslint-disable-next-line no-unused-vars
  const [currentPostId, setCurrentPostId] = useState({});

  // function handleJobPageID(jobArray) {
  //   setJobPage(jobArray);
  // }
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

  //// Login control
  FirebaseAuthService.subscribeToAuthChanges(setUser);

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

  return (
    <AppProvider>
      <BrowserRouter>
        <Navigation existingUser={user} />
        <div className="container-flex">
          <div>
            <SlideBar></SlideBar>
          </div>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} />
            {user ? <Route path="/admin" element={<AdminPanel />} /> : null}

            <Route path="/login" element={<LoginPage existingUser={user} />} />
            <Route path="/applyform" element={<AddApplyForm />} />
            <Route path="/jobs/" element={<JobPage />} />
            {jobPosts.map((pageid, index) => (
              <Route
                key={index}
                path={`/jobs/${pageid.id}`}
                element={
                  <JobPage
                    currentJobPost={pageid}
                    handleSetCurrentPost={(currentId) => {
                      setCurrentPostId(currentId);
                    }}
                  />
                }
              />
            ))}
            {jobPosts.map((pageid, index) => (
              <Route
                key={index}
                path={`/jobs/${pageid.id}/applyform/${pageid.id}`}
                element={<AddApplyForm currentJobPost={pageid} />}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
