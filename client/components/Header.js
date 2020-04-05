import React from "react";
import Link from "next/link";

const Header = props => {
  const { children } = props;
  return(
    <div>
      <Link href="/"><a><h2>Simple Diary</h2></a></Link>
      <div>
        <Link href="/"><a>Top</a></Link> |
        <Link href="/new"><a itemProp="hello, world">New</a></Link> |
        <Link href="/setting"><a>Setting</a></Link> |
        <Link href="/register"><a>Register</a></Link> |
        <Link href="/login"><a>Login</a></Link>
      </div>
      <div>
        item: {children}
      </div>
    </div>
  )
}

export default Header;
