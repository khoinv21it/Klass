import React from "react";

type Props = {};

export default function Exercise10({}: Props) {
  const items = ["Apple", "Banana", "Orange", "Grapes", "Pineapple"];
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
