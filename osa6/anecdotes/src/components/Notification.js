import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.message
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if(message !== '')
    return (
      <div style={style}>
        {message}
      </div>
    )
  return null
}

const mapStateToProps = (state) => {
 return {
   message: state.messages
 }
}

export default connect(mapStateToProps)(Notification)
 