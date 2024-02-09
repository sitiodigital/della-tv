

import axios from 'axios';

export const useGraphql = async () => {
  var options = {
    method: 'POST',
    url: 'https://apiv2.jogorapidodelivery.com.br:4000/graphql',
    headers: {'Content-Type': 'application/json'},
    data: {
      query: `
      query tvDellaFotos{
          tvDellaFotos{
              type
              src
              name
          }
      }
      
      `
    }
  };
  return axios.request(options).then(function (response) {
    return response.data.data.tvDellaFotos;
  }).catch(function (error) {
    return [];
  });
};
export default useGraphql;
