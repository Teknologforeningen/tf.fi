import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import { Post } from "../types";

export function postToTimelineItemModel(post: Post): TimelineItemModel {
    return {
        title: post.Title,
        cardTitle: post.Title,
    }
}
