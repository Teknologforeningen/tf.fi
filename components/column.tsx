import {NextPage} from "next";

interface Props {
    center?: boolean
}

/** Component for flexbox column */
const Column: NextPage<Props> = (props) => (
    <div className={"column"} style={{alignItems: props.center ? 'center' : 'start'}}>
        {props.children}
    </div>
);

export default Column;
