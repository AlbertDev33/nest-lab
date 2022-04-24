/* eslint-disable @next/next/no-html-link-for-pages */
import { gql, useQuery } from "@apollo/client";
import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { withApollo } from "../../lib/withApollo";

interface GetProductsParams {
    id: string;
    title: string;
}

const PRODUCTS_QUERY = gql`
    query {
        products {
            id
            title
        }
    }
`

function Home() {
    const { user } = useUser();
    const { data, loading, error } = useQuery<GetProductsParams>(PRODUCTS_QUERY);

    return (
        <div>
            <h1>Hello World</h1>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>

            <a href="/api/auth/logout">Logout</a>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ req, res }) => {
      console.log(getAccessToken(req, res));
  
      return {
        props: {}
      }
    }
  });

  export default withApollo(Home);

