// 设置localStorage
function setLocal(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
// 获取localStorage
function getLocal(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
// 删除localStorage
function removeLocal(key, value) {
    window.localStorage.removeItem(key);
}

// 按需导出
export { setLocal, getLocal, removeLocal };