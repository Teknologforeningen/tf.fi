import {NextPage} from "next";

const Column: NextPage = (props) => (
    <div className={"column"}>
        {props.children}
    </div>
);

export default Column;
