import {  $authhost } from "./index.ts";
import { CreateFeedbackDto } from "../types/types.ts";

export async function getFeesbacks() {
    const {data} = await $authhost.get("api/feedback/admin")
    return data
}

export async function addFeedback(FormData: CreateFeedbackDto) {
    const {data} = await $authhost.post("api/feedback", FormData);
    return data;
}

export async function deleteFeedback(id: number) {
    const {data} = await $authhost.delete(`api/feedback/admin/${id}`);
    return data;
}