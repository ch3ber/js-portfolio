import React from 'react';
const API = process.env.API;

function getDataApi() {
   const [data, setData] = React.useState({});
   const [isloading, setIsLoading] = React.useState(true);

   React.useEffect(() => {

      const getData = async () => {
         //const apiURl = API;
         try {
            const response = await fetch(API);
            const responseJson = await response.json();
            const endResponse = responseJson.results[0];
            setData(endResponse);
            setIsLoading(false);
         } catch (error) {
            console.log('Fetch Error', error);
         };
      };
      getData();

   }, []);

   return {
      data,
      isloading
   };
}

export default getDataApi;
