import React, { FC } from "react";
import Create from "pages/debtors/Create";
import Debtor from "pages/debtors/Debtor";
import Edit from "pages/debtors/Edit";
import List from "pages/debtors/List";
import { Routes, Route } from "react-router-dom";

const Debtors: FC = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="/create" element={<Create />} />
      <Route path=":id" element={<Debtor />} />
      <Route path=":id/edit" element={<Edit />} />
    </Routes>
  );
};

export default Debtors;
