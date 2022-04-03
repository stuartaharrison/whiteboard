import md5 from "md5";

export const GetGravatarIconUrl = (emailAddress) => {
    let hash = md5(emailAddress);
    return `https://www.gravatar.com/avatar/${hash}`;
}