import { connect } from 'react-redux';
import SearchHistory from '../components/SearchHistory';

const mapStateToProps = ({ words }) => ({ words });

export default connect(mapStateToProps)(SearchHistory);
