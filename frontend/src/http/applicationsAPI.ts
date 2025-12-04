import { $authhost} from "./index";       
import { CreateApplicationDto } from "../types/types";


export const getApplications = async () => {  
    const {data} = await $authhost.get("api/applications/admin");
    return data;
};


export const addApplication = async (FormData: CreateApplicationDto) => {
    const {data} = await $authhost.post("api/applications/", FormData)
    return data;
}

export const updateApplicationStatus = async (id: number, status: string) => {
    const {data} = await $authhost.put(`api/applications/${id}`, { status });
    return data;
}


