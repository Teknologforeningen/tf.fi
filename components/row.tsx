import {NextPage} from "next";

interface Props {
    center?: boolean
}

/** Component for flexbox row */
const Row: NextPage<Props> = (props) => (
    <div className={"row"} style={{justifyContent: props.center ? 'center' : 'start'}}>
        {props.children}
    </div>
);

export default Row;
