import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { useState } from 'react'
import growthimg from '../assets/images/wallpaperflare.com_wallpaper (1).jpg'
import Employee from './Employee'
import departments from './Department'
import { Link } from 'react-router-dom'

const AppContent = () => {
  const [empno, setempno] = useState(Employee.length)
  const [dptno, setdptno] = useState(departments.length)
  return (
    // <CContainer lg>
    //   {/* <Suspense fallback={<CSpinner color="primary" />}>
    //     <Routes>
    //       {routes.map((route, idx) => {
    //         return (
    //           route.element && (
    //             <Route
    //               key={idx}
    //               path={route.path}
    //               exact={route.exact}
    //               name={route.name}
    //               element={<route.element />}
    //             />
    //           )
    //         )
    //       })}
    //       <Route path="/" element={<Navigate to="dashboard" replace />} />
    //     </Routes>
    //   </Suspense> */}
    // </CContainer>

    <div className="container">
      <CardGroup style={{ textTransform: 'capitlize' }}>
        <Card>
          <Card.Body>
            <Card.Title>No of employess:({empno})</Card.Title>
            <Card.Text>
              <Link to={'/main'}>
                <button className="btn btn-primary">Show Employess details</button>
              </Link>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {/* <small className="text-muted">Last updated 3 mins ago</small> */}
          </Card.Footer>
        </Card>
        <Card className="ms-5">
          <Card.Body>
            <Card.Title>No of department({dptno})</Card.Title>
            <Card.Text>
              <Link to={'/departmentlisting'}>
                <button className="btn btn-primary">Show Departments details </button>
              </Link>
            </Card.Text>
          </Card.Body>
          <Card.Footer></Card.Footer>
        </Card>
      </CardGroup>

      <div>
        <h3 className="m-4">Growth of the company</h3>
        <img src={growthimg} style={{ height: '300px', width: '100%' }} />
      </div>
    </div>
  )
}

export default React.memo(AppContent)
