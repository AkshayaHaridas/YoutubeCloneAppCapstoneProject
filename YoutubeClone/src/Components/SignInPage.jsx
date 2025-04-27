import { Link } from "react-router-dom";
const SignInPage = () => {
  return (
    <div className="welcome">
      Welcome !!! New user?{" "}
      <div className="signinSpan">
        <Link to="/login">sign in </Link>
      </div>{" "}
      to get started
    </div>
  );
};
export default SignInPage;
