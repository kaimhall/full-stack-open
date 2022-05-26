import { useState } from 'react'
import { useSelector } from 'react-redux'

const ToggleBtn = (props) => {
  const user = useSelector(state => state.users)

  const name1 = user.name
  const name2 = props.user

  console.log(name1, name2)

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