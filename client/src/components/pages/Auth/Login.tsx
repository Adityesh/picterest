import {
    FormControl,
    Input,
    FormLabel,
    Divider,
    Button,
    Heading,
    useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLazyLoginQuery } from "../../../redux/services/auth";
import { updateLogin } from "../../../redux/slices/authSlice";
import "./style.scss";

const Login: React.FC = props => {
    const toast = useToast();
    const navigate = useNavigate();
    const { input, password } = useAppSelector(state => state.auth.login);
    const [trigger, { isError, isFetching, data, isSuccess, error }, lastPromiseInfo] =
        useLazyLoginQuery();
    const dispatch = useAppDispatch();
    const handleInputChange = (key: string, value: string) => {
        const obj = {
            [key]: value,
        };

        dispatch(updateLogin(obj));
    };

    console.log(data);

    const handleLogin = () => {
        const identifyEmailRegex = /.*@.+\..+/g;
        const obj = {};
        if (identifyEmailRegex.test(input)) {
            // email
            trigger({
                email: input,
                password,
            });
        } else {
            // username
            trigger({
                userName: input,
                password,
            });
        }
    };

    useEffect(() => {
        if(!isFetching && isError) {
            toast({
                title: 'Error!',
                description: error?.data?.message ?? "Failed to login",
                status: 'error',
                duration: 2000,
              });
        }

        if(!isFetching && isSuccess) {
            toast({
                title : 'Login successful',
                status : 'success',
                duration : 2000,
                onCloseComplete : () => {
                    // Redirect to dashboard page
                    navigate('../../');
                },
            });
        }
    }, [isError, isSuccess, isFetching]);

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
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    <Button
                        variant={"solid"}
                        colorScheme={"teal"}
                        ml={"0.5rem"}
                        isLoading={isFetching}
                        loadingText="Logging in..."
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
                <Link className="redirect" to="/auth/register">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;
