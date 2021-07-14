import { HIDEN_LOADER, SHOW_LOADER } from "../constants/common.constant";

// loader
export const showLoader_Action = () => {
    return {
        type: SHOW_LOADER,
    }
};
export const hidenLoader_Action = () => {
    return {
        type: HIDEN_LOADER,
    }
};