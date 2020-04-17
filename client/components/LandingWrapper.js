import Link from "next/link";

function Menu() {
  return (
    <ul>
      <li>
        <Link href="/login">
          <a>login</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a>signup</a>
        </Link>
      </li>
    </ul>
  );
}

function LandingWrapper(props) {
  const { children } = props;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2>Simple Diary</h2>
        <div style={{ marginLeft: "auto" }}>
          <Menu />
        </div>
      </div>
      {children}
    </div>
  );
}

export default LandingWrapper;
