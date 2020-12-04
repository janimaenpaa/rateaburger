import React, { useContext } from "react"
import { Button } from "@ui-kitten/components"
import { AuthContext } from "../providers/AuthProvider"

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Button style={{ margin: 4 }} onPress={logout}>
      Logout
    </Button>
  )
}
