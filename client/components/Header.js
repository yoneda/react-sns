import React from "react";
import Link from "next/link";

const Header = (props) => {
  const { children } = props;
  return (
    <div>
      <Link href="/">
        <a>
          <h2>Simple Diary</h2>
        </a>
      </Link>
      {children}
      <br />
    </div>
  );
};

export default Header;
