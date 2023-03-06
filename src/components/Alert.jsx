const Alert = ({ typeAlert, message }) => {
  return <div className={`alert__${typeAlert}`}>{message}</div>;
};

export default Alert;
