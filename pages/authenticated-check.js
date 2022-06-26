import { Loader } from "components/components/pages";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Redirect user after successful sign-in

const AuthCheckPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Read directly from localStorage — AuthContext won't have re-hydrated yet
    const token = localStorage.getItem('token') || 
                  (typeof document !== 'undefined' && 
                   document.cookie.split(';').find(c => c.trim().startsWith('token='))
                    ?.split('=')[1]?.trim());

    const userStr = localStorage.getItem('user');
    let user = null;
    try {
      if (userStr) user = JSON.parse(userStr);
    } catch (e) {}

    let redirectUrl = router.query.redirect 
      ? decodeURIComponent(router.query.redirect) 
      : "/store";

    if (user?.role === 'admin' && !router.query.redirect) {
      redirectUrl = "/admin";
    }

    if (token) {
      location.replace(redirectUrl);
    } else {
      router.replace("/signin");
    }
  }, [router.query.redirect]);

  return <Loader h="100vh" message="Authenticating please wait..." />;
};

export default AuthCheckPage;
