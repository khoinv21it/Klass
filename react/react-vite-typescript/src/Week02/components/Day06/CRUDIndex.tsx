import React from "react";
import List from "./CRUD/List";
import Create from "./CRUD/Create";

type Props = {};

export default function CRUD({}: Props) {
  const [reload, setReload] = React.useState(0);
  const handleOnCreated = (customer: any) => {
    // Handle the created customer data here
    console.log("Customer created:", customer);
    setReload((prev) => prev + 1); // Increment reload to trigger re-fetching of data
  };

  return (
    <div>
      <List reload = {reload}/>
      <Create onCreated={handleOnCreated} />

    </div>
  );
}
