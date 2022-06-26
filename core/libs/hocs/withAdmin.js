import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'components/components/pages';

const withAdmin = (WrappedComponent) => {
    return (props) => {
        const { me, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!me) {
                    router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
                } else if (me.role !== 'admin') {
                    router.replace('/');
                }
            }
        }, [me, loading, router]);

        if (loading || !me || me.role !== 'admin') {
            return <Loader h="100vh" message="Verifying Admin Access..." />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAdmin;
