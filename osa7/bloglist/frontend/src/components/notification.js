const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'rgb(255,0,0)' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div className='error' style={style}>
      {notification.message}
    </div>
  )
}

export default Notification