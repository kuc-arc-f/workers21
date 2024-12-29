
const LibCookie = {
  
  getCookie: function (name) {
    const cookies = document.cookie.split("; "); // セミコロン＋スペースで分割
    for (const cookie of cookies) {
      const [key, value] = cookie.split("="); // "key=value" を分割
      //console.log(key, value);
      if (key === name) {
        return decodeURIComponent(value); // 値をデコードして返す
      }
    }
    return null; // 見つからない場合はnullを返す
  },

  getAuthValue: function () {
    const cookieAuthElem = document.getElementById("cookieAuth") as HTMLInputElement;
    let cookieAuth = cookieAuthElem ? cookieAuthElem.value : null;
    //console.log("cookieAuth", cookieAuth);
    return cookieAuth;
  },

  getUserId: function () {
  },

}
export default LibCookie;