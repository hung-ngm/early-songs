import { Layout } from '../src/components/layout';
import { Login } from '../src/components/templates/login';
import { getCsrfToken } from "next-auth/react";

const LoginPage = () => {
    return (
        <Layout>
            <Login />
        </Layout>
    );
};

export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getCsrfToken(context) 
        }
    }
}

export default LoginPage;