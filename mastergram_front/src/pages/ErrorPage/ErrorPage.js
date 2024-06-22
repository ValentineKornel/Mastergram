import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <h1>Error occured</h1>
            <Link to='/auth/login'>Log in</Link>
        </div>
    );
}

export default ErrorPage;