const SingleDataDetailView = (props) => {
  return (
    <>
      {Object.keys(props.detailData).map((key, index) => {
        return (
          <div key={index}>
            <div>
              {key} : {props.detailData[key]}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleDataDetailView;
