import { Outlet } from "react-router-dom";

const AuthIndex : React.FC = (props) => {
    return (
        <div>
            Auth Component
            <Outlet />
        </div>
    );
};

export default AuthIndex;
