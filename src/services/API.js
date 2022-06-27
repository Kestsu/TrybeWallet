const ISS_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const API = async () => {
  const response = await fetch(`${ISS_BASE_API}`);
  const json = await response.json();
  // console.log(json);
  return json;
};

export default API;
