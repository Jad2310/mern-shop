interface IProps {
  value?: number;
  text?: string;
}

function Rating(props: IProps) {
  console.log("props: ", props);
  if (props.value !== undefined)
    return (
      <div className="rating">
        <span>
          <i
            style={{ color: "#f8e825" }}
            className={
              props.value >= 1
                ? "fas fa-star"
                : props.value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: "#f8e825" }}
            className={
              props.value >= 2
                ? "fas fa-star"
                : props.value >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: "#f8e825" }}
            className={
              props.value >= 3
                ? "fas fa-star"
                : props.value >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: "#f8e825" }}
            className={
              props.value >= 4
                ? "fas fa-star"
                : props.value >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: "#f8e825" }}
            className={
              props.value >= 5
                ? "fas fa-star"
                : props.value >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span className="ms-2">{props.text && props.text}</span>
      </div>
    );
  else return <></>;
}

export default Rating;
