import fetch from 'isomorphic-unfetch'
import Sub from "../components/subComponent";

const Index = ({count}) => (
  <div>
    <Sub />
    <div> count is … {count}</div>
  </div>
)

// リクエスト時にサーバーサイドでレンダリングして値を返す
Index.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { count: json.stargazers_count }
}

export default Index;
