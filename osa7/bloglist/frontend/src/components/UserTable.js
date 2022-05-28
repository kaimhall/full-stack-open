import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserTable = () => {
  const userlist = useSelector(state => state.userlist)
  if (!userlist) {
    return null
  }

  return (
    <div>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blog count</th>
          </tr>
          {userlist.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserTable