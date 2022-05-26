import { useSelector } from 'react-redux'

const UserTable = () => {
  const userlist = useSelector(state => state.userlist)
  console.log(userlist)

  return (
    <div>hello</div>
  )
}
export default UserTable