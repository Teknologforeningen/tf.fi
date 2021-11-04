import {NextPage} from "next";

/** Component for flexbox row */
const Row: NextPage = (props) => (
    <div className={"row"}>
        {props.children}
    </div>
);

export default Row;
