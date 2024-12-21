import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Spinner() {
    return (
        <div className="d-flex justify-content-center">
            <BallTriangle
                height={80}
                width={80}
                radius={5}
                color="#000"
                visible={true}
            />
        </div>
    )
}
