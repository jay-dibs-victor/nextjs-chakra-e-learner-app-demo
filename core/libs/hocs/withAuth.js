import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'components/components/pages';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { me, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !me) {
                router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
            }
        }, [me, loading, router]);

        if (loading || !me) {
            return <Loader h="100vh" message="Authenticating..." />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
