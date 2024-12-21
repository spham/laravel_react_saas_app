import React from 'react'
import { Link } from 'react-router'

export default function PageNotFound() {
    return (
        <div 
            className="card main__card border border-dark 
                border-3 bg-white my-5 rounded-0 shadow">
            <div className="card-body">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="mt-5 row">
                            <div className="col-md-6 mx-auto">
                                <h4>
                                    404 the page you are looking for does not exist.
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-white">
                <div className="row">
                    <div className="col-md-1 mx-auto">
                        <Link to="/" className="btn btn-white border border-dark 
                            border-2 rounded-0 shadow-sm d-flex flex-column align-items-center">
                                <span className="fw-bold">Home</span>
                                <i className="bi bi-house-door"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
