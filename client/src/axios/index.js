import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://localhost:5000",
});
export const Login = async (formData) =>
  await HTTP.post("/users/signin", formData);
export const Kayit = async (formData) =>
  await HTTP.post("/users/signup", formData);
export const Listele = async (formData) => await HTTP.get("/users/signin");
export const GetBestSites = async () => await HTTP.get("/Question/bestSites");
export const CreatePost = async (formData) =>
  await HTTP.post("/users/post", formData);
export const GetPost = async (formData) => await HTTP.get("/users/post");
export const CreateQuestioner = async (formData, token) =>
  await HTTP.post("/Question/Rating", formData, {
    headers: { token },
  });
export const GetQuestions = async (formData) => await HTTP.get("/Question/Q");
export const GetUserData = async (formData) =>
  await HTTP.post("/users/userData", formData);
export const GetComment = async (formData) =>
  await HTTP.post("/Question/getComment", formData);
export const GetUserQuestions = async (formData) =>
  await HTTP.post("/Question/userQuestions", formData);
export const SearchUser = async (formData) =>
  await HTTP.post("/users/searchUser", formData);
export const AddComment = async (formData, token) =>
  await HTTP.post("/Question/addComment", formData, {
    headers: { token },
  });
export const GetQuestion = async (formData) =>
  await HTTP.post("/Question/getQuestion", {
    formData,
  });

export const toggleStar = async (formData, token) =>
  await HTTP.post(
    "/Question/toggleStar",
    { formData },
    {
      headers: { token },
    }
  );

export const getStar = async (formData) =>
  await HTTP.post("/Question/getStar", { formData });

export const deletePost = async (item, kulId) =>
  await HTTP.delete("/Question/" + item, {
    data: {
      userId: kulId,
    },
  });
export const updateQuestion = async (item, token) =>
  await HTTP.put("/Question/" + item.id, {
    data: {
      item,
      userId: token,
    },
  });

export const getStaredPost = async (data, token) =>
  await HTTP.get("Question/myStars/" + data);
export const getWebsite = async (data) =>
  await HTTP.get("Question/website/" + data);
export const getWebsiteComments = async (data, offset) =>
  await HTTP.get("Question/website/comments/" + data, {
    params: {
      offset,
    },
  });
export const updateFullname = async (newFullname, token) =>
  await HTTP.put("/users/updateFullname", {
    headers: { token },
    data: {
      newFullname,
    },
  });
export const updatePP = async (formData, token) =>
  await HTTP.post("/users/updatePP", formData, {
    headers: {
      token,
    },
  });
export const updateUsername = async (newUsername, token) =>
  await HTTP.put("/users/updateUsername", {
    headers: { token },
    data: {
      newUsername,
    },
  });
export const updatePassword = async (newPassword, token) =>
  await HTTP.put("/users/updatePassword", {
    headers: { token },
    data: {
      newPassword,
    },
  });
export const follow = async (user, userId) =>
  await HTTP.put("/users/follow/" + user, {
    userId,
  });
export const unfollow = async (user, userId) =>
  await HTTP.put("/users/unfollow/" + user, {
    userId,
  });

export const getMyRatings = async (token, offset) =>
  await HTTP.get("Question/myRatings/" + offset, { headers: { token } });

export const AdminChangeLogo = async (formData) =>
  await HTTP.post("/Question/AdminChangeLogo", formData);

export const DeleteRating = async (formData) =>
  await HTTP.post("/Question/DeleteRating", formData);

export const SikayetEt = async (formData) =>
  await HTTP.post("/Question/SikayetEt", formData);
export const Sikayetler = async () => await HTTP.get("/Question/Sikayet");
export const BelirliSikayet = async (formData) =>
  await HTTP.post("/Question/BelirliSikayet", formData);
export const SikayetSil = async (formData) =>
  await HTTP.post("/Question/SikayetSil", formData);
