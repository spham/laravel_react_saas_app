import React from 'react'
import { useSelector } from 'react-redux'
import Hearts from '../hearts/Hearts'
import Upgrade from '../upgrade/Upgrade'
import { Link } from 'react-router'

export default function TopRightMenu() {
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <>
            {
                isLoggedIn ?
                    <>
                        <Upgrade />
                        <Hearts />
                    </>
                :
                <Link to="/register" className="btn btn-danger align-self-end">
                    <i className="bi bi-door-open"></i> Start for free
                </Link>
            }
        </>
    )
}
