import { connect } from 'react-redux';
import { KVBImporter } from '../actions/actions';
import KVBImport from '../components/KVBImport';

const mapStateToProps = ({ fetcher }) => {
  const { inRequest, message } = fetcher;
  return { inRequest, message };
};

const mapDispatchToProps = dispatch => ({
  KVBImporter: (info) => {
    dispatch(KVBImporter(info));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(KVBImport);
