import React, { ReactNode, useCallback } from "react";

import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children?: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const List: React.FC<{ items: string[]; onClick?: (item: string) => void }> = ({
  items,
  onClick,
}) => (
  <ul>
    {items?.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}{" "}
      </li>
    ))}
  </ul>
);
function App() {
  const onlListClick = useCallback((item: string) => {
   
    window.alert(item);
  }, []);
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={["one", "two", "three"]} onClick={onlListClick} />
    </div>
  );
}

export default App;
