import Masonry from "react-masonry-css";
import "./style.scss";

interface MasonryProps {
    className?: string;
    list?: Array<any>;
}

const items = Array(100)
    .fill(1)
    .map((item, index) => {
        return <p key={index}>Item value : {item}</p>;
    });

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const MasonryList: React.FC<MasonryProps> = ({ className, children }) => {
    return (
        <div className={className}>
            <Masonry
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                breakpointCols={breakpointColumnsObj}
            >
                {children}
            </Masonry>
        </div>
    );
};

export default MasonryList;
