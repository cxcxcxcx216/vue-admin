import request from '@/utils/request'


const AUTH_BASE_URL = "/login";

const LoginApi =  {
    login(data: LoginData){
        console.log(data);
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        return request<any, LoginResult>({
            url: `${AUTH_BASE_URL}/admin`,
            method: "post",
            data: formData,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
    }
}

export default LoginApi;

/** 登录请求参数 */
export interface LoginData {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
}

/** 登录响应 */
export interface LoginResult {
    /** 访问token */
    token?: string;

    /** 昵称 */
    nickName: string;

    /**头像**/
    avatar: string;

    /**当前时间*/
    currentTime: number;

    /**新老用户标记**/
    userFlag: number;

    /**
     * 用户ID
     */
    userId: string;

    /**
     * 用户邀请码
     */
    invitationCode: string;

    /**
     * 邀请用户提示消息
     */
    inviterFlag:String;
}