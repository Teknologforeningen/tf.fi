import { NextPage } from 'next'
import { useImperativeHandle } from 'react'
import { Event } from '../types'

interface Props {
    event: Event;
    setEventToShow: (event: Event) => void
}

const EventBall: NextPage<Props> = (props) => {

    const thisEvent: Event = props.event

    return (
        <div onClick={() => { props.setEventToShow(thisEvent)}} className={"dot"} />
    )
}


export default EventBall;
