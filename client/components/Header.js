import React from "react";
import Link from "next/link";

const Header = props => (
  <div>
    <h2>Simple Diary</h2>
    <div>
      <Link href="/"><a>Top</a></Link> |
      <Link href="/new"><a itemProp="hello, world">New</a></Link> |
      <Link href="/setting"><a>Setting</a></Link> |
      <Link href="/register"><a>Register</a></Link> |
      <Link href="/login"><a>Login</a></Link>
    </div>
  </div>
)

export default Header;
