import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

export default function Hearts() {
    const { user } = useSelector(state => state.user)

    return (
        <div>
            {
                user?.number_of_hearts === 0 && 
                    <div>
                        <span className="fw-bold me-3">
                            No more hearts
                        </span>
                        <Link to="/plans" className="btn btn-warning">
                            Upgrade
                        </Link>
                    </div>
            }
        </div>
    )
}
