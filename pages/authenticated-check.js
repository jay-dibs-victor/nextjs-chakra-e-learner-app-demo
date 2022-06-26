import { Loader } from "components/components/pages";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Persist the user on fresh signin

const AuthCheckPage = () => {
  const { me, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // wait for localStorage to hydrate

    const redirectUrl = router.query.redirect || "/store";
    if (me || token) {
      location.replace(redirectUrl);
    } else {
      // Not authenticated after loading — go to sign in
      router.replace("/signin");
    }
  }, [me, token, loading, router.query.redirect]);

  return (<Loader
    h="100vh"
    message="Authenticating please wait..."
  />);
};

export default AuthCheckPage;
