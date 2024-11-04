import request from '@/utils/request'


const ITEM_BASE_URL = "/admin";

const AddItemApi =  {
    addItem(data: AddItemData){
        console.log(data);
        const formData = new FormData();
        formData.append("userId", data.userId);
        formData.append("itemId", data.itemId);
        formData.append("count", data.count);
        return request<any, AddItemResult>({
            url: `${ITEM_BASE_URL}/addItem`,
            method: "post",
            data: formData,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
    }
}

export default AddItemApi;

/** 登录请求参数 */
export interface AddItemData {
    /** 用户名 */
    userId: string;
    /** 密码 */
    itemId: string;
    /**
     * 数量
     */
    count: number;
}

/** 登录请求参数 */
export interface AddItemResult {
    /** 用户名 */
    userId: string;
    /** 密码 */
    itemId: string;
    /**
     * 数量
     */
    count: number;
}