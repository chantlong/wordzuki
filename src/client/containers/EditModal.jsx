import { connect } from 'react-redux';
import EditModal from '../components/EditModal';
import { toggleEditModal, addDefinition } from '../actions/actions';

const mapStateToProps = ({ word, editModal }) => ({ word, editModal });

const mapDispatchToProps = dispatch => ({
  toggleEditModal: () => {
    dispatch(toggleEditModal());
  },
  addDefinition: (id, ex, def) => {
    dispatch(addDefinition(id, ex, def));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
