const styleMessage = {
  error: 'from-red-400 to-red-700',
  danger: 'from-red-400 to-red-700',
  success: 'from-sky-400 to-sky-600',
  warning: 'from-orange-400 to-orange-600',
  fatal:'from-red-600 to-red-900'
}

const Alert = ({ typeAlert, message }) => {
  return (
    <div className={`${styleMessage[typeAlert]} rounded-md bg-gradient-to-br text-center uppercase text-white font-bold text-sm p-3 my-0`}>
      {message}
    </div>
  )
}

export default Alert