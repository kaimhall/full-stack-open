import { useState } from 'react'

const ToggleBtn = (props) => {
  const name1 = props.loggedUser.name
  const name2 = props.user.name

  const [visible] = useState(name1 === name2)

  if (visible) {
    return (
      <div>
        {props.children}
      </div>
    )
  }
}
export default ToggleBtn