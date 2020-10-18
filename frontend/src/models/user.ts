/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 19:03
 */

class User {
  name: string
  email: string
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export default User
