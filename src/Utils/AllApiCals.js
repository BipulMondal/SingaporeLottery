import HttpClient from "./HttpClient";

//login
const Loginfunc = async (data) => {
  let endpoint = `/login.php?email=${data.email}&password=${data.password}`;
  return await HttpClient.get(endpoint, data);
};

//category
const addCategory = async (obj) => {
  const { gameTime, drawno, firstPrize, predigit, seriesNo, currentDate } = obj;
  let endpoint = `/result_insert.php?game_name=${gameTime}&draw_number=${drawno}&first_prize=${firstPrize}&pre_digit=${predigit}&series_no=${seriesNo}&cur_date=${currentDate}`;
  return await HttpClient.post(endpoint);
};
const fetchSingleCategoryById = async (id) => {
  let endpoint = `category/${id}`;
  return await HttpClient.get(endpoint);
};
const UpdateCategory = async (id, data) => {
  let endpoint = `category/${id}`;
  return await HttpClient.put(endpoint, data);
};

const deleteCategory = async (id) => {
  let endpoint = `/delete_result.php?id=${id}`;
  return await HttpClient.deletemethod(endpoint);
};

const viewAllCategory = async (gameTime) => {
  let endpoint = `/fetch_result.php?game_name=${gameTime}`;
  // let dataToSend = {
  //     input_date: '2024-08-11',
  //     game_time: 'Morning'
  // }
  const dataToSend = {};

  return await HttpClient.post(endpoint, dataToSend);
};
//service
const addService = async (data) => {
  let endpoint = "services";
  return await HttpClient.post(endpoint, data);
};
const fetchSingleService = async (id) => {
  let endpoint = `services/${id}`;
  return await HttpClient.get(endpoint);
};
const UpdateService = async (id, data) => {
  let endpoint = `services/${id}`;
  return await HttpClient.put(endpoint, data);
};

const deleteService = async (id) => {
  let endpoint = `services/${id}`;
  return await HttpClient.deletemethod(endpoint);
};

const viewAllService = async (page) => {
  let endpoint = "";

  endpoint = `services/?page=${page ?? null}`;

  return await HttpClient.get(endpoint);
};

//subService

const addsubService = async (data) => {
  let endpoint = "sub-services";
  return await HttpClient.post(endpoint, data);
};
const fetchSinglesubService = async (id) => {
  let endpoint = `sub-services/${id}`;
  return await HttpClient.get(endpoint);
};
const UpdatesubService = async (id, data) => {
  let endpoint = `sub-services/${id}`;
  return await HttpClient.put(endpoint, data);
};

const deletesubService = async (id) => {
  let endpoint = `sub-services/${id}`;
  return await HttpClient.deletemethod(endpoint);
};

const viewAllsubService = async (page, parent) => {
  const endpoint = `sub-services/${page ?? null}`;
  return await HttpClient.get(endpoint);
};
//units
const getAllUnits = async (page, parent) => {
  const endpoint = `units`;
  return await HttpClient.get(endpoint);
};






/*-------- fetch spin and slotmachine data ----------*/

const getFirstResult = async (gameDate, gameName) => {
  const endpoint = `/fetch_first_result.php?game_date=${gameDate}&game_type=${gameName}`;
  return await HttpClient.get(endpoint);
};

const getSecoundThirdResult = async (gameDate, gameName) => {
  const endpoint = `/fetch_second_third_result.php?game_date=${gameDate}&game_type=${gameName}`;
  return await HttpClient.get(endpoint);
};

const getFourthResultData = async (gameDate, gameName) => {
  const endpoint = `/fetch_fifth_result.php?game_date=${gameDate}&game_type=${gameName}`;
  return await HttpClient.get(endpoint);
};

const getAllTime = async (gameDate, gameName) => {
  const endpoint = `/fetch_baji_timimng.php?game_type`;
  return await HttpClient.get(endpoint);
};
const getSingleTime = async (gameName) => {
  const endpoint = `/fetch_baji_timimng.php?game_type=${gameName}`;
  return await HttpClient.get(endpoint);
};

const addLiveUrl = async (liveurl, gname, gdate, gtime) => {


  console.log(gname, gdate, liveurl, "kkkk")
  let endpoint = `/insertyoutubeUrl.php?embededUrl=${liveurl}&game_date=${gdate}&draw_time=${gtime}&game_type=${gname}`
  return await HttpClient.post(endpoint, {});
}
const fetchAllLiveUrl = async (gName, gDate) => {
  console.log(gName, gDate, "88899")
  let endpoint = `/fetch_youtubeUrl.php?game_type=${gName}&game_date=${gDate}`
  // let endpoint = `/fetch_youtubeUrl.php?game_type=${gName}`
  // let rress = await HttpClient.get(endpoint1)
  // console.log(await HttpClient.get(endpoint1), rress, "Single urlss")

  console.log(await HttpClient.get(endpoint), "all urlss")
  return await HttpClient.get(endpoint);
}



export {
  Loginfunc,
  addCategory,
  viewAllCategory,
  fetchSingleCategoryById,
  UpdateCategory,
  deleteCategory,
  addService,
  fetchSingleService,
  UpdateService,
  deleteService,
  viewAllService,
  viewAllsubService,
  addsubService,
  fetchSinglesubService,
  UpdatesubService,
  deletesubService,
  getAllUnits,
  getFirstResult,
  getSecoundThirdResult,
  getFourthResultData,
  getAllTime,
  getSingleTime,
  addLiveUrl,
  fetchAllLiveUrl
};
