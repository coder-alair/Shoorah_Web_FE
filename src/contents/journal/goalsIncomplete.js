import React from "react";
import ImageCard from "../reusable/imageCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GoalsIncomplete = ({ filterData, refresh, setRefresh, handleDelete }) => {
  const history = useHistory();

  return (
    <div>
      <div className="scrollbar overflow-y-scroll px-4 pb-[2rem] xl:px-10">
        {filterData.map((item) => (
          <div key={item.goalId}>
            <ImageCard
              goal={true}
              title={item.title}
              url={"/journal/edit-goal"}
              data={item}
              image={item.imageUrl}
              id={item.goalId}
              handleDel={handleDelete}
              date={item.createdOn}
              del={true}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </div>
        ))}
        {!filterData.length && (
          <div className="mb-10 ">
            <p className="P22Mackinac ml-5 text-2xl">No Goals</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsIncomplete;
