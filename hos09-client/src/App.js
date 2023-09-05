import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import MyCreate from "./components/myCreate";
import MyEdit from "./components/myEdit";
import MyRecordList from "./components/myRecordList";
import MyNav from "./components/myNav";

// We import all the components we need in our app
// App.js

const App = () => {
  return (
    <div>
      <MyNav />
      <Routes>
        <Route exact path="/" element={<MyRecordList />} />
        <Route path="/create" element={<MyCreate />} />
        <Route path="/edit/:id" element={<MyEdit />} />
      </Routes>
    </div>
  );
};

export default App;
