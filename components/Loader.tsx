import styles from "./loader.module.scss";

export const Loader = ({ show }: { show: boolean }) => {
  return show ? <div className={styles.loader} /> : null;
};
