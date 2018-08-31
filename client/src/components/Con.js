import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../actions/actionCreators';
import App from '../App';

function mapStateToProps(state) {
    return {
        props: state.posts,
        comments: state.comments
    }
}

function MapDispatchToProps(dispatch) {
    return  bindActionCreators(actionCreators, dispatch);
}

const Container = connect(mapStateToProps, MapDispatchToProps)(App);

export default withRouter(Container);