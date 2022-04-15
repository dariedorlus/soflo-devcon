import  { useState } from 'react';

function mapPage({SessionsContext,activeCategory,setActiveCategory}) {

    const [mapNum, setMapNum] = useState('map1.jpg');
    return (
        <div className="map content-block">
            <img src="/maps/{mapNum}" onerror="/nomap.jpg" />
        </div>
    );
  }
  
  export default mapPage;