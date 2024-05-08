import React from "react";
import { setRate } from "../../http/rating";

class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating || null,
      temp_rating: null,
      deviceId: this.props.deviceId || null,
    };
  }

  handleMouseover(rating) {
    this.setState((prev) => ({
      rating,
      temp_rating: prev.rating,
    }));
  }

  handleMouseout() {
    this.setState((prev) => ({
      rating: prev.temp_rating,
    }));
  }

  rate(rating) {
    this.setState({
      rating,
      temp_rating: rating,
    });
  }

  async getDeviceId(rate = this.rate, deviceId) {
    await setRate(Number(rate), deviceId).then((data) => console.log(data));
    this.setState({
      deviceId,
    });
  }

  render() {
    const { deviceId } = this.state;
    let stars = [];
    for (let i = 0; i < 7; i++) {
      let klass = "rating__star-outline";
      if (this.state.rating >= i && this.state.rating !== null) {
        klass = "rating__star";
      }
      stars.push(
        <i
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            width: "17px",
            direction: i % 2 === 0 ? "ltr" : "rtl",
          }}
          className={klass}
          onClick={(e) => {
            e.stopPropagation();
            this.rate(i);
            this.getDeviceId(i + 1, deviceId);
          }}
          onMouseOver={() => this.handleMouseover(i)}
          onMouseOut={() => this.handleMouseout()}
        />
      );
    }
    return <div className="rating">{stars}</div>;
  }
}

export default Rating;
