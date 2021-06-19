import NotificationStyle from "./Style";

const Notification = (props) => {
  const { visible, message, setNotificationVisibility } = props;

  return (
    <NotificationStyle visible={visible}>
      { message }

      <button onClick={() => setNotificationVisibility(false)}>
        <i className="fa fa-close" />
      </button>
    </NotificationStyle>
  )
}

export default Notification;