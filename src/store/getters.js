// area Id
export const currentSelection = state => {
    return state.area.currentCity;
};
export const areaChangeFlag = state => {
    return state.area.areaChangeFlag;
};

// product Info 
export const productDetailHtml = state => {
    return state.product.productDetailHtml;
};
export const oriBasicInfo = state => {
    return state.product.basicInfo;
};
export const oriImgInfo = state => {
    return state.product.imgInfo;
};
export const oriPayInfo = state => {
    return state.product.payInfo;
};
// selected component uuid
export const currentSelectionComponent = state => {
    return state.miniPage.uuid;
};
// export const allComponents = state => {
//     return state.miniPage.list;
// };


// get im head img 
export const currentHeadImg = state => {
    return state.im.headImg;
};
// get im nick name
export const currentNickName = state => {
    return state.im.nickName;
};
