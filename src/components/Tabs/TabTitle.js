import { useCallback } from "react"

const TabTitle = ({ title, setSelectedTab, index }) => {

  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (

      <button className="tab" onClick={onClick}>{title}</button>

  )
}

export default TabTitle;