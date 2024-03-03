import axios from "axios";

const getUserData = async (pageIndex, search, sortParam, sortType) => {
  try {
    const params = {};
    if (pageIndex) params.page = pageIndex + 1;
    if (search) params.search = search;
    if (sortParam) params.sort_by = sortParam;
    if (sortType) params.sort_type = sortType;
    console.log(params);
    const response = await axios.get("http://localhost:5000/records", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export { getUserData };
