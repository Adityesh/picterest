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
import { useLazyRegisterQuery } from "../../../redux/services/auth";
import { updateRegister } from "../../../redux/slices/authSlice";
import "./style.scss";

const Register: React.FC = props => {
    const { email, password, userName } = useAppSelector(state => state.auth.register);
    const toast = useToast();
    const navigate = useNavigate();
    const [trigger, { isError, isFetching, data, isSuccess, error }, lastPromiseInfo] =
        useLazyRegisterQuery();
    const dispatch = useAppDispatch();

    const handleInputChange = (key: string, value: string) => {
        const obj = {
            [key]: value,
        };

        dispatch(updateRegister(obj));
    };

    const handleRegister = () => {
        trigger({
            email,
            userName,
            password,
        });
    };

    useEffect(() => {
        if(!isFetching && isError) {
            toast({
                title: 'Error!',
                description: error?.data?.message ?? "Failed to register, try again.",
                status: 'error',
                duration: 2000,
              });
        }

        if(!isFetching && isSuccess) {
            toast({
                title : 'Register successful',
                status : 'success',
                duration : 2000,
                onCloseComplete : () => {
                    // Redirect to dashboard page
                    navigate('../login');
                },
            });
        }
    }, [isError, isSuccess, isFetching]);


    return (
        <div className="auth-container">
            <div className="auth-content">
                <Heading textAlign={"center"} mb="2rem">
                    Register
                </Heading>
                <FormControl mb={"1.5rem"}>
                    <FormLabel htmlFor="email-register">Email</FormLabel>
                    <Input
                        id="email-register"
                        type="text"
                        variant={"filled"}
                        value={email}
                        onChange={({ target: { value } }) =>
                            handleInputChange("email", value)
                        }
                    />
                </FormControl>{" "}
                <FormControl mb={"1.5rem"}>
                    <FormLabel htmlFor="userName-register">Username</FormLabel>
                    <Input
                        id="userName-register"
                        type="text"
                        variant={"filled"}
                        value={userName}
                        onChange={({ target: { value } }) =>
                            handleInputChange("userName", value)
                        }
                    />
                </FormControl>{" "}
                <FormControl mb={"1.5rem"}>
                    <FormLabel htmlFor="password-register">Password</FormLabel>
                    <Input
                        id="password-register"
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
                        onClick={handleRegister}
                    >
                        Sign up
                    </Button>
                </div>
                <Link className="redirect" to="/auth/login">Login</Link>

            </div>
        </div>
    );
};

export default Register;
