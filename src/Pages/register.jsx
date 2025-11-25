import Auth from "../components/Layouts/AuthLayouts";
import RegisterForm from "../components/Fragments/RegisterForm";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  useAuth({ redirect: false });
  return (
    <Auth title="Register" type="register">
      <RegisterForm />
    </Auth>
  );
};

export default RegisterPage;
