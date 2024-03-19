import { useState } from 'react';
import './App.css';
import { data } from './api/Data'

function App() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [nameFilter, setNameFilter] = useState('');

  const handleFilterChange = (item, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [item]: {
        ...prevFilters[item],
        [value]: !prevFilters[item]?.[value]
      }
    }));
  };

  const applyFilters = () => {
    return data.filter(item => {
      return headersWithoutId.every(header => {
        const filterValues = selectedFilters[header];
        if (!filterValues || Object.values(filterValues).every(val => !val)) {
          return true;
        }
        return filterValues[item[header]];
      }) && (nameFilter.trim() === '' || item['name']?.toLowerCase().includes(nameFilter.toLowerCase()) || item['mall']?.toLowerCase().includes(nameFilter.toLowerCase()));
    });
  };

  const headers = Object.keys(data[0]);
  const allKeys = data.reduce((keys, obj) => {
    Object.keys(obj).forEach(key => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);
  const headersWithoutId = allKeys.filter(header => header !== "id" && header !== "name" && header !== "mall");
  console.log('headersWithoutId: ', headersWithoutId);
  console.log('data: ', data);
  console.log('headers: ', headers);
  
  const filteredData = applyFilters();
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  return (
    <>
      <div className='container-fluid m-5'>
        <div className='row'>
          {
            headersWithoutId.map((item, index) => {
              const uniqueValues = [...new Set(data.map(filter => filter[item]))];
              return (
                <div className='col' key={item} >
                  <h2>{item}</h2>
                  {
                    uniqueValues.map((value, index) => (
                      <>
                        <div className="form-check form-switch" key={index}>
                          <input className="form-check-input" type="checkbox" role="switch" id={`a${index}`} checked={selectedFilters[item]?.[value] || false} onChange={() => handleFilterChange(item, value)}
                          />
                          <label className="form-check-label" htmlFor={`a${index}`}>{value}</label>
                        </div>
                      </>
                    ))
                  }
                </div>
              )
            })
          }
          <div className='col'>
            {/* {
              headers.includes('name') ?
                :
                <></>
            } */}
                <input type='text' placeholder='Name' className='name' value={nameFilter} onChange={handleNameFilterChange} />

          </div>
        </div>
      </div>
      <div className='container mt-5 filter'>
        <div className='row'>
          <div className='col'>
            <table class="table table-hover">
              <thead>
                <tr>
                  {
                    headers.map((item) => {
                      return (
                        <th key={item}>{item}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    {headers.map(header => (
                      <td key={header}>
                        {item[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>


  );
}

export default App;
