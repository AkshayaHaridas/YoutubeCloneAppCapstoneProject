import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [result, setResult] = useState(null);
  const [err, seterr] = useState(null);
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const x = await fetch(url);
        if (!x.ok) {
          throw new Error(`HTTP error! status: ${x.status}`);
        }
        const y = await x.json();
        setResult(y);
      } catch (error) {
        if (error) {
          seterr(error);
        }
        console.log(error);
      }
    };
    asyncFunc();
  }, [url]);
  return [result, err];
};
export default useFetch;
