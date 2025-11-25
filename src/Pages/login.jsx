import Auth from "../components/Layouts/AuthLayouts";
import LoginForm from "../components/Fragments/LoginForm";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  useAuth({ redirect: false });
  return (
    <Auth title="Login" type="login">
      <LoginForm />
    </Auth>
  );
};

export default LoginPage;
