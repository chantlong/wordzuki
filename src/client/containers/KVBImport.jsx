import { connect } from 'react-redux';
import { KVBImporter, KVBDone } from '../actions/actions';
import KVBImport from '../components/KVBImport';

const mapStateToProps = ({ fetcher }) => {
  const { inRequest, message } = fetcher;
  return { inRequest, message };
};

const mapDispatchToProps = dispatch => ({
  KVBImporter: (info) => {
    dispatch(KVBImporter(info));
  },
  KVBDone: () => {
    dispatch(KVBDone());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(KVBImport);
