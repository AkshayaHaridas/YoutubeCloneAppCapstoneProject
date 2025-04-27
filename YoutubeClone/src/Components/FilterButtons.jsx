import { stateContext } from "./App";
import { useContext } from "react";
const FilterButtons = ({ categoryFun }) => {
  const { click } = useContext(stateContext);
  const items = [
    "All",
    "Hindi Films",
    "News",
    "Mixes",
    "Live",
    "Programming",
    "Asian music",
    "Recently Uploaded",
    "Stories",
    "Motivation",
    "Quiz",
    "Health",
    "Technology",
    "Podcasts",
    "Podcasts",
    "Podcasts",
    "Podcasts",
  ];

  console.log(items);

  return (
    <>
      <ul className={click ? "filterBtns adjWidth" : "filterBtns"}>
        {items.map((btn, index) => (
          <li key={index} onClick={() => categoryFun(btn)}>
            {btn}
          </li>
        ))}
      </ul>
    </>
  );
};
export default FilterButtons;
