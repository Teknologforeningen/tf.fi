import {NextPage} from "next";

const Row: NextPage = (props) => (
    <div className={"row"}>
        {props.children}
    </div>
);

export default Row;
