import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

// need to show title and description.
// need to read id out of URL, call action creator to
// request the stream to load it into state, then use
// mapStateToProps to get the details out of the store into
// the props

class StreamShow extends React.Component {
  componentDidMount() {
    // when the component mounts, fetch the stream based on
    // the routes id
    this.props.fetchStream(this.props.match.params.id);
  }

  renderStream() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      const { title, description } = this.props.stream;
      return (
        <div>
          <h1>{title}</h1>
          <h5>{description}</h5>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderStream()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  // go into the store state and request from the streams the
  // stream we're trying to show
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
