export class Util {
  static getCookie(name) {
    const cookies = document.cookie;
    if (!cookies) return "";
    const reqCookie = cookies
      .split(";")
      .find(
        (each) =>
          each.split("=")[0] === name || each.split("=")[0] === ` ${name}`
      );
    return reqCookie.split("=")[1];
  }
  static deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  static getGames() {
    return [{ url: "/number-riddle", name: "Number Riddle" }];
  }
}
