import { check } from 'prettier'
import React from 'react'
import Employee from './Employee'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'
import { useNavigate } from 'react-router-dom'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import departments from './Department'

const Main = () => {
  const [show, setShow] = useState(false)
  const [ok, setOk] = useState(false)
  const [addemp, setaddemp] = useState(false)

  const h = useNavigate()

  const [ids, setIds] = useState(0)

  const handleClose = () => setShow(false)
  const handleShow = (value) => () => {
    if (value == 'add') {
      setShow(true)
      setaddemp(true)
      setOk(false)
      setEmpname('')
      setDept('')
      setSalary(0)
    } else {
      setShow(true)
      setOk(true)
      setaddemp(false)
      setEmpname(value.empname)
      setDept(value.department)
      setSalary(value.salary)
      setIds(value.id)
    }
  }

  const [emp, setEmp] = useState(Employee)
  const [search, setsearch] = useState('')
  const [empname, setEmpname] = useState('')
  const [salary, setSalary] = useState(0)
  const [dept, setDept] = useState('')
  const [emplength, setemplength] = useState(emp.length)

  const dlt = (item) => () => {
    setEmp(
      emp.filter((item1) => {
        if (item1.id !== item.id) {
          return item1
        }
      }),
    )
    setemplength(emp.length - 1)
  }

  const add = () => {
    setemplength(emp.length)
    ;(salary && empname && dept !== '') || 0
      ? (setEmp([
          ...emp,
          {
            id: parseInt(emp[emp.length - 1].id) + 1,
            empname: empname,
            department: dept,
            salary: salary,
          },
        ]),
        setSalary(0),
        setDept(''),
        setEmpname(''),
        setemplength(emp.length + 1))
      : alert('plz enter ')
  }

  const sd = () => {
    setDept(document.querySelector('#s').value)
  }

  const edit = () => {
    var index = Employee.map((item) => item.id).indexOf(ids)
    Employee[index].empname = empname
    Employee[index].salary = salary
    Employee[index].department = dept
    alert('changes Saved')
  }

  return (
    <>
      <AppSidebar />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader empno={emplength} />
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '-200px' }}>
            <div>
              <input
                type="search"
                placeholder="Search Employee"
                className="ms-5 mt-3"
                onChange={(e) => setsearch(e.target.value)}
                style={{ borderRadius: '4px', height: '40px', width: '300px' }}
              />
            </div>

            <div>
              <button className="ms-5 mb-4 btn btn-success mt-3" onClick={handleShow('add')}>
                Add-emplyee
              </button>
            </div>
          </div>
          <hr />
          <table className="container" style={{ padding: '10px' }}>
            <thead className="">
              <tr style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                <th>id</th>
                <th>Employee_Name</th>
                <th>Department</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {emp
                .filter((item1) => {
                  return item1.empname.toLowerCase().includes(search)
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                      {item.id}
                    </td>
                    <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                      {item.empname}
                    </td>
                    <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                      {item.department}
                    </td>
                    <td className="border border-dark" style={{ paddingLeft: '30px' }}>
                      <input type="checkbox" className="m-3"></input>
                      {item.salary}
                    </td>
                    <td>
                      <button className="btn btn-primary ms-3 mb-3" onClick={handleShow(item)}>
                        Edit
                      </button>
                      <button className="btn btn-danger ms-3 mb-3" onClick={dlt(item)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {show && addemp && (
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Add employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  onChange={(e) => setEmpname(e.target.value)}
                  value={empname}
                />{' '}
                <br /> <br />
                <input
                  type="text"
                  placeholder="Enter initial salary"
                  onChange={(e) => setSalary(e.target.value)}
                />{' '}
                <br /> <br />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="s"
                  onChange={sd}
                >
                  <option selected>select departent</option>
                  {departments.map((item) => (
                    <option value={item.departmentname} key={item.id}>
                      {item.departmentname}
                    </option>
                  ))}
                </select>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={add}>
                  Add Employee
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          {ok && show && (
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Edit employee details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  onChange={(e) => setEmpname(e.target.value)}
                  value={empname}
                />{' '}
                <br /> <br />
                <input
                  type="text"
                  placeholder="Enter department"
                  onChange={(e) => setDept(e.target.value)}
                  value={dept}
                />{' '}
                <br /> <br />
                <input
                  type="text"
                  placeholder="Enter initial salary"
                  onChange={(e) => setSalary(e.target.value)}
                  value={salary}
                />{' '}
                <br /> <br />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={edit}>
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}

export default React.memo(Main)
