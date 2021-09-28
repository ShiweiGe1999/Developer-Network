import React, { Fragment } from "react";
import "./SplitText.css";
export interface SplitTextProps {
  copy: string;
}
export default function SplitText({ copy }: SplitTextProps) {
  const copyArr: Array<string> = copy.split("");

  return (
    <span>
      {copyArr.map((v, i) => {
        return (
          <span
            style={{ animationDelay: `${0.5 + i/10}s` }}
            className="mr-1 text ml-1"
            key={i}
          >
            {v}
          </span>
        );
      })}
    </span>
  );
}
