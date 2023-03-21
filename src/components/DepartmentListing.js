import React from 'react'
import departments from './Department'
import Employee from './Employee'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AppSidebar from './AppSidebar'
import AppHeader from './AppHeader'

const DepartmentListing = () => {
  const [departmentWise, setdepartmentwise] = useState([])
  const [show, setShow] = useState(false)
  const [departmentname, setdepartmentname] = useState('')
  const [discription, setdiscription] = useState('')
  const [dptmntlist, setDptmntlist] = useState(departments)
  const [dptno, setdptno] = useState(6)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const adddptmnt = () => { dptmntlist.map((item) => item.departmentname . toLowerCase()).includes(departmentname.toLowerCase()) || departmentname == ''
      ? alert('Error')
      : (setDptmntlist([
          ...dptmntlist,
          { id: departments.length + 1, departmentname: departmentname, discription: discription },
        ]),
        setdepartmentname(''),
        setdiscription(''))
  }

  const showemp = (value) => () => {
    setdepartmentwise(
      Employee.filter((item) => {
        return item.department == value.departmentname
      }),
    )
  }

  return (
    <div>
      <AppSidebar />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader dptno={dptno} />
        <div>
          <Button variant="Success" onClick={handleShow}>
            Add department
          </Button>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="Enter departmentname"
                onChange={(e) => setdepartmentname(e.target.value)}
                value={departmentname}
              />
              <br /> <br />
              <input
                type="text"
                placeholder="Enter discription"
                onChange={(e) => setdiscription(e.target.value)}
                value={discription}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={adddptmnt}>
                Add departent
              </Button>
            </Modal.Footer>
          </Modal>

          <hr />
          <table className="container" style={{ padding: '10px' }}>
            <thead>
              <tr style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                <th>id</th>
                <th>department name</th>
                <th>discription</th>
                <th>no of employees</th>
              </tr>
            </thead>
            <tbody>
              {dptmntlist.map((item) => (
                <tr key={item.id}>
                  <td className="border border-dark" style={{ padding: '30px' }}>
                    {item.id}
                  </td>
                  <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                    {item.departmentname}
                  </td>
                  <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                    {item.discription}
                  </td>
                  <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                    {Employee.filter((item1) => item1.department == item.departmentname).length}
                  </td>
                  <td>
                    <button className="btn btn-primary  ms-3 mb-3" onClick={showemp(item)}>
                      Show employess of this departent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />

          <table className="container" style={{ padding: '10px', width: '400px' }}>
            {departmentWise.length > 0 && (
              <thead>
                <tr>
                  <th>id</th>
                  <th>employeename</th>
                  <th>salary</th>
                </tr>
              </thead>
            )}
            <tbody>
              {departmentWise.map((item) => (
                <tr style={{ textTransform: 'uppercase', textAlign: 'center' }} key={item.id}>
                  <td className="border border-dark" style={{ padding: '10px' }}>
                    {item.id}
                  </td>
                  <td className="border border-dark" style={{ padding: '10px' }}>
                    {item.empname}
                  </td>
                  <td className="border border-dark" style={{ padding: '10px' }}>
                    {item.salary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DepartmentListing)
