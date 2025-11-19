import { selector } from "recoil";
import { getUserInfo } from "zmp-sdk";

export const userState = selector({
  key: "user",
  get: async () => {
    const { userInfo } = await getUserInfo({ autoRequestPermission: true });
    return userInfo;
  },
});
