import './Tabs.css';
import TabTitle from "./TabTitle"

const Tabs = ({ selectedTab, setSelectedTab, children }) => {
  return (
    <div>
      <ul className="tabs">
        {children.map((item, index) => (
          <li key={index} className={selectedTab === index ? 'active' : ''}>
            <TabTitle 
              title={item.props.title} 
              index={index}
              setSelectedTab={setSelectedTab}
            />
          </li>
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  )
}

export default Tabs;