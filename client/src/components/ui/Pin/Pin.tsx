import "./style.scss";
import { Image, Avatar, IconButton } from "@chakra-ui/react";
import { CheckIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../../redux/hooks";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface UserProps {
    userName: string;
    email: string;
    isDeleted: boolean;
}

interface PinProps {
    _id: string;
    image: string;
    description: string;
    isDeleted: boolean;
    likes: Array<UserProps>;
    tags: Array<string>;
    owner: UserProps;
}

const Pin: React.FC<PinProps> = ({
    image,
    description,
    _id,
    isDeleted,
    likes,
    tags,
    owner,
}) => {
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    return (
        <div className="pin-container">
            <div className="image-info">
                <div className="image-overlay">
                    <p>{description}</p>
                </div>
                <Image objectFit="cover" src={image} alt={description} />
            </div>
            <div className="pin-info">
                <Avatar size={"sm"} name={owner.userName} />
                <AiOutlineHeart size="1.5em" className="icon"/>
            </div>
        </div>
    );
};

export default Pin;
