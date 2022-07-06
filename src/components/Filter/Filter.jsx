import PropTypes from 'prop-types';
import styles from './filter.module.css';

function Filter({title, filter}) {
        return (
            <div className={styles.wrapper}>
                <label className={styles.label}>{title}
                    <input className={styles.input} type="text" onChange={filter} required />
                </label>
            </div>
        )
    }

Filter.defaultProps = {
    filter: ()=>{},
}    


Filter.propTypes = {
    title:PropTypes.string,
    filter: PropTypes.func.isRequired,
}

export default Filter;