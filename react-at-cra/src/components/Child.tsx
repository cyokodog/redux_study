import React from "react";

const items = ["a", "b", "c"];

type Props = {
  message: string;
  children: React.ReactNode;
};

export const Child: React.FC<Props> = ({ message, children }) => (
  <>
    <div>{message}</div>
    <div>{children}</div>
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </>
);
