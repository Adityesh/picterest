import {
    FormControl,
    Input,
    FormLabel,
    Divider,
    Button,
    Heading,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateLogin } from "../../../redux/slices/authSlice";
import "./style.scss";

const Login: React.FC = props => {
    const { input, password } = useAppSelector(state => state.auth.login);
    const dispatch = useAppDispatch();

    const handleInputChange = (key: string, value: string) => {
        const obj = {
            [key] : value,
        };

        dispatch(updateLogin(obj));
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <Heading textAlign={"center"} mb="2rem">
                    Login
                </Heading>
                <FormControl mb={"1.5rem"}>
                    <FormLabel htmlFor="email">Username || Email</FormLabel>
                    <Input
                        id="email"
                        type="text"
                        variant={"filled"}
                        value={input}
                        onChange={({ target: { value } }) =>
                            handleInputChange("input", value)
                        }
                    />
                </FormControl>{" "}
                <FormControl mb={"1.5rem"}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        variant={"filled"}
                        value={password}
                        onChange={({ target: { value } }) =>
                            handleInputChange("password", value)
                        }
                    />
                </FormControl>{" "}
                <Divider mb="2rem" />
                <div className="auth-content-footer">
                    <Button
                        variant={"outline"}
                        colorScheme={"teal"}
                        mr={"0.5rem"}
                    >
                        Back
                    </Button>
                    <Button
                        variant={"solid"}
                        colorScheme={"teal"}
                        ml={"0.5rem"}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
