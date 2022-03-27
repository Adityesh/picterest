import "./style.scss";
import {
    Button,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    TagLeftIcon,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import DrawerComponent from "../../ui/Drawer/Index";
import { useEffect, useRef, useState } from "react";
import Pin from '../../ui/Pin/Pin';
import { updateAddPin } from "../../../redux/slices/dashboardSlice";
import Fuse from "fuse.js";
import {
    HamburgerIcon,
    UnlockIcon,
    ArrowForwardIcon,
    SettingsIcon,
    SearchIcon,
    InfoIcon,
    AddIcon,
    CloseIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlice";
import { tags } from "../../../Utils/util";
import { useOutsideAlerter } from "../../../redux/hooks";
import { useGetPins, useLazyAddPin } from "../../../redux/services/pin";
import { useGetAccountDetails } from "../../../redux/services/account";
import MasonryList from "../../ui/Masonry/Index";

const fuse = new Fuse(tags);

const Homepage: React.FC = props => {
    const [pageNumber, setPageNumber] = useState(1);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const { _id : owner } = useAppSelector(state => state.auth.user);
    const { data : pinsData, error : pinError, isLoading : isPinsLoading, refetch : refetchPins } = 
    useGetPins({ page : pageNumber, limit : 5 });
    const { data : accountData, error : accountError, isLoading, refetch } = useGetAccountDetails({ _id : owner });
    const { image, description, tagsInput, tagsValue, tagsResult } =
        useAppSelector(state => state.dashboard.addPin);
    const [trigger, { isError, isFetching, data, isSuccess, error }, lastPromiseInfo] =
        useLazyAddPin();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState<boolean>(false);
    const tagsSearchRef = useRef(null);

    useOutsideAlerter(tagsSearchRef, () => {
        dispatch(updateAddPin({
            tagsValue : [],
        }));
    });


    useEffect(() => {
        if(owner) {
            refetch();
        }
    }, []);


    const handleDrawerOpen = () => setOpen(open => !open);

    const handleTagsChange = (e: any) => {
        dispatch(
            updateAddPin({
                tagsInput: e.target.value,
                tagsValue: fuse.search(e.target.value).slice(0, 5),
            }),
        );
    };

    const handleAddTag = (tag: any) => {
        dispatch(
            updateAddPin({
                tagsValue: tagsValue.filter(
                    (tags: any) => tags.item !== tag.item,
                ),
                tagsResult: [...tagsResult, tag],
            }),
        );
    };

    const handleRemoveTag = (tag : any) => {
        dispatch(
            updateAddPin({
                tagsResult: tagsResult.filter(
                    (tags: any) => tags.item !== tag.item,
                ),
                tagsValue: tagsValue.length === 0 ? [] : [...tagsValue, tag],
            }),
        );
    };

    const handleAddPin = () => {
        trigger({
            description,
            image,
            owner,
            tags : tagsResult.map(tags => tags.item),
        });
    };


    return (
        <div className="home-container">
            <div className="home-content">
                <div className="homepage-header">
                    <p>Picterest</p>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                        />
                        <MenuList>
                            {isAuthenticated && (
                                <>
                                    <MenuItem
                                        onClick={() => dispatch(logoutUser())}
                                        icon={<UnlockIcon />}
                                    >
                                        Log out
                                    </MenuItem>
                                    <MenuItem icon={<SettingsIcon />}>
                                        Account
                                    </MenuItem>
                                </>
                            )}
                            <MenuItem
                                onClick={() => navigate("/about")}
                                icon={<InfoIcon />}
                            >
                                About
                            </MenuItem>

                            {!isAuthenticated && (
                                <>
                                    <MenuItem icon={<SearchIcon />}>
                                        Users
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => navigate("/auth/")}
                                        icon={<ArrowForwardIcon />}
                                    >
                                        Log in
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            navigate("/auth/register")
                                        }
                                        icon={<AddIcon />}
                                    >
                                        Register
                                    </MenuItem>
                                </>
                            )}
                        </MenuList>
                    </Menu>
                </div>
                <div className="search-box">
                    <Input variant={"filled"} placeholder="Search for pins" />
                </div>
                {isAuthenticated && (
                    <Button onClick={handleDrawerOpen} colorScheme={"teal"}>
                        Add Pin
                    </Button>
                )}
                <MasonryList className={'grid-container'}>
                    {pinsData?.data?.documents.map((pin : any, index : number) => {
                        return <Pin {...pin}/>;
                    })}

                </MasonryList>
            </div>
            <DrawerComponent
                header="Add New Pin"
                placement={"left"}
                isOpen={isOpen}
                onClose={() => null}
                setOpen={setOpen}
            >
                <Input
                    variant={"filled"}
                    value={image}
                    onChange={({ target: { value } }) =>
                        dispatch(updateAddPin({ image: value }))
                    }
                    placeholder="Url for image"
                    mb={"1rem"}
                />
                <Input
                    variant={"filled"}
                    placeholder="Description"
                    value={description}
                    onChange={({ target: { value } }) =>
                        dispatch(updateAddPin({ description: value }))
                    }
                    mb={"1rem"}
                />

                <div className="tags-result">
                    {tagsResult.map((tag: any, index) => {
                        return (
                            <Tag
                                size={"sm"}
                                key={index}
                                margin={"0 2px"}
                                variant="subtle"
                                colorScheme="teal"
                            >
                                <TagLeftIcon
                                    boxSize="12px"
                                    as={CloseIcon}
                                    cursor="pointer"
                                    onClick={() => handleRemoveTag(tag)}
                                />
                                <TagLabel>{tag.item}</TagLabel>
                            </Tag>
                        );
                    })}
                </div>

                <div className="tags-search-container">
                    <Input
                        variant={"filled"}
                        placeholder="Enter tags"
                        value={tagsInput}
                        onChange={handleTagsChange}
                        mb="1rem"
                    />
                    <div className="tags-search" ref={tagsSearchRef}>
                        {tagsValue.map((tag: any, index) => {
                            return (
                                <p
                                    onClick={() => handleAddTag(tag)}
                                    key={index}
                                >
                                    {tag.item}
                                </p>
                            );
                        })}
                    </div>
                </div>

                <Button
                    colorScheme={"teal"}
                    width="100%"
                    onClick={handleAddPin}
                >
                    Add
                </Button>
            </DrawerComponent>

            
        </div>
    );
};

export default Homepage;
