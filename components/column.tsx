import {NextPage} from "next";

/** Component for flexbox column */
const Column: NextPage = (props) => (
    <div className={"column"}>
        {props.children}
    </div>
);

export default Column;
