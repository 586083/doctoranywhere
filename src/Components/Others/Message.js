import { notification } from 'antd'


export const openNotification = (close,message,status) => {
    notification.open({
      message: message,
      onClose: close,
      placement: 'bottomRight',
      duration: 2,
      className: status==="error"?"error-notification":(status==="success"?"success-notification":"warning-notification"),
    });
};

