import PropTypes from 'prop-types';
import styles from './section.module.css'

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};


export default Section;