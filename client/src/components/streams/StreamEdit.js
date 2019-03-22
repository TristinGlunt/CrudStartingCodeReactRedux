import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "../streams/StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    // load the stream into the store
    // NOTE: With React Router Dom, we always want to isolate
    // any given route to work on its own, thus we will fetch
    // the stream the user is wanting to ensure it's loaded into the store
    this.props.fetchStream(this.props.match.params.id);
  }

  // form values is the object given from form redux in StreamForm
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // return the stream form and pass in initial values for the
    // field components it's expecting. Automatically matches
    // to title and description, i.e., the names of the Fields
    if (!this.props.stream) return <div>Loading</div>;
    else
      return (
        <div>
          <h3>Edit Stream</h3>
          <StreamForm
            initialValues={_.pick(this.props.stream, "title", "description")}
            onSubmit={this.onSubmit}
          />
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  // get stream from the list of streams in the state store
  // that matches the current props params id
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  {
    fetchStream,
    editStream
  }
)(StreamEdit);
